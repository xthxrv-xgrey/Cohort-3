# TaskFlow

A vanilla JavaScript task management app with project organization, a recycle bin, dark mode, and two built-in interactive demos that visualize core browser concepts (event propagation and the rendering pipeline).

Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

**Task management**

- Add, edit, and delete tasks with a title, description, project, tag, due date, and priority (high / medium / low)
- Mark tasks complete and restore them back to active
- Soft-delete to a Bin, with restore or permanent delete
- "Today" and "Upcoming" sidebar views that filter tasks by due date
- Live counts for active, completed, and binned tasks, plus today's/tomorrow's task counts

**Projects**

- Create custom projects and filter the task list by project
- Delete a project without losing the tasks assigned to it (they simply become unfiltered)

**Search & filtering**

- Live search across task title, description, tag, and project name

**Settings**

- Dark mode toggle (persisted)
- Empty the Bin in one click, with a confirmation prompt
- App version display

**Persistence**

- All state (tasks, projects, theme) is saved to `localStorage` and restored on page load

**Built-in learning demos**

- **Event Flow Demo** — a nested grandparent/parent/child box visualization that animates event bubbling and event capturing in sequence, to illustrate how DOM event propagation works
- **Rendering Pipeline Demo** — a step-by-step animated walkthrough of the browser rendering pipeline (HTML → Parsing → Tokenization → DOM Tree → CSSOM Tree → Render Tree)

## Tech stack

- HTML5
- CSS3 (custom fonts via `@font-face`, no external CSS frameworks)
- Vanilla JavaScript (ES6+, no libraries or frameworks)
- [Remix Icon](https://remixicon.com/) for iconography (loaded via CDN)
- Browser `localStorage` for persistence — no backend or database

## Project structure

```
.
├── index.html      # App markup: layout, task/project modals, demo modals
├── style.css       # All styling, including custom fonts and dark mode
├── script.js       # App logic: state, rendering, events, storage, demos
└── assets/
    └── images/
        └── logo.png   # App logo (referenced in index.html, not included here)
```

## Getting started

No build tools or dependencies are required.

1. Clone or download the project files.
2. Make sure an `assets/images/logo.png` file exists (or update the `<img>` src in `index.html`), since the header references a logo image.
3. Open `index.html` directly in a browser, or serve the folder with any static server, e.g.:
   ```bash
   npx serve .
   ```
4. Start adding tasks and projects — everything is saved automatically to your browser's local storage.

## How it works (architecture notes)

- **Single source of truth**: a `state` object holds `activeTasks`, `completedTasks`, `binTasks`, `projects`, the current view, selected project, dark mode flag, and search query.
- **`commit()`** is the central state-change function — it updates the current view, persists to `localStorage`, re-renders the task list, refreshes counts, and highlights the active nav button. Most actions (adding, completing, deleting, restoring tasks) flow through it.
- **Rendering is re-render-on-change**, not a virtual DOM diff — `render()` clears and rebuilds the `#tasks` container based on the current view (`active` / `completed` / `bin`) and active filters (search query, selected project).
- **Event delegation** is used for task cards and project cards (one listener on the container, using `e.target.closest(...)` and `classList` checks) rather than binding listeners per card.
- **IDs** are generated with `Date.now() + Math.random()` rather than a formal UUID library.

## Known limitations / possible improvements

- Task editing reads/writes form fields by index (`taskForm[0]`, `taskForm[1]`, …) rather than by `name`/`id`, which makes the form fragile to reordering.
- No validation beyond `required` attributes and a few `if (!data.title...)` checks — there's no protection against duplicate tags, invalid dates, etc.
- Project deletion doesn't cascade or warn if tasks reference a project that no longer exists in the dropdown.
- `localStorage` is the only persistence layer, so state doesn't sync across devices or browsers.
- No automated tests currently cover state transitions (add → complete → bin → restore → delete).

## License

Not specified — add a license here if you intend to share or open-source this project.
