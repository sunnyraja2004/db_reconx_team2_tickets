<<<<<<< HEAD
# Day 7 — Solved Files Guide
### Topic: Static Dashboard — HTML + CSS + Vanilla JS (ADV098–ADV106)

> **No Java. No React. No npm.** Just HTML, CSS, and a sprinkle of
> vanilla JavaScript. Open a browser, serve a folder, and build.
> Read this top-to-bottom before you touch a single file.

---

## What Day 7 is about

Day 7 is the pivot from backend to browser. You build a static
dashboard that shows live trade data straight from the backend you
built in Days 1–6. No framework — just CSS Grid, CSS custom properties,
a dark/light toggle, Server-Sent Events, and a sortable data table.

```
BEFORE Day 7                    AFTER Day 7
─────────────────────────────   ─────────────────────────────────
No frontend exists              Static dashboard at localhost:5500
No visible trade data           Live trade feed sliding in from SSE
No theme toggle                 Dark/light toggle saved in browser
No data table                   Sortable + resizable trades table
```

---

## Page layout (CSS Grid shell)

```
┌───────────────────────────────────────────────────────────────┐
│  HEADER  │  ReconX        Dashboard  Trades  Recon  [🌗 SSE]  │
├───────────┬───────────────────────────────────────────────────┤
│           │  Today at a glance                                │
│  SIDEBAR  │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│           │  │ Trades   │ │ Matched  │ │ Open     │          │
│  - All    │  │ 120      │ │ 105      │ │ breaks   │          │
│  - Breaks │  └──────────┘ └──────────┘ └──────────┘          │
│  - Today  │                                                   │
│           │  Live trade feed                                  │
│           │  ┌─────────────────────────────────────┐         │
│           │  │ EQU-001  SAP.DE  qty=1000  [MATCHED]│ ◄─ SSE  │
│           │  │ FX-001   EUR/USD qty=1M    [PENDING]│         │
│           │  └─────────────────────────────────────┘         │
├───────────┴───────────────────────────────────────────────────┤
│  FOOTER   │  ReconX TDI 2026 · Day 7                         │
└───────────────────────────────────────────────────────────────┘
  240px         1fr  (grows to fill remaining width)
```

---

## Server-Sent Events (SSE) data flow

```
                  Backend (Spring Boot)
                  ┌──────────────────────────────────────┐
                  │  GET /api/v1/trades/stream           │
                  │  Content-Type: text/event-stream     │
                  │                                      │
                  │  data: {"tradeRef":"EQU-001",...}    │
                  │  data: {"tradeRef":"FX-001",...}     │
                  └───────────────┬──────────────────────┘
                                  │  HTTP long-lived connection
                                  │  (stays open, no polling!)
                                  ▼
                  Browser (sse.js)
                  ┌──────────────────────────────────────┐
                  │  const sse =                         │
                  │    new EventSource('/api/v1/...')    │
                  │                                      │
                  │  sse.onmessage = (e) => {            │
                  │    const trade = JSON.parse(e.data)  │
                  │    prependTradeRow(trade)  ◄─────────┼── new card
                  │    // cap at 50 entries              │   slides in
                  │  }                                   │
                  └──────────────────────────────────────┘
                  
  Key rule: NEVER call new EventSource() inside onerror.
  The browser auto-reconnects. Manual reconnect = DDoS your dev server.
```

---

## Dark / light theme — how it works

```
localStorage                document.documentElement
┌───────────────┐           ┌────────────────────────────────┐
│ reconx-theme  │──────────►│ data-theme="dark"              │
│ = "dark"      │           └────────────────────────────────┘
└───────────────┘                     │
      ▲                               ▼
      │ write on toggle        CSS picks it up:
      │                        [data-theme="dark"] {
      │                          --color-bg: #1a1a1a;
 Click 🌗                        --color-text: #f5f5f5;
      │                        }
      └── theme.js IIFE  ──────────────────────────────────────
          reads stored value BEFORE first paint → zero white flash
```

---

## What this folder ships

| File | Ticket(s) | What it does |
|------|-----------|--------------|
| `static-dashboard/dashboard.html` | ADV098–100, ADV102, ADV104 | Page shell, KPI tiles, danger alert, SSE feed area |
| `static-dashboard/css/style.css`  | ADV099–103, ADV106 | All tokens, dark theme, keyframes, responsive breakpoints, table styles |
| `static-dashboard/js/theme.js`    | ADV100 | Dark/light toggle persisted to localStorage; anti-FOUC IIFE in `<head>` |
| `static-dashboard/js/sse.js`      | ADV104–105 | EventSource + prepend-and-animate + 50-entry DOM cap + XSS-safe `escapeHtml` |
| `static-dashboard/trades.html`    | ADV106 | Trade blotter page |
| `static-dashboard/js/trades.js`   | ADV106 | Click-to-sort, drag-to-resize on `document`, fetch from `/api/v1/trades` |

---

## Before you copy — what you should observe

