import ToggleSwitch from "./ToggleSwitch"

// Sidebar Component
function Sidebar({ notes, newNote, updateNote, isOpen, isMobile, theme, switchTheme }) {
  return (
    <>
      {isOpen && (
        <aside className="sidebar-container">
          <div>
            <div>
              {isMobile && <h1 className="header__title sidebar__title-mobile">MARKDOWN</h1>}
              <h2 className="sidebar__title">MY DOCUMENTS</h2>
            </div>

            <div>
              <button onClick={newNote} className="sidebar__button">
                + New Document
              </button>
            </div>

            <div>
              <nav>
                <ul className="sidebar__ul">
                  {notes.map(note => {
                    return (
                      <li key={note.id} id={note.id} className="sidebar__li">
                        <button className="note-btn" onClick={() => updateNote(note.id)}>
                          <img src="icon-document.svg" alt="" />
                          <div>
                            <span className="sidebar__note-date">{note.createdAt}</span>
                            <h3 className="sidebar__note-title">{note.title}</h3>
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </div>
          <ToggleSwitch theme={theme} switchTheme={switchTheme} />
        </aside>
      )}
    </>
  )
}

export default Sidebar
