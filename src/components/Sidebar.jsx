// Sidebar Component
function Sidebar({ notes, newNote, updateNote, isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="sidebar-container">
          <div>
            <div>
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
          <div class="toggle-switch-wrapper">
            <img src="../src/assets/icon-dark-mode.svg" alt="" />

            <label class="toggle-switch" for="theme-toggle">
              <input type="checkbox" class="toggle-switch__input" id="theme-toggle" title="Toggles light and dark" role="switch" type="checkbox" aria-checked="false" aria-live="polite" />
              <span class="toggle-switch__slider"></span>
            </label>
            <img src="../src/assets/icon-light-mode.svg" alt="" />
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
