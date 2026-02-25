// Game State
let currentQuestion = 0;
let selectedWords = [];
let correctAnswers = 0;
let totalQuestions = 0;
let currentQuestionData = null;

// DOM Elements
const welcomeScreen = document.getElementById("welcomeScreen");
const lessonScreen = document.getElementById("lessonScreen");
const completionScreen = document.getElementById("completionScreen");
const startLessonBtn = document.getElementById("startLesson");
const checkAnswerBtn = document.getElementById("checkAnswer");
const restartLessonBtn = document.getElementById("restartLesson");
const progressFill = document.getElementById("progressFill");
const questionType = document.getElementById("questionType");
const questionNumber = document.getElementById("questionNumber");
const questionContent = document.getElementById("questionContent");
const answerContainer = document.getElementById("answerContainer");
const feedbackContainer = document.getElementById("feedbackContainer");
const feedback = document.getElementById("feedback");
const character = document.getElementById("character");
const correctAnswersSpan = document.getElementById("correctAnswers");
const totalQuestionsSpan = document.getElementById("totalQuestions");

// Sound Effects (using Web Audio API)
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.init();
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    } catch (e) {
      console.log("Web Audio API not supported");
    }
  }

  playTone(frequency, duration, type = "sine") {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playCorrect() {
    this.playTone(523, 0.2); // C5
    setTimeout(() => this.playTone(659, 0.2), 100); // E5
    setTimeout(() => this.playTone(784, 0.3), 200); // G5
  }

  playIncorrect() {
    this.playTone(200, 0.5, "sawtooth"); // Low buzz
  }

  playComplete() {
    // Play a little melody
    this.playTone(523, 0.2); // C5
    setTimeout(() => this.playTone(659, 0.2), 150); // E5
    setTimeout(() => this.playTone(784, 0.2), 300); // G5
    setTimeout(() => this.playTone(1047, 0.4), 450); // C6
  }
}

const soundManager = new SoundManager();

// Character Animation Manager
class CharacterManager {
  constructor(characterElement) {
    this.character = characterElement;
  }

  showHappy() {
    this.character.classList.add("happy");
    setTimeout(() => {
      this.character.classList.remove("happy");
    }, 600);
  }

  showSad() {
    this.character.classList.add("sad");
    setTimeout(() => {
      this.character.classList.remove("sad");
    }, 600);
  }

  celebrate() {
    this.character.classList.add("celebrate");
    setTimeout(() => {
      this.character.classList.remove("celebrate");
    }, 800);
  }
}

const characterManager = new CharacterManager(character);

// Lesson Data
const lessonData = {
  questions: [
    {
      type: "sentence",
      czech: "Miluju tě",
      english: "I love you.",
      words: ["I", "love", "you"],
      difficulty: "beginner",
    },
    {
      type: "sentence",
      czech: "Chci tě",
      english: "I want you.",
      words: ["I", "want", "you"],
      difficulty: "beginner",
    },
    {
      type: "sentence",
      czech: "Dneska jsem byla moc zlobivá kočička",
      english: "Today I was a very naughty kitty",
      words: ["Today", "I", "was", "a", "very", "naughty", "kitty"],
      difficulty: "beginner",
    },
    {
      type: "sentence",
      czech: "Jsem celá tvoje",
      english: "I am all yours.",
      words: ["I", "am", "all", "yours"],
      difficulty: "beginner",
    },
    {
      type: "sentence",
      czech: "Máš vždycky pravdu",
      english: "You are always right.",
      words: ["You", "are", "always", "right"],
      difficulty: "beginner",
    },
    {
      type: "sentence",
      czech: "Chci se líbat",
      english: "I want to make out.",
      words: ["I", "want", "to", "make", "out"],
      difficulty: "beginner",
    },
    {
      type: "sentence",
      czech: "Co si mám dneska v obléct?",
      english: "What should I wear today?",
      words: ["What", "should", "I", "wear", "today"],
      difficulty: "beginner",
    },
    {
      type: "sentence",
      czech: "Proč musím být dneska znova spoutaná?",
      english: "Why do I have to be tied up again today?",
      words: [
        "Why",
        "do",
        "I",
        "have",
        "to",
        "be",
        "tied",
        "up",
        "again",
        "today",
      ],
      difficulty: "beginner",
    },
    {
      type: "vocabulary",
      czech: "Pejsek",
      english: "Doggy",
      options: ["Doggy", "Cat", "Bird", "Fish"],
      difficulty: "beginner",
    },
    {
      type: "vocabulary",
      czech: "Kočička",
      english: "Kitty",
      options: ["Dog", "Kitty", "Bird", "Fish"],
      difficulty: "beginner",
    },
    {
      type: "vocabulary",
      czech: "Pouta",
      english: "Handcuffs",
      options: ["Handcuffs", "Kitty", "Bird", "Fish"],
      difficulty: "beginner",
    },
  ],
};

