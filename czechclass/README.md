# CzechClass - Learn Czech with Xiao Mao 🐱

A fun, Duolingo-style Czech learning website featuring an adorable chibi cat character named Xiao Mao. Perfect for beginners who want to learn basic Czech phrases and vocabulary!

## Features

- 🎯 **Interactive Lessons**: Sentence composition and vocabulary matching exercises
- 🐱 **Animated Character**: Cute chibi cat (Xiao Mao) that reacts to your answers
- 🎵 **Sound Effects**: Audio feedback for correct/incorrect answers
- 📱 **Responsive Design**: Optimized for iPhone 15 Pro and other mobile devices
- 🎨 **Beautiful UI**: Dark purple gradient background with smooth animations
- 🏆 **Progress Tracking**: Visual progress bar and completion statistics
- 🎉 **Celebration**: Completion message in Traditional Chinese: "你是個好小貓" (You're a good Xiao Mao!)

## Lesson Types

### 1. Sentence Composition

- Given a Czech sentence, arrange English words in the correct order
- Interactive word selection with visual feedback
- Ability to remove and reorder words

### 2. Vocabulary Matching

- Match Czech words with their English translations
- Multiple choice format with shuffled options
- Visual feedback for correct/incorrect selections

## Character Animations

Xiao Mao (the chibi cat) provides delightful feedback:

- 😊 **Happy**: When you get an answer correct
- 😢 **Sad**: When you get an answer wrong
- 🎉 **Celebration**: When you complete the lesson
- 👁️ **Blinking**: Random blinking animation for liveliness
- 🏃 **Floating**: Gentle up-and-down floating motion
- 🐾 **Tail Wagging**: Continuous tail wagging animation

## Technical Features

- **Web Audio API**: Sound effects for user interactions
- **CSS Animations**: Smooth transitions and character animations
- **Responsive Design**: Mobile-first approach with iPhone 15 Pro optimization
- **JSON Data**: Easily customizable lesson content
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## File Structure

```
czechclass/
├── index.html          # Main HTML file
├── styles.css          # CSS with animations and responsive design
├── script.js           # JavaScript for lesson logic and interactions
├── lesson-data.json    # JSON file with Czech lesson examples
└── README.md          # This file
```

## Customization

### Adding New Lessons

Edit `lesson-data.json` to add new questions:

```json
{
  "type": "sentence",
  "czech": "Your Czech sentence here",
  "english": "English translation here",
  "words": ["Word1", "Word2", "Word3"]
}
```

### Modifying Character

The chibi character is created with pure CSS in `styles.css`. You can modify colors, animations, and positioning in the `.character` section.

### Sound Effects

Sound effects are generated using the Web Audio API in `script.js`. You can modify frequencies and durations in the `SoundManager` class.

## Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Usage

1. Open `index.html` in a web browser
2. Click "Start Lesson" to begin
3. Complete the interactive exercises
4. Watch Xiao Mao react to your answers!
5. Celebrate when you finish with the Traditional Chinese message

## Credits

- Character design inspired by chibi art style
- Sound effects generated with Web Audio API
- Responsive design optimized for mobile learning
- Czech language content for beginners

---

Made with ❤️ for learning Czech with your cute teacher Xiao Mao! 🐱
