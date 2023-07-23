// Modal Component
function Modal({ handleShowModal, deleteCurrentNote, title }) {
  return (
    <div className="modal" onClick={handleShowModal}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="dialog_label" aria-describedby="dialog_desc" tabIndex="-1" className="modal__content">
        <h3 id="dialog_label" className="modal__title">
          Delete this document?
        </h3>
        <p id="dialog_desc" className="modal__text">
          Are you sure you want to delete "{title}" document and its contents? This action cannot be reversed.
        </p>
        <button type="button" onClick={deleteCurrentNote} className="modal__button">
          Confirm & Delete
        </button>
      </div>
    </div>
  )
}

export default Modal
