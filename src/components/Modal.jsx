import FocusTrap from "focus-trap-react"

// Modal Component
function Modal({ handleShowModal, deleteCurrentNote, title }) {
  return (
    <FocusTrap>
      <div className="modal-backdrop">
        <div id="alertdialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog_label" aria-describedby="dialog_desc" tabIndex="1" className="modal__content">
          <div className="modal__inner-container">
            <h3 id="dialog_label" className="modal__title">
              Delete this document?
            </h3>
            <button autoFocus aria-label="close" id="closeBtn" className="modal__button-escape" onClick={handleShowModal}>
              X
            </button>
          </div>

          <p id="dialog_desc" className="modal__text">
            Are you sure you want to delete "{title}" document and its contents? This action cannot be reversed.
          </p>
          <button id="notes_confirm" type="button" onClick={deleteCurrentNote} className="modal__button-save">
            Confirm & Delete
          </button>
        </div>
      </div>
    </FocusTrap>
  )
}

export default Modal
