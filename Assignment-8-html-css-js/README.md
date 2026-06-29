# Credo

> A personal finance tracker built with vanilla HTML, CSS, and JavaScript.

Credo lets you log income and expenses, visualise your cash flow in real time, and manage everything from a clean, responsive dashboard — with multi-user support, dark mode, and full persistence via localStorage.

---

## Features

**Authentication**

- Register and log in with a username and password
- Multi-user support — each user's data is stored separately
- Persistent sessions — stay logged in across page refreshes
- Logout clears the active session

**Dashboard**

- Current balance, total income, total expenses, and transaction count — updated live
- Conic-gradient donut chart showing income vs expense split as a percentage
- Net amount indicator coloured green (positive) or red (negative)

**Transactions**

- Add transactions with type (credit/debit), description, amount, date, and category
- Edit any transaction inline via a modal
- Soft-delete transactions (removed from view and calculations, not from storage)
- Live search across description, category, and date
- Filter by type: All / Credit / Debit
- Responsive scrollable table with action buttons per row

**Settings**

- Change display name and username
- Change password (requires current password verification)
- Switch currency (₹ INR, $ USD, € EUR, £ GBP, ¥ JPY)
- Toggle light / dark theme (also available from the header)
- Reset all transactions
- All settings persisted to localStorage

**UI & UX**

- Fully responsive — mobile (single column) through desktop (4-column grid)
- Dark mode via CSS custom properties on `html[data-theme="dark"]`
- Smooth transitions on theme switch
- Click-outside-to-close on all modals
- Custom fonts: Inter (body), Manrope (display), Zaslia (logo), JetBrains Mono (amounts)

---

## Project structure

```
.
├── index.html          # App markup: layout, all modals, table
├── style.css           # Design tokens, layout, components, dark theme, responsive
├── script.js           # State management, financial logic, rendering, events
└── assets/
    ├── fonts/
    │   ├── Inter.ttf
    │   ├── Manrope.ttf
    │   ├── Zaslia.otf
    │   └── JetBrainsMono.ttf
    └── favicon/
        ├── apple-touch-icon.png
        ├── favicon-32x32.png
        ├── favicon-16x16.png
        └── site.webmanifest
```

---

## Getting started

No build tools or dependencies required.

```bash
# 1. Clone or download the project
git clone https://github.com/xthxrv-xgrey/credo.git
cd credo

# 2. Serve locally (any static server works)
npx serve .
# or
python3 -m http.server 3000
```

Then open `http://localhost:3000` in your browser.

> Opening `index.html` directly as a `file://` URL works too, but a local server is recommended for font loading.

---

## How it works

### State

A single `state` object holds everything:

```js
{
  theme: "light" | "dark",
  currency: "₹" | "$" | "€" | "£" | "¥",
  currentUser: "username" | null,
  users: {
    "username": {
      password: "...",
      profile: { name: "..." },
      transactions: [ Transaction ]
    }
  }
}
```

`saveState()` serialises the whole object to `localStorage`. `loadState()` restores it on page load.

### Transaction shape

```js
{
  id: string,          // crypto.randomUUID()
  type: "credit" | "debit",
  description: string,
  amount: number,
  date: string,        // YYYY-MM-DD
  category: string,
  removed: boolean     // soft-delete flag
}
```

### Rendering

`renderTransactions(arr)` clears and rebuilds the `<tbody>` from the filtered array on every state change. `updateFinancialData()` recalculates all summary numbers and updates the DOM. Both are called together after any mutation via `applyFilters()`.

`getFilteredTransactions()` applies the active search query and type filter before rendering.

### Security

All user-supplied strings are passed through `escapeHtml()` before being injected into `innerHTML`, preventing XSS. Passwords are stored in `localStorage` — suitable for a local personal tool, not for production deployment.

---

## Known limitations

- **Passwords in plaintext** — localStorage is not encrypted. This app is intended as a local personal tool only. Do not store sensitive real passwords.
- **No backend** — data does not sync across devices or browsers. localStorage is the sole persistence layer.
- **No real authentication** — password comparison is a string equality check on the client. This is by design for a vanilla JS project.
- **Soft-delete only until reseted from settings** — deleted transactions are flagged `removed: true` and excluded from all views and calculations, but never actually purged from storage until and unless reseted from settings.
- **No pagination** — all transactions are rendered at once. Performance degrades with very large transaction lists.
- **No export** — there is currently no way to export transactions to CSV or PDF.

---

## Possible improvements

- [ ] Export transactions to CSV
- [ ] Date range filter (this week / this month / custom)
- [ ] Category breakdown chart
- [ ] Monthly comparison view
- [ ] Recurring transaction support
- [ ] Budget limits per category with alerts
- [ ] End-to-end encryption for localStorage data

---

## Tech stack

| Layer       | Technology                                                  |
| ----------- | ----------------------------------------------------------- |
| Markup      | HTML5                                                       |
| Styling     | CSS3 (custom properties, conic-gradient, CSS Grid, Flexbox) |
| Logic       | Vanilla JavaScript (ES6+)                                   |
| Icons       | Remix Icon + Font Awesome (CDN)                             |
| Fonts       | Inter, Manrope, Zaslia, JetBrains Mono (self-hosted)        |
| Persistence | Browser localStorage                                        |

---

## Author

**Atharv Agrey** — [@xthxrv-xgrey](https://github.com/xthxrv-xgrey)
