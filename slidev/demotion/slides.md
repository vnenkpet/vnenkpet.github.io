---
title: Role Change & Compensation Request
layout: cover
---

<div class="cover-slide">
  <div class="cover-bg" aria-hidden="true" />
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    class="cover-overlay"
  >
    <h1 class="cover-title">Role Change & Compensation Request</h1>
    <div class="cover-name-block">
      <p class="cover-name">Petr Vnenk</p>
      <p class="cover-role">Senior engineer, former Tech Lead</p>
    </div>
  </div>
</div>

<style>
.cover-slide {
  position: absolute;
  inset: 0;
}
.cover-bg {
  position: absolute;
  inset: 0;
  background-image: url(/assets/pvn.png);
  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;
}
.cover-overlay {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 0 3rem;
  min-height: 100%;
  max-width: 55%;
  z-index: 1;
}
.cover-title {
  font-size: clamp(1.25rem, 2.8vw, 2rem);
  margin: 0;
  margin-top: 12vh;
  line-height: 1.2;
}
.cover-name-block {
  margin-bottom: 2rem;
}
.cover-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.15rem 0;
  letter-spacing: 0.02em;
  text-shadow: 0 0 40px #000;
}
.cover-role {
  font-size: 1rem;
  opacity: 0.95;
  margin: 0;
  text-shadow: 0 0 30px #000;
}
</style>

---

# Career & Projects

<Timeline3D />

---

<div class="highlights-title-slide">
  <div class="highlights-bg-tiles" aria-hidden="true">
    <HighlightsGrid />
  </div>
  <div class="highlights-gradient" aria-hidden="true"></div>
  <HighlightsPulse />
  <h1 class="highlights-heading">Project Highlights</h1>
</div>

<style>
.highlights-title-slide {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 2rem;
  overflow: hidden;
  background: transparent;
}
.highlights-bg-tiles {
  position: fixed;
  left: -2px;
  top: -2px;
  right: -2px;
  bottom: -8px;
  z-index: 0;
  overflow: hidden;
  opacity: 1;
  perspective: 800px;
  perspective-origin: 50% 50%;
}
.highlights-gradient {
  position: fixed;
  left: -2px;
  top: -2px;
  right: -2px;
  bottom: -8px;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.7s ease-out;
  background: linear-gradient(140deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.1) 70%);
}
.highlights-title-slide.slide-entered .highlights-gradient {
  opacity: 1;
}
.highlights-bg-rotated {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 600%;
  height: 600%;
  margin-left: -300%;
  margin-top: -300%;
  transform-style: preserve-3d;
  transform-origin: center center;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}
.highlights-heading {
  position: relative;
  z-index: 2;
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0;
  opacity: 0;
  transform: translateY(24px) scale(0.96);
  animation: highlights-heading-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.6),
    0 2px 8px rgba(0, 0, 0, 0.5),
    0 4px 16px rgba(0, 0, 0, 0.4);
}
@keyframes highlights-heading-in {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>

---
layout: ProjectShowcase
image: /assets/digitoo.jpg
---

## Digitoo

### 2019–2021

- Tech‑led a team for ~2 years: ran Scrum ceremonies, guided hiring, and set up deployment pipelines
- Transformed from multi‑provider integration to a standalone product with high client satisfaction

---
layout: ProjectShowcase
image: /assets/refsite.png
---

## Refsite

### 2021

- Main backend developer for a photovoltaic installations platform
- Mentored junior engineers while delivering a robust, scalable system

---
layout: ProjectShowcase
image: /assets/sakurabook.png
---

## Sakurabook

### 2022

- Developed a Japanese Shopify plugin enabling localized short‑term rental and in‑person service purchases
- Full‑stack delivery with internationalization and e‑commerce integration

---
layout: ProjectShowcase
image: /assets/investbay.png
---

## Investbay

### 2023

- Architected a pragmatic workaround to enable Google Sign‑In on an unsupported SaaS backend
- Leveraged internal templates and creative compromises to ship a production‑ready solution

---
layout: ProjectShowcase
image: /assets/remangu.webp
---

## Remangu

### 2023–present

- Led development from greenfield to production in a fast‑moving team (up to 5 developers)
- Pivoted to an AI‑assisted full‑stack approach, accelerating development
- Delivered cloud‑desktop platform for game studios in 2 months for GDC 2023
- Created playtesting platform demo for GDC 2025 with pre‑release AWS tech

---
layout: ProjectShowcase
image: /assets/deliella.png
---

## Deliciously Ella

### 2025–present

- Analytical and architectural role on a complex legacy codebase
- Proposed refactoring strategies and debt removal plans
- Established a clear technical roadmap for the platform

---

# Why This Ask

<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 1, transition: { duration: 300 } }"
>
<v-clicks>

- **Track record**: Tech lead since ~2022; templates and internal work used across many projects (Skoala, Sakurabook, Refsite, Remangu, Investbay, Toggl Rounder, Deliciously Ella, Hannover Messe).
- **Evidence**: Node.js competency model, tech radar, internal knowledge base — I’ll keep contributing these in non‑project time.
- **Focus**: I want to enjoy delivery on projects and help improve **AI adoption**; architect later when it fits.

</v-clicks>
</div>

---

# Summary

<v-clicks>

- **Ask**: Role change to Senior + **top of Senior band (750)**; support new Tech Lead in non‑project time.
- **Now**: Project delivery + **AI adoption** across the company.
- **Later**: Architect when it feels natural.

</v-clicks>

---

# The Ask

<v-clicks>

- **Role change**: Step back from Tech Lead to **Senior** — focus on hands‑on project work and technical depth.
- **Compensation**: Target <span v-mark.underline.orange>**top of Senior band (750)**</span> given experience and impact (tech lead since ~2022, templates, greenfield & legacy delivery).
- **Ongoing contribution**: Support the new Tech Lead in **non‑project time** (reviews, standards, onboarding).
- **Longer term**: Open to growing into **architect** when it feels natural. For now: enjoy delivery and help drive **AI adoption** in the company.

</v-clicks>

---

# Thank You

<div
  v-motion
  :initial="{ opacity: 0, y: 15 }"
  :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
  v-click
>
Thank you for considering this.
</div>

<div
  v-motion
  :initial="{ opacity: 0, y: 15 }"
  :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
  v-click
>
Happy to discuss next steps and how we make this work for both sides.
</div>
