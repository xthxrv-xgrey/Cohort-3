import QuestionItem from "./QuestionItem.jsx";

function QuestionList({ questions, hasAnyQuestions, onEdit, onDelete }) {
  if (!hasAnyQuestions) {
    return (
      <p className="empty-state">
        No questions yet. Click "Add question" to add your first one.
      </p>
    );
  }

  if (questions.length === 0) {
    return (
      <p className="empty-state">
        No questions match your search or filters. Try changing them or click "Clear filters".
      </p>
    );
  }

  return (
    <ul className="question-list">
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default QuestionList;
