# Question Types

Extensible pattern — more types will be added.

## Current Types

| Type | `type` value | Interaction | Data fields |
|------|-------------|-------------|-------------|
| Sentence composition | `"sentence"` | Drag words into order | `words: string[]` |
| Vocabulary quiz | `"vocabulary"` | Pick one from options | `options: string[]` |

## Adding a New Question Type

1. Add a new `type` value to the question data schema
2. Create `load{Type}Question()` function for rendering
3. Add branch in `loadQuestion()`: `if (type === "newType") loadNewTypeQuestion()`
4. Add branch in `checkIfCorrect()` for answer validation
5. Reuse existing UI primitives (`.word-option`, `.word-options`) where possible

## Shared Flow (all types)

```
loadQuestion() → render question → user interacts → checkAnswer()
  → correct: feedback + auto-advance (2s)
  → incorrect: feedback + reset for retry (2s)
```

- All types share: progress bar, feedback display, character reactions, sound effects
- All types use `selectedWords` array for answer state (even single-answer types)
