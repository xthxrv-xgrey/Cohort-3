import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Filters from "./components/Filters.jsx";
import QuestionList from "./components/QuestionList.jsx";
import QuestionFormDialog from "./components/QuestionFormDialog.jsx";
import ConfirmDialog from "./components/ConfirmDialog.jsx";
import { useTrackerStore } from "./store/useTrackerStore";
import { filterQuestions, getStats } from "./utils/filterQuestions";

function App() {
  const questions = useTrackerStore((state) => state.questions);
  const filters = useTrackerStore((state) => state.filters);
  const theme = useTrackerStore((state) => state.theme);
  const deleteQuestion = useTrackerStore((state) => state.deleteQuestion);

  // Which dialog is open? These are only UI state, so they stay local.
  const [formMode, setFormMode] = useState(null); // null | "add" | "edit"
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Apply the theme to the page.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const stats = useMemo(() => getStats(questions), [questions]);
  const visibleQuestions = useMemo(() => filterQuestions(questions, filters), [questions, filters]);

  const statusCounts = {
    Pending: stats.pending,
    "In Progress": stats.inProgress,
    Completed: stats.completed,
  };

  const editingQuestion = questions.find((q) => q.id === editingId) || null;
  const deletingQuestion = questions.find((q) => q.id === deletingId) || null;

  function openAdd() {
    setEditingId(null);
    setFormMode("add");
  }

  function openEdit(id) {
    setEditingId(id);
    setFormMode("edit");
  }

  function closeForm() {
    setFormMode(null);
    setEditingId(null);
  }

  function confirmDelete() {
    deleteQuestion(deletingId);
    setDeletingId(null);
  }

  return (
    <>
      <Header onAddClick={openAdd} />

      <main className="container">
        <Dashboard stats={stats} />

        <section className="card" aria-labelledby="questions-heading">
          <h2 id="questions-heading">Questions</h2>
          <Filters
            statusCounts={statusCounts}
            resultCount={visibleQuestions.length}
            totalCount={questions.length}
          />
          <QuestionList
            questions={visibleQuestions}
            hasAnyQuestions={questions.length > 0}
            onEdit={openEdit}
            onDelete={setDeletingId}
          />
        </section>
      </main>

      {formMode === "add" && <QuestionFormDialog editingQuestion={null} onClose={closeForm} />}
      {formMode === "edit" && editingQuestion && (
        <QuestionFormDialog editingQuestion={editingQuestion} onClose={closeForm} />
      )}
      {deletingQuestion && (
        <ConfirmDialog
          question={deletingQuestion}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </>
  );
}

export default App;