// Initialize the app
function init() {
  startLessonBtn.addEventListener("click", startLesson);
  checkAnswerBtn.addEventListener("click", handleCheckOrNext);
  restartLessonBtn.addEventListener("click", restartLesson);

  // Enable audio context on first user interaction
  document.addEventListener(
    "click",
    () => {
      if (
        soundManager.audioContext &&
        soundManager.audioContext.state === "suspended"
      ) {
        soundManager.audioContext.resume();
      }
    },
    { once: true }
  );

  // Test hooks for browser automation (no snapshot refs needed):
  // - ?test=1  → focus Start Lesson so Enter/Space triggers it
  // - ?startLesson=1  → start lesson immediately
  // - ?playTest=1  → start lesson and auto-answer all questions correctly until completion
  const search = window.location.search;
  const hash = window.location.hash;
  if (search.includes("playTest=1") || hash === "#playTest") {
    window.__playTest = true;
    startLesson();
  } else if (search.includes("startLesson=1") || hash === "#startLesson") {
    startLesson();
  } else if (search.includes("test=1") || hash === "#test") {
    startLessonBtn.focus();
  }
}

// Start the lesson
function startLesson() {
  currentQuestion = 0;
  correctAnswers = 0;
  totalQuestions = lessonData.questions.length;
  selectedWords = [];

  welcomeScreen.classList.add("hidden");
  lessonScreen.classList.remove("hidden");

  loadQuestion();
}

// Load a question
function loadQuestion() {
  if (currentQuestion >= lessonData.questions.length) {
    showCompletion();
    return;
  }

  currentQuestionData = lessonData.questions[currentQuestion];
  selectedWords = [];

  // Update progress
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  progressFill.style.width = `${progress}%`;

  // Update question info
  questionType.textContent =
    currentQuestionData.type === "sentence" ? "Compose Sentence" : "Vocabulary";
  questionNumber.textContent = `${currentQuestion + 1} of ${totalQuestions}`;

  // Clear previous content
  answerContainer.innerHTML = "";
  feedbackContainer.classList.remove("show");
  checkAnswerBtn.disabled = true;
  checkAnswerBtn.classList.remove("auto-progress");
  checkAnswerBtn.style.removeProperty("--progress-width");

  // Update button text safely
  const buttonSpan = checkAnswerBtn.querySelector("span");
  if (buttonSpan) {
    buttonSpan.textContent = "Check";
  } else {
    checkAnswerBtn.textContent = "Check";
  }

  if (currentQuestionData.type === "sentence") {
    loadSentenceQuestion();
  } else {
    loadVocabularyQuestion();
  }

  if (window.__playTest && currentQuestion < lessonData.questions.length) {
    setTimeout(automateAnswer, 400);
  }
}

// Auto-answer current question (test mode only). Selects correct answer and triggers Check.
function automateAnswer() {
  if (!currentQuestionData || !window.__playTest) return;

  const options = answerContainer.querySelectorAll(".word-option");
  if (!options.length) return;

  if (currentQuestionData.type === "vocabulary") {
    const correctEl = Array.from(options).find(
      (el) => el.textContent.trim() === currentQuestionData.english
    );
    if (correctEl) {
      selectVocabularyAnswer(currentQuestionData.english, correctEl);
      setTimeout(() => checkAnswer(), 150);
    }
  } else {
    for (const word of currentQuestionData.words) {
      const optionEl = Array.from(options).find(
        (el) => el.textContent.trim() === word && !el.classList.contains("selected")
      );
      if (optionEl) selectWord(word, optionEl);
    }
    if (selectedWords.length === currentQuestionData.words.length) {
      setTimeout(() => checkAnswer(), 150);
    }
  }
}

