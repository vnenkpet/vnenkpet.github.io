# Auto-Progress Timer

Keeps learning flow/momentum. Fixed 2s timing.

## Behavior

| Result | After 2s | User can also |
|--------|----------|---------------|
| Correct | Auto-advance to next question | Click "Next" early |
| Incorrect | Reset question for retry | — (must retry) |

## Visual Indicator

- Button gets `.auto-progress` class on correct answer
- CSS `::before` pseudo-element fills with green progress bar over 2s
- Button text changes to "Next" (inside `<span>` for z-index layering)

## Implementation Pattern

```js
// Correct: auto-advance
setTimeout(() => {
  if (buttonText === "Next") nextQuestion();
}, 2000);

// Incorrect: reset for retry
setTimeout(() => resetQuestion(), 2000);
```

- Always check button state before auto-advancing (user may have already clicked)
- Never skip the 2s feedback window — user needs to see what happened
