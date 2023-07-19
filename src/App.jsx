import { React, useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import data from "./data.json"
import Footer from "./components/Footer"
import { nanoid } from "nanoid"

function App() {
  const [title, setTitle] = useState("")
  const [markdown, setMarkdown] = useState("")
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [{ id: nanoid(), createdAt: new Date().toLocaleDateString(), title: "Demo Note", content: "type note here..." }])
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "")
  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = e => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  // When notes array is updated - set local storage to notes array
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // Create new note
  function newNote() {
    let newNote = { id: nanoid(), createdAt: new Date().toLocaleDateString(), title: "New Note.md", content: "type note here" }
    setNotes(oldNotes => [newNote, ...oldNotes])
    setTitle("New Note.md")
    setMarkdown("type note here")
    console.log("new note created")
  }

  // Update notes array with new note
  function saveNote(e) {
    e.preventDefault()

    let updatedNote = { id: nanoid(), createdAt: new Date().toLocaleDateString(), title: title, content: markdown }
    let savedNotes = []
    savedNotes = [updatedNote]
    let newlySavedNotes = [...notes]
    newlySavedNotes.shift()
    let allSavedNotes = savedNotes.concat(newlySavedNotes)
    setNotes(allSavedNotes)
    console.log("note updated and saved")
  }

  // Delete current note
  function deleteCurrentNote(e) {
    e.preventDefault()
    let deletedNotes = []
    deletedNotes = [...notes]
    deletedNotes.shift()

    setNotes(deletedNotes)
    setTitle("")
    setMarkdown("")
    console.log("note deleted")
  }

  // Move edited note to top of list
  function updateNote(currentNoteId) {
    setNotes(function (notes) {
      const newlyArrangedNotes = []

      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === currentNoteId) {
          newlyArrangedNotes.unshift({ ...notes[i] })

          setTitle(newlyArrangedNotes[0].title)
          setMarkdown(newlyArrangedNotes[0].content)
        } else {
          newlyArrangedNotes.push(notes[i])
        }
      }
      return newlyArrangedNotes
    })
  }

  return (
    <div className="app-container">
      <Sidebar markdown={markdown} setMarkDown={setMarkdown} notes={notes} setNotes={setNotes} newNote={newNote} saveNote={saveNote} updateNote={updateNote} isOpen={isOpen} />

      <main>
        <form action="" onSubmit={saveNote}>
          <Header markdown={markdown} notes={notes} setNotes={setNotes} title={title} setTitle={setTitle} deleteCurrentNote={deleteCurrentNote} isOpen={isOpen} setIsOpen={setIsOpen} handleToggle={handleToggle} />
          <div className="editor-container">
            {/* Editor */}
            <div>
              <div className="editor__title-container">
                <h3 className="editor__title">MARKDOWN</h3>
              </div>
              <textarea placeholder={markdown} value={markdown} onChange={e => setMarkdown(e.target.value)} name="" id="markdown" cols="50" rows="30"></textarea>
            </div>
            <div className="split"></div>
            {/* Preview */}
            <div className="preview-container">
              <div className="preview__title-container">
                <h3 className="preview__title">PREVIEW</h3>
                <img src="src/assets/icon-show-preview.svg" alt="" />
              </div>
              <ReactMarkdown className="preview" children={markdown} />
            </div>
          </div>
        </form>

        <Footer />
      </main>
    </div>
  )
}

// Sidebar Component
function Sidebar({ notes, newNote, updateNote, setNotes, isOpen }) {
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

// Header Component
function Header({ title, setTitle, deleteCurrentNote, isOpen, handleToggle }) {
  return (
    <header>
      <div className="container">
        <div>
          <button onClick={handleToggle} className="hamburger" aria-label="toggle navigation">
            {isOpen && <img src="src/assets/icon-close.svg" />}
            {!isOpen && <img src="src/assets/icon-menu.svg" />}
          </button>
        </div>

        <h1 className="header__title">MARKDOWN</h1>
        <div>
          <div className="vertical-seperator"></div>
        </div>
        <img className="icon-document" src="src/assets/icon-document.svg" alt="" />
        <div className="container column">
          <label htmlFor="title" className="header__input-label">
            Document Name
          </label>
          <input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Document Title" className="header__sub-title header__input" />
        </div>
      </div>

      <div className="container">
        <button className="header__delete-btn" onClick={deleteCurrentNote}>
          <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg">
            <path className="trashcan" d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" fill="#7C8187" />
          </svg>
        </button>

        <button type="submit" className="header__button-save">
          <img src="src/assets/icon-save.svg" alt="" />
          <span> Save Changes</span>
        </button>
      </div>
    </header>
  )
}

export default App
