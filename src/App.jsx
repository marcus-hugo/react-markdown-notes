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

  // When notes array is updated - set local storage to notes array
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // Create new note
  function newNote() {
    let newNote = { id: nanoid(), createdAt: new Date().toLocaleDateString(), title: title, content: markdown }
    setNotes(oldNotes => [newNote, ...oldNotes])
    setTitle("New Note")
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

  // Move edited note to top of list
  function updateNote(currentNoteId) {
    setNotes(function (notes) {
      const newlyArrangedNotes = []

      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === currentNoteId) {
          newlyArrangedNotes.unshift({ ...notes[i], body: markdown })
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
      <Sidebar markdown={markdown} setMarkDown={setMarkdown} notes={notes} setNotes={setNotes} newNote={newNote} saveNote={saveNote} updateNote={updateNote} />

      <main>
        <form action="" onSubmit={saveNote}>
          <Header markdown={markdown} notes={notes} setNotes={setNotes} title={title} setTitle={setTitle} />
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
function Sidebar({ notes, newNote, updateNote, setNotes }) {
  return (
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

                  <button
                    onClick={() => {
                      setNotes(notes.filter(n => n.id !== note.id))
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

// Header Component
function Header({ title, setTitle }) {
  return (
    <header>
      <div className="container">
        <div className="hamburger">
          <img src="src/assets/icon-menu.svg" alt="" />
        </div>

        <h1 className="header__title">MARKDOWN</h1>
        <div>
          <div className="vertical-seperator"></div>
        </div>
        <img className="icon-document" src="src/assets/icon-document.svg" alt="" />
        <div>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Document Title" className="header__sub-title" />

          {/* <h3 className="header__doc-title">{data[0].name}</h3> */}
        </div>
      </div>

      <div className="container">
        <img className="icon-delete" src="src/assets/icon-delete.svg" alt="" />
        <button type="submit" className="header__button-save">
          <img src="src/assets/icon-save.svg" alt="" />
          <span> Save Changes</span>
        </button>
      </div>
    </header>
  )
}

export default App
