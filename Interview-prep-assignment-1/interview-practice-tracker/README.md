# Interview Practice Tracker

A small React app to track interview questions you are practicing. Add questions, group them by category and difficulty, mark progress, and see how much you have completed. Everything is saved in your browser, so there is no backend or login.

## Features

- Dashboard with total, completed, in-progress and pending counts, plus a stacked progress bar and completion percentage (all calculated from the saved questions)
- Add and edit questions in a popup form, delete with a confirmation popup
- Category: DSA, Git & GitHub, Full-Stack Technical
- Difficulty: Easy, Medium, Hard (shown as a colored dot and a colored left edge on each card)
- Status: Pending, In Progress, Completed (can be changed directly from the list)
- Optional notes for each question
- Form validation (title is required, 5-200 characters; notes up to 300 characters)
- Search by title, filter by category and difficulty, status filter chips with counts, and a clear-filters button (all work together)
- Light and dark theme (your choice is remembered)
- Empty states for "no questions yet" and "no results for these filters"
- Responsive layout for desktop and mobile

## Technologies

- React 18
- Vite
- JavaScript (no TypeScript)
- Zustand (state management) with its `persist` middleware
- Lucide React (icons)
- Plain CSS

## Installation and running

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build     # production build into the dist/ folder
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  store/useTrackerStore.js    Zustand store: questions, theme, filters, and all actions
  utils/storage.js            Safe LocalStorage adapter + validation of saved data
  utils/filterQuestions.js    Filtering and dashboard statistics
  utils/initialQuestions.js   Example questions for the first launch
  components/                 Header, Dashboard, Filters, QuestionList, QuestionItem,
                              QuestionFormDialog, ConfirmDialog, Modal
```

## How state and LocalStorage work

- All shared state lives in one Zustand store (`useTrackerStore`). Components read what they need with selectors and call store actions such as `addQuestion`, `updateQuestion`, `setStatus` and `deleteQuestion`.
- The `persist` middleware saves the store to LocalStorage under the key `interview-practice-tracker:store` after every change. Only `questions` and `theme` are saved (`partialize`). Search and filters are not saved, so they reset on refresh.
- On startup the saved data is loaded and validated (`merge`). Invalid questions are skipped, and a broken or missing field falls back to its default.
- The 5 example questions are used only if nothing has ever been saved. If you delete every question, the empty list is saved and the examples do not come back.
- If you used the earlier version of this app (before Zustand), its questions are found under the old key and carried over automatically.
- If LocalStorage is blocked (for example in some private modes), the app still works but changes will not survive a refresh.
- To reset the app, clear the site data in your browser (or run `localStorage.clear()` in the dev console).

## Assumptions and limitations

- Data lives only in the current browser on the current device. It is not synced and is lost if you clear site data.
- Popups use the browser's native `<dialog>` element, which needs a reasonably recent browser (any current Chrome, Edge, Firefox or Safari).
- No export/import of questions.