Open `static-dashboard/css/style.css` in your editor.

You will see the `:root` block with tokens but **no dark theme override**,
**no `@keyframes`**, and **no table styles**. The `js/sse.js` only fires
three hardcoded demo events with no XSS protection or DOM cap.

Serve the folder and open the dashboard:

```bash
cd static-dashboard && python3 -m http.server 5500
# Open http://localhost:5500/dashboard.html
```

You will see:
- Three demo trade cards appear (no real SSE)
- Clicking the 🌗 button does nothing
- Resizing the browser breaks the layout at narrow widths
- `trades.html` shows a loading spinner that never resolves

Those are the gaps this folder fills in.

---

## Copy the solved files

### Mac / Linux

```bash
# From the project root — one-shot overlay
cp -R day7-solved-files/static-dashboard/ static-dashboard/
```

### Windows (Command Prompt)

```cmd
xcopy /E /Y day7-solved-files\static-dashboard\ static-dashboard\
```

### Windows (PowerShell)

```powershell
Copy-Item -Recurse -Force day7-solved-files\static-dashboard\* static-dashboard\
```
=======
# Day 7 — Solved Files & How To Run

Day 7 is your frontend day. Zero backend Java changes — everything
happens in the `static-dashboard/` folder at the project root (HTML +
CSS + vanilla JS talking to the backend over `fetch` and SSE).

**What this folder ships** (a snapshot of the current `static-dashboard/`
tree — overlay with the command in Quick Start):

- `static-dashboard/dashboard.html`
- `static-dashboard/css/style.css`
- `static-dashboard/js/sse.js` — SSE handler (ADV104/ADV105)
- `static-dashboard/js/theme.js` — dark/light toggle (ADV100)

The backend surface these files call is already in place from Days 1–6
(`GET /v1/trades`, `/v1/trades/stream`, JWT auth). This file is a
friendly map of the day and how to run it.

## Quick start

```bash
# From the project root — one-shot overlay:
cp -R day7-solved-files/static-dashboard/ static-dashboard/
```

**In this file:**

1. What Day 7 covers.
2. How to run the static dashboard against the backend.
3. What success looks like.
4. Troubleshooting.

---

## What Day 7 covers

Nine tickets (ADV098–106), all in `static-dashboard/`:

| Ticket | Topic |
|---|---|
| ADV098 | Flexbox layout — sidebar, header, three-column main, footer |
| ADV099 | CSS custom properties as design tokens |
| ADV100 | Dark / light theme toggle |
| ADV101 | Real-time trade-feed area with a slide-in animation |
| ADV102 | Named CSS animations: fade-in, slide-in, pulse |
| ADV103 | Responsive breakpoints — desktop, tablet, mobile |
| ADV104 | Server-Sent Events subscription to `/api/v1/trades/stream` |
| ADV105 | SSE handler with prepend-and-animate |
| ADV106 | Advanced data table — sortable, resizable, frozen header |

No file overlay to do — you edit `static-dashboard/dashboard.html`,
`static-dashboard/css/*`, and `static-dashboard/js/*` directly.
>>>>>>> c2757038 (daywise-files)

---

## Run the project

<<<<<<< HEAD
You need **two terminals** — one for the backend, one for the dashboard.

### Terminal 1 — backend (Mac / Linux)
=======
You need two terminals: one for the backend (so `/api/v1/trades` and
`/api/v1/trades/stream` are live), one for a static file server (so
`dashboard.html` can be loaded over HTTP, not `file://` — otherwise the
`fetch` calls hit CORS trouble).

### Before you start

1. **Java 21** on the terminal that runs the backend: `export JAVA_HOME=$(/usr/libexec/java_home -v 21)`.
2. **Days 1–6 are applied** — the SSE endpoint and the trades REST are on the backend from earlier days:
   ```bash
   for d in day1 day2 day3 day4 day5 day6; do cp -R ${d}-solved-files/backend/ backend/; done
   ```
3. **Python 3** or Node available for the static server (`python3 -m http.server` is fine).

### Terminal 1 — backend
>>>>>>> c2757038 (daywise-files)

```bash
cd backend
./mvnw spring-boot:run
<<<<<<< HEAD
# Runs on http://localhost:8081/api
```

### Terminal 1 — backend (Windows)

```cmd
cd backend
mvnw.cmd spring-boot:run
```

### Terminal 2 — static file server (Mac / Linux / Windows)
=======
# waits on port 8081, context path /api
```

### Terminal 2 — static dashboard
>>>>>>> c2757038 (daywise-files)

```bash
cd static-dashboard
python3 -m http.server 5500
<<<<<<< HEAD
```

> **Why a server?** Loading `dashboard.html` via `file://` causes CORS
> errors when `fetch` and `EventSource` try to call the backend.
> Always use an HTTP server.

No Python? Use Node:

```bash
npx serve -p 5500 .
```

Then open:
- **Dashboard** → http://localhost:5500/dashboard.html
- **Trades table** → http://localhost:5500/trades.html

