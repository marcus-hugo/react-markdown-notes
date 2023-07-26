// Header Component
function Header({ title, setTitle, isOpen, handleToggle, handleShowModal, isTablet }) {
  return (
    <header>
      <div className="container">
        <div>
          <button aria-label="toggle navigation" type="button" onClick={handleToggle} className="hamburger">
            {isOpen && <img src="src/assets/icon-close.svg" alt="" />}
            {!isOpen && <img src="src/assets/icon-menu.svg" alt="" />}
          </button>
        </div>
        {isTablet && (
          <>
            <h1 className="header__title">MARKDOWN</h1>
            <div>
              <div className="vertical-seperator"></div>
            </div>
          </>
        )}

        <img className="icon-document" src="src/assets/icon-document.svg" alt="" />
        <div className="container column">
          <label htmlFor="title" className="header__input-label">
            {isTablet && "Document Name"}
          </label>
          <input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Document Title" className="header__sub-title header__input" />
        </div>
      </div>

      <div className="container">
        <button aria-label="delete note" className="header__delete-btn" onClick={handleShowModal}>
          <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg">
            <title>trash icon</title>
            <path className="trashcan" d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" fill="#7C8187" />
          </svg>
        </button>

        <button type="submit" className="header__button-save" aria-label="save current document">
          <img src="src/assets/icon-save.svg" alt="" />
          {isTablet && <span> Save Changes</span>}
        </button>
      </div>
    </header>
  )
}

export default Header
