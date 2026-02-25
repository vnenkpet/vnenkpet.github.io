# Animations

## Character Reactions

Character reacts only on answer feedback (correct/incorrect/completion).

| Trigger | Animation | Duration |
|---------|-----------|----------|
| Correct answer | `happy` — scale to 1.1x | 0.6s |
| Wrong answer | `sad` — slight droop + rotate | 0.6s |
| Lesson complete | `celebrate` — bounce -10px | 0.8s |
| Idle | `float` — gentle -5px bob | 3s infinite |

- Don't add character reactions for navigation, selection, or other non-answer events

## UI Transitions

- Default transition: `all 0.2s ease`
- Feedback appear: `0.3s ease` with `translateY(10px)` → `translateY(0)`
- Word appear: `0.3s ease-out` with `scale(0.8)` → `scale(1)`
- Correct pulse: `scale(1.05)` at 50%, 0.6s
- Incorrect shake: `translateX(±5px)`, 0.6s

## Sound Pairing

Animations are always paired with sounds via SoundManager:
- Correct → ascending C5-E5-G5 tones
- Incorrect → low sawtooth buzz
- Complete → C5-E5-G5-C6 melody
