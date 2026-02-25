# Visual Style — Kawaii/Cute Aesthetic

All UI elements use a chunky, kawaii-inspired style matching the chibi character.

## Rules

- **Borders:** `4px solid #000000` on all interactive/container elements
- **Border radius:** 12-20px (15px default)
- **Box shadows:** `0 Npx 0 rgba(0,0,0,0.3)` where N = 4-8 (pressed/raised states)
- **Text shadows:** `Npx Npx 0 rgba(0,0,0,0.2-0.3)` on all visible text
- **Backgrounds:** Always use `linear-gradient(135deg, ...)` — no flat colors
- **Font:** Fredoka (fallback: Comic Sans MS, cursive)

## Interactive States

```css
/* Default */
box-shadow: 0 4px 0 rgba(0,0,0,0.3);

/* Hover — lift up */
transform: translateY(-2px);
box-shadow: 0 6-8px 0 rgba(0,0,0,0.3);

/* Disabled */
opacity: 0.6;
cursor: not-allowed;
```

- No flat/minimal elements — everything gets the chunky treatment
- New elements must feel like they belong next to the chibi mascot
