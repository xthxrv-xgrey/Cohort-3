# 📋 Kanban Board

A modern, responsive, and feature-packed Kanban Board built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Zustand**. Designed for seamless task tracking, workflow organization, and personal productivity.

🚀 **Live Demo:** [https://kanban-board-lime-alpha.vercel.app/](https://kanban-board-lime-alpha.vercel.app/)

---

## ✨ Features

- **📊 Three-Stage Kanban Workflow**: Organizes tasks across distinct, color-coded columns:
  - 🔘 **Pending** — Tasks lined up to be started.
  - 🔵 **In Progress** — Tasks currently underway.
  - 🟢 **Completed** — Finished tasks.
- **⚡ Fast Status Transitions**: Move tasks between columns in a single click directly from the task card.
- **🔍 Multi-Field Live Search**: Filter tasks in real-time across titles, descriptions, priorities, statuses, and due dates.
- **🎯 Column-Level Priority Filters**: Independently filter tasks in each column by priority (`All`, `High`, `Medium`, `Low`).
- **💾 LocalStorage Persistence**: Powered by Zustand's `persist` middleware (`kanban-tasks-storage`). Your data remains intact across page refreshes and browser restarts.
- **⚡ Normalized O(1) State Store**: Tasks are stored as a key-value hash map (`{ [id]: task }`) ensuring constant-time lookups and streamlined updates.
- **📝 Form Validation with React Hook Form**:
  - Required fields, character bounds (title 3–100 chars, description up to 1000 chars).
  - Pre-populated default due dates and sensible initial states.
  - Fully accessible dialogs with backdrop dismissal and keyboard support.
- **🔔 Interactive Toast Feedback**: Instant alerts on task creation, modification, column movement, and deletion powered by [Sonner](https://sonner.emilkowal.ski/).
- **📱 Responsive & Clean UI**: Styled with Tailwind CSS v4 featuring micro-interactions, subtle hover states, badges, and empty-state placeholders.

---

## 🛠️ Tech Stack

| Technology                                          | Purpose                                                             |
| :-------------------------------------------------- | :------------------------------------------------------------------ |
| **[React 19](https://react.dev/)**                  | Core UI library utilizing modern hooks and patterns                 |
| **[Vite 8](https://vite.dev/)**                     | Blazing-fast build tool and developer environment                   |
| **[Tailwind CSS v4](https://tailwindcss.com/)**     | Utility-first CSS styling using `@tailwindcss/vite`                 |
| **[Zustand 5](https://zustand.docs.pmnd.rs/)**      | Lightweight, boilerplate-free state management with persistence     |
| **[React Hook Form](https://react-hook-form.com/)** | Performant, uncontrolled form management and client-side validation |
| **[Sonner](https://sonner.emilkowal.ski/)**         | Toast notification system                                           |
| **[ESLint 10](https://eslint.org/)**                | Code quality and linting                                            |

---

## 📂 Project Structure

```text
Kanban-Board/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── AddTaskModal.jsx    # Modal & form to create new tasks
│   │   ├── EditTaskModal.jsx   # Modal & form to update existing tasks
│   │   ├── Header.jsx          # App navbar, global search bar & "+ Add task" trigger
│   │   ├── KanbanBoard.jsx     # Columns layout, priority filtering & column counters
│   │   └── TaskCard.jsx        # Individual card with action buttons (edit, delete, move)
│   ├── hooks/
│   │   └── useTaskSearch.js    # Memoized multi-field search hook
│   ├── stores/
│   │   ├── useModalStore.js    # Modal visibility and active task ID state
│   │   └── useTaskStore.js     # Normalized tasks state, CRUD actions & persistence
│   ├── App.jsx                 # Main application layout and modal mounting
│   ├── index.css               # Tailwind CSS entrypoint
│   └── main.jsx                # Application root mounting
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration with React & Tailwind plugins
├── eslint.config.js            # Flat ESLint configuration
└── package.json                # Project dependencies and npm scripts
```

---

## 🧠 Architecture & State Design

### 1. Normalized Task Store (`src/stores/useTaskStore.js`)

Instead of storing tasks in a flat array, tasks are keyed by their unique identifier:

```javascript
{
  tasks: {
    "task-101": {
      id: "task-101",
      title: "Buy groceries",
      description: "...",
      priority: "high",
      dueDate: "2026-10-25",
      status: "pending"
    }
  }
}
```

**Benefits:**

- **$O(1)$ Lookups:** Editing, updating, or referencing any task by ID avoids iterating through the entire list.
- **Persistence:** Automatically serialized to `localStorage` under `kanban-tasks-storage`.
- **Pre-seeded sample data:** New sessions come populated with everyday tasks so users can immediately experience the board.

### 2. Modal Orchestration (`src/stores/useModalStore.js`)

Global modal state is decoupled from components. It tracks:

- `modalType`: `'create' | 'edit' | null`
- `selectedTaskId`: ID of the task being edited

### 3. Multi-Field Memoized Search (`src/hooks/useTaskSearch.js`)

The search hook evaluates task queries against:

- Title
- Description
- Priority
- Status
- Due Date

Using `useMemo`, search results only recalculate when either the task list or search query changes.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version `18.0.0` or higher recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Kanban-Board
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to the local URL shown in your terminal (typically `http://localhost:5173/`).

---

## 📜 Available Scripts

In the project directory, you can run:

| Command           | Description                                                              |
| :---------------- | :----------------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with Hot Module Replacement (HMR).    |
| `npm run build`   | Compiles and bundles production-ready assets into the `dist/` directory. |
| `npm run preview` | Locally serves the production build from `dist/` to verify bundling.     |
| `npm run lint`    | Runs ESLint across `.js` and `.jsx` files to check code quality.         |

---

## 💡 How to Use

1. **Create a Task**: Click the **"+ Add task"** button in the header, fill out the required title, choose a priority, status, and due date, then click **"Create task"**.
2. **Move Task**: On any task card, click the status button (e.g., `In Progress` or `Completed`) in the bottom right corner to immediately move it to that column.
3. **Filter by Priority**: Use the filter chips (`All`, `High`, `Medium`, `Low`) located at the top of each column to narrow down tasks by priority.
4. **Search**: Type into the search input in the header to instantly filter tasks across all fields.
5. **Edit / Delete**: Hover over a card on desktop (or tap on mobile) to reveal edit (pencil) and delete (trash) buttons.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
