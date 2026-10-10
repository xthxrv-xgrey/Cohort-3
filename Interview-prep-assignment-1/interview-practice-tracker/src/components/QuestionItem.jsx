import { Pencil, Trash2 } from "lucide-react";
import { STATUSES } from "../constants";
import { useTrackerStore } from "../store/useTrackerStore";

function slug(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

function QuestionItem({ question, onEdit, onDelete }) {
  const setStatus = useTrackerStore((state) => state.setStatus);
  const statusSelectId = `status-${question.id}`;

  return (
    <li className={`question question-${slug(question.difficulty)}`}>
      <div className="question-main">
        <h3 className="question-title">{question.title}</h3>

        <div className="meta">
          <span className="tag">{question.category}</span>
          <span className="difficulty">
            <span className={`difficulty-dot dot-${slug(question.difficulty)}`} aria-hidden="true" />
            {question.difficulty}
          </span>
          <span className={`status-pill status-${slug(question.status)}`}>{question.status}</span>
        </div>

        {question.notes && <p className="question-notes">{question.notes}</p>}
      </div>

      <div className="question-actions">
        <label className="sr-only" htmlFor={statusSelectId}>
          Status
        </label>
        <select
          id={statusSelectId}
          className="status-select"
          value={question.status}
          onChange={(event) => setStatus(question.id, event.target.value)}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="icon-btn icon-btn-bordered"
          onClick={() => onEdit(question.id)}
          aria-label={`Edit: ${question.title}`}
          title="Edit"
        >
          <Pencil size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-btn icon-btn-bordered icon-btn-danger"
          onClick={() => onDelete(question.id)}
          aria-label={`Delete: ${question.title}`}
          title="Delete"
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

export default QuestionItem;
