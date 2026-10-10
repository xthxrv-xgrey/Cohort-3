import Modal from "./Modal.jsx";

function ConfirmDialog({ question, onConfirm, onCancel }) {
  return (
    <Modal title="Delete this question?" titleId="confirm-heading" onClose={onCancel}>
      <p className="confirm-text">"{question.title}"</p>
      <p className="muted">This cannot be undone.</p>
      <div className="button-row button-row-end">
        <button type="button" className="btn" onClick={onCancel} data-autofocus>
          Cancel
        </button>
        <button type="button" className="btn btn-danger-solid" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
