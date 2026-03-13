(function () {
  "use strict";

  const DEFAULTS = {
    offer: 300,
    min: 100,
    max: 500,
  };

  const barTrack = document.getElementById("barTrack");
  const barHandle = document.getElementById("barHandle");
  const currentOfferDisplay = document.getElementById("currentOfferDisplay");
  const currentMarker = document.getElementById("currentMarker");
  const payMinEl = document.getElementById("payMin");
  const payMaxEl = document.getElementById("payMax");
  const previousOfferMarker = document.getElementById("previousOfferMarker");
  const previousOfferDisplay = document.getElementById("previousOfferDisplay");
  const btnMakeOffer = document.getElementById("btnMakeOffer");
  const btnNewSession = document.getElementById("btnNewSession");
  const modalOverlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const modalLinkInput = document.getElementById("modalLinkInput");
  const btnCopyLink = document.getElementById("btnCopyLink");
  const copyFeedback = document.getElementById("copyFeedback");
  const screenshotPlaceholder = document.getElementById("screenshotPlaceholder");
  const screenshotImg = document.getElementById("screenshotImg");
  const btnDownloadScreenshot = document.getElementById("btnDownloadScreenshot");
  const captureArea = document.getElementById("captureArea");
  const bgImage = document.getElementById("bgImage");
  const setupFlow = document.getElementById("setupFlow");
  const setupStep1 = document.getElementById("setupStep1");
  const setupStep2 = document.getElementById("setupStep2");
  const formOffer = document.getElementById("formOffer");
  const formRange = document.getElementById("formRange");
  const inputOffer = document.getElementById("inputOffer");
  const inputMin = document.getElementById("inputMin");
  const inputMax = document.getElementById("inputMax");

  let state = {
    offer: DEFAULTS.offer,
    min: DEFAULTS.min,
    max: DEFAULTS.max,
  };

  let lastScreenshotDataUrl = null;
  let pendingOffer = null;
  let initialOfferFromLink = null;

  const STATE_PARAM = "d";

  function encodeState(s) {
    try {
      var json = JSON.stringify({ o: s.offer, m: s.min, x: s.max });
      return btoa(unescape(encodeURIComponent(json)));
    } catch (e) {
      return "";
    }
  }

  function decodeState(encoded) {
    try {
      var json = decodeURIComponent(escape(atob(encoded)));
      var data = JSON.parse(json);
      var o = Number(data.o);
      var m = Number(data.m);
      var x = Number(data.x);
      if (!Number.isFinite(o) || !Number.isFinite(m) || !Number.isFinite(x)) return null;
      if (m >= x) return null;
      if (o < m || o > x) return null;
      return { offer: o, min: m, max: x };
    } catch (e) {
      return null;
    }
  }

  function parseQuery() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get(STATE_PARAM);
    if (encoded) {
      var decoded = decodeState(encoded);
      if (decoded) return decoded;
    }
    return {
      offer: DEFAULTS.offer,
      min: DEFAULTS.min,
      max: DEFAULTS.max,
    };
  }

  function hasValidParams() {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get(STATE_PARAM);
    if (!encoded) return false;
    return decodeState(encoded) !== null;
  }

  function showHagglingScreen(fromForm) {
    if (setupFlow) setupFlow.classList.add("hidden");
    if (captureArea) captureArea.classList.remove("hidden");
    var sceneInner = captureArea && captureArea.querySelector(".scene");
    if (sceneInner) sceneInner.classList.remove("hidden");
    var parsed = parseQuery();
    if (!fromForm && hasValidParams()) initialOfferFromLink = parsed.offer;
    applyState(parsed);
    updateURL();
  }

  function showSetupFlow() {
    if (setupFlow) setupFlow.classList.remove("hidden");
    if (captureArea) captureArea.classList.add("hidden");
    var sceneInner = captureArea && captureArea.querySelector(".scene");
    if (sceneInner) sceneInner.classList.add("hidden");
    if (setupStep1) setupStep1.classList.remove("hidden");
    if (setupStep2) setupStep2.classList.add("hidden");
    pendingOffer = null;
    initialOfferFromLink = null;
    if (inputOffer) inputOffer.value = "";
  }

  function clampOffer(value) {
    return Math.round(Math.max(state.min, Math.min(state.max, value)));
  }

  function updateURL() {
    const params = new URLSearchParams();
    params.set(STATE_PARAM, encodeState(state));
    const url = window.location.pathname + "?" + params.toString();
    history.replaceState(null, "", url);
    if (modalLinkInput) modalLinkInput.value = window.location.href;
  }

  function applyState(s) {
    state.offer = clampOffer(s.offer);
    state.min = Math.min(s.min, state.max - 1);
    state.max = Math.max(s.max, state.min + 1);
    state.offer = clampOffer(state.offer);
    renderBar();
    updateURL();
  }

  function fraction() {
    const range = state.max - state.min;
    if (range <= 0) return 0;
    return (state.offer - state.min) / range;
  }

  function valueToPercent(value) {
    const range = state.max - state.min;
    if (range <= 0) return 0;
    return ((value - state.min) / range) * 100;
  }

  function renderBar() {
    const f = fraction();
    const trackHeight = barTrack.offsetHeight;
    const handleHeight = 24;
    const topPx = (1 - f) * (trackHeight - handleHeight);
    barHandle.style.top = topPx + "px";
    if (currentMarker) currentMarker.style.top = (1 - f) * 100 + "%";
    currentOfferDisplay.textContent = state.offer.toLocaleString();
    barHandle.setAttribute("aria-valuenow", String(state.offer));
    barHandle.setAttribute("aria-valuemin", String(state.min));
    barHandle.setAttribute("aria-valuemax", String(state.max));
    if (payMinEl) payMinEl.textContent = state.min.toLocaleString();
    if (payMaxEl) payMaxEl.textContent = state.max.toLocaleString();
    if (previousOfferMarker && previousOfferDisplay && initialOfferFromLink != null) {
      var prev = initialOfferFromLink;
      var inRange = prev >= state.min && prev <= state.max;
      if (inRange) {
        var pct = valueToPercent(prev);
        previousOfferMarker.style.top = (100 - pct) + "%";
        previousOfferDisplay.textContent = prev.toLocaleString();
        previousOfferMarker.classList.remove("hidden");
      } else {
        previousOfferMarker.classList.add("hidden");
      }
    } else if (previousOfferMarker) {
      previousOfferMarker.classList.add("hidden");
    }
  }

  function offerFromClientY(clientY) {
    const trackRect = barTrack.getBoundingClientRect();
    const y = clientY - trackRect.top;
    const h = trackRect.height;
    const handleHalf = 12;
    const f = Math.max(0, Math.min(1, (y - handleHalf) / (h - 2 * handleHalf)));
    const value = state.min + (1 - f) * (state.max - state.min);
    return Math.round(value);
  }

  function setOfferFromEvent(clientY) {
    const newOffer = offerFromClientY(clientY);
    if (newOffer !== state.offer) {
      state.offer = newOffer;
      renderBar();
      updateURL();
    }
  }

  function onPointerDown(e) {
    e.preventDefault();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setOfferFromEvent(clientY);
    const move = (e2) => {
      e2.preventDefault();
      const y = e2.touches ? e2.touches[0].clientY : e2.clientY;
      setOfferFromEvent(y);
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchmove", move, { passive: false });
      document.removeEventListener("touchend", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", up);
  }

  barTrack.addEventListener("mousedown", function (e) {
    if (e.button !== 0) return;
    e.preventDefault();
    setOfferFromEvent(e.clientY);
    onPointerDown(e);
  });

  barTrack.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    setOfferFromEvent(e.touches[0].clientY);
    onPointerDown(e);
  }, { passive: false });

  barHandle.addEventListener("mousedown", function (e) {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    onPointerDown(e);
  });

  barHandle.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    e.stopPropagation();
    onPointerDown(e);
  }, { passive: false });

  barHandle.addEventListener("keydown", function (e) {
    const step = Math.max(1, Math.floor((state.max - state.min) / 50));
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      state.offer = clampOffer(state.offer + step);
      renderBar();
      updateURL();
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      state.offer = clampOffer(state.offer - step);
      renderBar();
      updateURL();
    }
  });

  function openModal() {
    modalOverlay.classList.add("is-open");
    modalOverlay.setAttribute("aria-hidden", "false");
    modalLinkInput.value = window.location.href;
    screenshotPlaceholder.classList.remove("hidden");
    screenshotImg.classList.add("hidden");
    screenshotImg.removeAttribute("src");
    lastScreenshotDataUrl = null;
    if (typeof html2canvas !== "undefined") {
      html2canvas(captureArea, {
        useCORS: true,
        allowTaint: true,
        scale: window.devicePixelRatio || 1,
        logging: false,
      }).then(function (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        lastScreenshotDataUrl = dataUrl;
        screenshotImg.src = dataUrl;
        screenshotImg.classList.remove("hidden");
        screenshotPlaceholder.classList.add("hidden");
      }).catch(function () {
        screenshotPlaceholder.textContent = "Screenshot failed";
      });
    } else {
      screenshotPlaceholder.textContent = "Screenshot unavailable";
    }
  }

  function closeModal() {
    modalOverlay.classList.remove("is-open");
    modalOverlay.setAttribute("aria-hidden", "true");
    copyFeedback.classList.add("hidden");
  }

  btnMakeOffer.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "e" && !e.ctrlKey && !e.metaKey && !e.altKey && !modalOverlay.classList.contains("is-open")) {
      e.preventDefault();
      openModal();
    }
  });

  modal.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  btnCopyLink.addEventListener("click", function () {
    modalLinkInput.select();
    modalLinkInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(modalLinkInput.value).then(function () {
      copyFeedback.classList.remove("hidden");
      copyFeedback.textContent = "Copied!";
      setTimeout(function () {
        copyFeedback.classList.add("hidden");
      }, 2000);
    }).catch(function () {
      copyFeedback.textContent = "Copy failed";
      copyFeedback.classList.remove("hidden");
    });
  });

  btnDownloadScreenshot.addEventListener("click", function () {
    if (!lastScreenshotDataUrl) return;
    const a = document.createElement("a");
    a.href = lastScreenshotDataUrl;
    a.download = "kcd-haggle-offer-" + state.offer + ".png";
    a.click();
  });

  if (bgImage && bgImage.tagName === "IMG") {
    bgImage.addEventListener("error", function () {
      bgImage.classList.add("load-error");
    });
  }

  if (formOffer) {
    formOffer.addEventListener("submit", function (e) {
      e.preventDefault();
      var raw = inputOffer.value.trim();
      var num = parseInt(raw, 10);
      if (!Number.isFinite(num) || num < 1) {
        inputOffer.focus();
        return;
      }
      pendingOffer = num;
      var suggestedMin = Math.max(0, Math.floor(num * 0.35));
      var suggestedMax = Math.ceil(num * 1.6);
      if (suggestedMax <= suggestedMin) suggestedMax = suggestedMin + 1;
      if (inputMin) inputMin.value = suggestedMin;
      if (inputMax) inputMax.value = suggestedMax;
      setupStep1.classList.add("hidden");
      setupStep2.classList.remove("hidden");
      if (inputMin) inputMin.focus();
    });
  }

  if (formRange) {
    formRange.addEventListener("submit", function (e) {
      e.preventDefault();
      var rawMin = inputMin.value.trim();
      var rawMax = inputMax.value.trim();
      var minVal = parseInt(rawMin, 10);
      var maxVal = parseInt(rawMax, 10);
      if (!Number.isFinite(minVal)) minVal = Math.max(0, Math.floor((pendingOffer || 100) * 0.35));
      if (!Number.isFinite(maxVal)) maxVal = Math.ceil((pendingOffer || 100) * 1.6);
      if (minVal >= maxVal) maxVal = minVal + 1;
      var offer = pendingOffer != null ? pendingOffer : Math.round((minVal + maxVal) / 2);
      if (offer < minVal) offer = minVal;
      if (offer > maxVal) offer = maxVal;
      var params = new URLSearchParams();
      params.set(STATE_PARAM, encodeState({ offer: offer, min: minVal, max: maxVal }));
      var url = window.location.pathname + "?" + params.toString();
      history.replaceState(null, "", url);
      showHagglingScreen(true);
    });
  }

  if (btnNewSession) {
    btnNewSession.addEventListener("click", function () {
      history.replaceState(null, "", window.location.pathname);
      showSetupFlow();
    });
  }

  if (hasValidParams()) {
    showHagglingScreen(false);
  } else {
    showSetupFlow();
  }
})();