// Load sentence composition question
function loadSentenceQuestion() {
  questionContent.textContent = currentQuestionData.czech;

  // Create word options
  const wordOptions = document.createElement("div");
  wordOptions.className = "word-options";

  // Shuffle words for variety
  const shuffledWords = [...currentQuestionData.words].sort(
    () => Math.random() - 0.5
  );

  shuffledWords.forEach((word) => {
    const wordOption = document.createElement("div");
    wordOption.className = "word-option";
    wordOption.textContent = word;
    wordOption.addEventListener("click", () => selectWord(word, wordOption));
    wordOptions.appendChild(wordOption);
  });

  // Create sentence builder
  const sentenceBuilder = document.createElement("div");
  sentenceBuilder.className = "sentence-builder";
  sentenceBuilder.id = "sentenceBuilder";

  answerContainer.appendChild(wordOptions);
  answerContainer.appendChild(sentenceBuilder);
}

// Load vocabulary question
function loadVocabularyQuestion() {
  questionContent.textContent = currentQuestionData.czech;

  const wordOptions = document.createElement("div");
  wordOptions.className = "word-options";

  // Shuffle options
  const shuffledOptions = [...currentQuestionData.options].sort(
    () => Math.random() - 0.5
  );

  shuffledOptions.forEach((option) => {
    const wordOption = document.createElement("div");
    wordOption.className = "word-option";
    wordOption.textContent = option;
    wordOption.addEventListener("click", () =>
      selectVocabularyAnswer(option, wordOption)
    );
    wordOptions.appendChild(wordOption);
  });

  answerContainer.appendChild(wordOptions);
}

// Select word for sentence building
function selectWord(word, element) {
  // If word is already selected, deselect it
  if (selectedWords.includes(word)) {
    removeWordFromSentence(word);
    return;
  }

  selectedWords.push(word);
  element.classList.add("selected");
  element.style.pointerEvents = "auto"; // Keep clickable for deselection

  // Add to sentence builder
  const sentenceBuilder = document.getElementById("sentenceBuilder");
  const sentenceWord = document.createElement("div");
  sentenceWord.className = "sentence-word";
  sentenceWord.innerHTML = `
        ${word}
        <button class="remove" onclick="removeWord('${word}', this)">×</button>
    `;
  sentenceBuilder.appendChild(sentenceWord);

  // Enable check button if all words are selected
  if (selectedWords.length === currentQuestionData.words.length) {
    checkAnswerBtn.disabled = false;
  }
}

// Remove word from sentence (called from X button)
function removeWord(word, button) {
  selectedWords = selectedWords.filter((w) => w !== word);

  // Remove from sentence builder
  button.parentElement.remove();

  // Re-enable word option
  const wordOptions = document.querySelectorAll(".word-option");
  wordOptions.forEach((option) => {
    if (option.textContent === word) {
      option.classList.remove("selected");
      option.style.pointerEvents = "auto";
    }
  });

  checkAnswerBtn.disabled = true;
}

// Remove word from sentence (called from word option toggle)
function removeWordFromSentence(word) {
  selectedWords = selectedWords.filter((w) => w !== word);

  // Find and remove the sentence word
  const sentenceBuilder = document.getElementById("sentenceBuilder");
  const sentenceWords = sentenceBuilder.querySelectorAll(".sentence-word");
  sentenceWords.forEach((sentenceWord) => {
    if (sentenceWord.textContent.includes(word)) {
      sentenceWord.remove();
    }
  });

  // Re-enable word option
  const wordOptions = document.querySelectorAll(".word-option");
  wordOptions.forEach((option) => {
    if (option.textContent === word) {
      option.classList.remove("selected");
      option.style.pointerEvents = "auto";
    }
  });

  checkAnswerBtn.disabled = true;
}

// Select vocabulary answer
function selectVocabularyAnswer(answer, element) {
  // Remove previous selection
  document.querySelectorAll(".word-option").forEach((option) => {
    option.classList.remove("selected");
  });

  element.classList.add("selected");
  selectedWords = [answer];
  checkAnswerBtn.disabled = false;
}

// Handle check button click
function handleCheckOrNext() {
  const buttonSpan = checkAnswerBtn.querySelector("span");
  const buttonText = buttonSpan
    ? buttonSpan.textContent
    : checkAnswerBtn.textContent;

  if (buttonText === "Check" && !checkAnswerBtn.disabled) {
    checkAnswer();
  } else if (buttonText === "Next" && !checkAnswerBtn.disabled) {
    nextQuestion();
  }
}