---

## What to observe AFTER copying

### Observation 1 — Dark/light theme

Click **🌗** in the header. The entire page flips to dark mode instantly —
every colour changes because they all use `var(--token-name)` instead
of hardcoded hex. Open DevTools → Application → Local Storage. Key
`reconx-theme` is set to `dark`.

Reload the page. The dark background appears **before** any content —
no white flash. This is because the IIFE in `<head>` runs before the
browser paints.

### Observation 2 — Live trade feed

With the backend running, DevTools → Network tab → filter by "stream".
You see one open connection to `/api/v1/trades/stream` that stays open
(status: pending). Each trade you POST via Swagger appears at the
**top** of the feed with a slide-in animation.

Open DevTools Console and type:

```js
document.getElementById('trade-feed').children.length
```

Post 55+ trades and re-check — it will never exceed 50.

### Observation 3 — Responsive layout

Open DevTools → device toolbar → select "iPhone SE" (375px). The
sidebar disappears, the header stays readable, cards stack to one
column. No horizontal scrollbar.

### Observation 4 — Sortable table on trades.html

Open http://localhost:5500/trades.html. Click the **Quantity** column
header. Rows sort numerically ascending and a ▲ appears. Click again →
descending ▼. Drag the small resize handle next to any header — the
column widens. Scroll the table body — the header stays pinned.

---

## Ticket checklist

| # | Ticket | Before | After |
|---|--------|--------|-------|
| ADV098 | CSS Grid page shell | Flat single-column layout | Header, sidebar, main, footer in grid |
| ADV099 | CSS custom properties | Hardcoded hex values | All values via `var(--token)` |
| ADV100 | Dark/light theme | Toggle does nothing | Full theme swap + persisted + no FOUC |
| ADV101 | Trade feed area | Empty div | Styled `#trade-feed` with green/red left borders |
| ADV102 | CSS animations | No animations | `slide-in`, `fade-in`, `pulse` keyframes |
| ADV103 | Responsive breakpoints | Breaks at 720px | Sidebar hides, layout reflows cleanly |
| ADV104 | SSE subscription | Three hardcoded demo events | Real `EventSource` to `/api/v1/trades/stream` |
| ADV105 | Prepend-and-animate | Appends raw unsanitised HTML | `escapeHtml` + `Intl.NumberFormat` + 50-cap |
| ADV106 | Advanced data table | Loading spinner | Sort + resize + sticky header |
=======
# then open http://localhost:5500/dashboard.html
```

If you're on the `/v1/trades` page, open
<http://localhost:5500/trades.html> instead.

Hit `Ctrl+C` in each terminal when you're done.

---

## What success looks like

- The dashboard loads at <http://localhost:5500/dashboard.html> with your Day-7 layout (sidebar + header + main + footer).
- Toggling the theme swaps every colour via the CSS custom properties — no per-element style edits needed.
- A new trade posted to `POST /api/v1/trades` from Swagger UI appears in the SSE feed with your slide-in animation.
- Resizing the browser to tablet / phone widths cleanly reflows the layout — no horizontal scroll, no overlapping panels.
- The data table on `trades.html` sorts on column click, columns are resizable, and the header stays frozen while the body scrolls.
>>>>>>> c2757038 (daywise-files)

---

## Troubleshooting

<<<<<<< HEAD
| Problem | Fix |
|---------|-----|
| CORS error on `fetch` or `EventSource` | You opened the HTML via `file://`. Use `python3 -m http.server 5500` |
| Theme flashes white on reload | Inline IIFE is after the `<link rel="stylesheet">` — move it before |
| SSE feed shows "Connecting…" forever | Backend is not running. Demo events still fire via `setTimeout` |
| Sort does not change row order | `data-col` on `<th>` does not match the property name on the trade JSON object |
| Sticky header scrolls with body | An ancestor element has `overflow: hidden` — change it to `overflow: auto` |
| Drag stops when cursor leaves handle | Mouse listeners are on the handle, not `document` — fix in `trades.js` |
| Port 5500 in use | Change to `python3 -m http.server 5600` and open that port instead |
=======
- **SSE feed doesn't update** — check the browser DevTools Network tab for a `text/event-stream` connection to `/api/v1/trades/stream` staying open. If it's returning 401, you're not sending the JWT in your `EventSource` init — pass it as a query param or a custom header depending on how the backend accepts it.
- **CORS error on `fetch`** — you loaded the HTML via `file://` instead of the static server. Use `python3 -m http.server 5500`.
- **Theme toggle only changes some elements** — some elements are hard-coding colours instead of using the design tokens. Grep your CSS for hex codes; each should be a `var(--…)` reference.
- **Table columns won't resize** — make sure you attached the resize handler on the `<th>` right edge, not the whole cell.
- **Port 5500 in use** — pick another (`python3 -m http.server 5600`).

Frontend day, so keep your DevTools panel open the whole time.
>>>>>>> c2757038 (daywise-files)
