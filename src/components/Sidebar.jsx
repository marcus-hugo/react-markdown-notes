import ToggleSwitch from "./ToggleSwitch"

// Sidebar Component
function Sidebar({ notes, newNote, updateNote, isOpen, isMobile, theme, switchTheme }) {
  return (
    <>
      {isOpen && (
        <div className="sidebar-container">
          <div>
            <div>
              {isMobile && <h1 className="header__title sidebar__title-mobile">MARKDOWN</h1>}
              <h3 className="sidebar__title">MY DOCUMENTS</h3>
            </div>

            <div>
              <button onClick={newNote} className="sidebar__button">
                + New Document
              </button>
            </div>

            <div>
              <ul className="sidebar__ul">
                {notes.map(note => {
                  return (
                    <li key={note.id} id={note.id} onClick={() => updateNote(note.id)} className="sidebar__li">
                      <img src="src/assets/icon-document.svg" alt="" />
                      <div>
                        <span className="sidebar__note-date">{note.createdAt}</span>
                        <h3 className="sidebar__note-title">{note.title}</h3>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <ToggleSwitch theme={theme} switchTheme={switchTheme} />
        </div>
      )}
    </>
  )
}

export default Sidebar
