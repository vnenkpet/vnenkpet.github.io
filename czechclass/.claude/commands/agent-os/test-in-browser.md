# Test in Browser

Run the app in a real browser and perform a smoke test using the cursor-ide-browser MCP. **By default, play through the full lesson and finish it** (auto-answer with correct answers until the completion screen).

The app is built to be testable without snapshot refs: use **playTest** (`?playTest=1`) to auto-play to completion, or **keyboard** (`?test=1` + Enter) / **URL** (`?startLesson=1`) for a shorter smoke test.

## Important Guidelines

- **Serve the app over HTTP** — Use a local server (e.g. `npx serve .` or `python3 -m http.server`) from the project root.
- **Lock before interacting** — After navigating, call `browser_lock`; call `browser_unlock` when done.
- **Prefer full playthrough** — Use `?playTest=1` so the app plays the game and reaches the completion screen; then wait for "Lesson Complete!" or "Try Again".

## Process

### Step 1: Start a Local Server

From the **project root** (the directory containing `index.html`):

- If `npx` is available: `npx serve . -p 3000` (or another free port, e.g. 3001 if 3000 is in use).
- Otherwise: `python3 -m http.server 3000`.

Run the server **in the background**. Note the port and base URL (e.g. `http://localhost:3001`).

### Step 2: Open the App and Play Through

1. Use **browser_tabs** with action `list` to see existing tabs.
2. Use **browser_navigate** to open `http://localhost:PORT/?playTest=1` (e.g. `http://localhost:3000/?playTest=1`). The app will start the lesson and **auto-answer every question correctly** until the lesson is complete.
3. Use **browser_lock** so subsequent actions target this tab.

### Step 3: Wait for Completion

1. Use **browser_wait_for** with `text: "Lesson Complete!"` and `timeout: 60000` (about 60 seconds; the lesson has multiple questions with 2s delay per correct answer). This confirms the game was played and finished.
2. If the wait succeeds, the full playthrough passed. Optionally use **browser_wait_for** with `text: "Try Again"` as an alternative (completion screen also has that button).

### Step 4: Report and Clean Up

1. Use **browser_unlock** when finished.
2. Summarize for the user:
   - **Pass** — App loaded, lesson auto-played, completion screen appeared ("Lesson Complete!" or "Try Again").
   - **Fail** — What failed (e.g. wait timeout, wrong screen, server not reachable) and any console/network details if useful.

If you started a background server, mention whether it is still running or was stopped.

## Shorter smoke test (optional)

- **Keyboard:** Navigate to `http://localhost:PORT/?test=1`, **browser_lock**, press **Enter**, then **browser_wait_for** for `text: "of"` (lesson screen).
- **URL only:** Navigate to `http://localhost:PORT/?startLesson=1`, then **browser_wait_for** for `text: "of"`.
