// Sidebar Component
function Sidebar({ notes, newNote, updateNote, isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="sidebar-container">
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
      )}
    </>
  )
}

export default Sidebar