// Check answer
function checkAnswer() {
  const isCorrect = checkIfCorrect();

  // Disable all options
  document.querySelectorAll(".word-option").forEach((option) => {
    option.classList.add("disabled");
  });

  // Show feedback
  showFeedback(isCorrect);

  // Update character animation
  if (isCorrect) {
    characterManager.showHappy();
    soundManager.playCorrect();

    // Change button to "Next" and enable it
    const buttonSpan = checkAnswerBtn.querySelector("span");
    if (buttonSpan) {
      buttonSpan.textContent = "Next";
    } else {
      checkAnswerBtn.textContent = "Next";
    }
    checkAnswerBtn.disabled = false;
    checkAnswerBtn.classList.add("auto-progress");

    // Start the progress bar animation
    setTimeout(() => {
      checkAnswerBtn.style.setProperty("--progress-width", "100%");
    }, 10);

    // Auto-proceed to next question after 2 seconds for correct answers
    setTimeout(() => {
      const currentButtonText = buttonSpan
        ? buttonSpan.textContent
        : checkAnswerBtn.textContent;
      if (currentButtonText === "Next") {
        nextQuestion();
      }
    }, 2000);
  } else {
    characterManager.showSad();
    soundManager.playIncorrect();

    // Show correct answer and reset after 2 seconds for wrong answers
    showCorrectAnswer();
    setTimeout(() => {
      resetQuestion();
    }, 2000);
  }
}

// Check if answer is correct
function checkIfCorrect() {
  if (currentQuestionData.type === "sentence") {
    return (
      JSON.stringify(selectedWords) ===
      JSON.stringify(currentQuestionData.words)
    );
  } else {
    return selectedWords[0] === currentQuestionData.english;
  }
}

// Show feedback
function showFeedback(isCorrect) {
  feedbackContainer.classList.add("show");

  if (isCorrect) {
    feedback.className = "feedback correct show";
    feedback.textContent = "Correct! 🎉";
    correctAnswers++;
  } else {
    feedback.className = "feedback incorrect show";
    feedback.textContent = "Not quite right. Try again!";
  }
}

// Show correct answer
function showCorrectAnswer() {
  if (currentQuestionData.type === "sentence") {
    // Highlight correct words
    document.querySelectorAll(".word-option").forEach((option) => {
      if (currentQuestionData.words.includes(option.textContent)) {
        option.classList.add("correct");
      } else if (option.classList.contains("selected")) {
        option.classList.add("incorrect");
      }
    });
  } else {
    // Highlight correct vocabulary option
    document.querySelectorAll(".word-option").forEach((option) => {
      if (option.textContent === currentQuestionData.english) {
        option.classList.add("correct");
      } else if (option.classList.contains("selected")) {
        option.classList.add("incorrect");
      }
    });
  }
}

// Reset current question
function resetQuestion() {
  // Reset selected words
  selectedWords = [];

  // Clear sentence builder
  const sentenceBuilder = document.getElementById("sentenceBuilder");
  if (sentenceBuilder) {
    sentenceBuilder.innerHTML = "";
  }

  // Reset all word options
  document.querySelectorAll(".word-option").forEach((option) => {
    option.classList.remove("selected", "correct", "incorrect", "disabled");
    option.style.pointerEvents = "auto";
  });

  // Hide feedback
  feedbackContainer.classList.remove("show");

  // Reset button
  const buttonSpan = checkAnswerBtn.querySelector("span");
  if (buttonSpan) {
    buttonSpan.textContent = "Check";
  } else {
    checkAnswerBtn.textContent = "Check";
  }
  checkAnswerBtn.disabled = true;
  checkAnswerBtn.classList.remove("auto-progress");
  checkAnswerBtn.style.removeProperty("--progress-width");
}

// Next question
function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

// Show completion screen
function showCompletion() {
  lessonScreen.classList.add("hidden");
  completionScreen.classList.remove("hidden");

  correctAnswersSpan.textContent = correctAnswers;
  totalQuestionsSpan.textContent = totalQuestions;

  characterManager.celebrate();
  soundManager.playComplete();
}

// Restart lesson
function restartLesson() {
  completionScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
