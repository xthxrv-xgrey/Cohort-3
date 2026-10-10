import { useState } from "react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../constants";
import { useTrackerStore } from "../store/useTrackerStore";
import Modal from "./Modal.jsx";

const TITLE_MAX = 200;
const NOTES_MAX = 300;

const emptyForm = {
  title: "",
  category: CATEGORIES[0],
  difficulty: DIFFICULTIES[0],
  status: STATUSES[0],
  notes: "",
};

function validate(values) {
  const errors = {};
  const title = values.title.trim();

  if (title === "") {
    errors.title = "Title is required.";
  } else if (title.length < 5) {
    errors.title = "Title should be at least 5 characters.";
  } else if (title.length > TITLE_MAX) {
    errors.title = `Title must be ${TITLE_MAX} characters or fewer.`;
  }

  if (values.notes.length > NOTES_MAX) {
    errors.notes = `Notes must be ${NOTES_MAX} characters or fewer.`;
  }

  return errors;
}

// This component is only mounted while the dialog is open, so the form
// always starts fresh (add) or pre-filled (edit).
function QuestionFormDialog({ editingQuestion, onClose }) {
  const addQuestion = useTrackerStore((state) => state.addQuestion);
  const updateQuestion = useTrackerStore((state) => state.updateQuestion);

  const isEditing = editingQuestion !== null;

  const [values, setValues] = useState(
    isEditing
      ? {
          title: editingQuestion.title,
          category: editingQuestion.category,
          difficulty: editingQuestion.difficulty,
          status: editingQuestion.status,
          notes: editingQuestion.notes,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const foundErrors = validate(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    const cleaned = { ...values, title: values.title.trim(), notes: values.notes.trim() };

    if (isEditing) {
      updateQuestion(editingQuestion.id, cleaned);
    } else {
      addQuestion(cleaned);
    }
    onClose();
  }

  return (
    <Modal
      title={isEditing ? "Edit question" : "Add a question"}
      titleId="form-heading"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            data-autofocus
            value={values.title}
            onChange={handleChange}
            aria-invalid={errors.title ? "true" : "false"}
            aria-describedby={errors.title ? "title-error" : undefined}
            placeholder="e.g. What is a closure in JavaScript?"
          />
          {errors.title && (
            <p id="title-error" className="error" role="alert">
              {errors.title}
            </p>
          )}
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={values.category} onChange={handleChange}>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty" value={values.difficulty} onChange={handleChange}>
              {DIFFICULTIES.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={values.status} onChange={handleChange}>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            value={values.notes}
            onChange={handleChange}
            aria-invalid={errors.notes ? "true" : "false"}
            aria-describedby={errors.notes ? "notes-error" : undefined}
          />
          {errors.notes && (
            <p id="notes-error" className="error" role="alert">
              {errors.notes}
            </p>
          )}
        </div>

        <div className="button-row button-row-end">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Save changes" : "Add question"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default QuestionFormDialog;
