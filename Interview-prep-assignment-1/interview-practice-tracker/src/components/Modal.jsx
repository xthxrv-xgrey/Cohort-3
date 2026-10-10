import { useEffect, useRef } from "react";
import { X } from "lucide-react";

// Small wrapper around the native <dialog> element.
// The browser gives us Esc to close, focus trapping and the dimmed backdrop.
function Modal({ title, titleId, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();

    // Focus the field marked data-autofocus, if there is one.
    const target = dialog.querySelector("[data-autofocus]");
    if (target) target.focus();
  }, []);

  function handleClick(event) {
    // Only the backdrop (the dialog element itself) closes the modal.
    if (event.target === dialogRef.current) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
