import { React, useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import data from "./data.json"
import Sidebar from "./components/Sidebar"
import Modal from "./components/Modal"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { nanoid } from "nanoid"

function App() {
  const [title, setTitle] = useState("")
  const [markdown, setMarkdown] = useState("")
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [{ id: nanoid(), createdAt: new Date().toLocaleDateString(), title: "untitled-document", content: "type note here..." }])
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "")
  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showEditor, setShowEditor] = useState(true)

  // Show or hide sidebar
  function handleToggle(e) {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  // Show modal and confirm delete
  function handleShowModal() {
    setShowModal(!showModal)
  }

  // Hide Editor for Previw Mode
  function handlePreviewMode(e) {
    e.preventDefault()
    setShowEditor(!showEditor)
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

  // Main Return
  return (
    <div className="app-container">
      <main>
        <Sidebar markdown={markdown} setMarkDown={setMarkdown} notes={notes} setNotes={setNotes} newNote={newNote} saveNote={saveNote} updateNote={updateNote} isOpen={isOpen} />
        {showModal && <Modal handleShowModal={handleShowModal} deleteCurrentNote={deleteCurrentNote} title={title} />}

        <form action="" onSubmit={saveNote}>
          <Header markdown={markdown} notes={notes} setNotes={setNotes} title={title} setTitle={setTitle} deleteCurrentNote={deleteCurrentNote} isOpen={isOpen} setIsOpen={setIsOpen} handleToggle={handleToggle} handleShowModal={handleShowModal} />
          <div className="editor-container">
            {/* Editor */}
            {showEditor && (
              <div>
                <div className="editor__title-container">
                  <h3 className="editor__title">MARKDOWN</h3>
                </div>
                <textarea placeholder={markdown} value={markdown} onChange={e => setMarkdown(e.target.value)} name="" id="markdown" cols="50" rows="30"></textarea>
              </div>
            )}

            <div className="split"></div>
            {/* Preview */}
            <div className="preview-container">
              <div className="preview__title-container">
                <h3 className="preview__title">PREVIEW</h3>

                <button onClick={handlePreviewMode} type="button" className="preview__button">
                  {showEditor ? (
                    <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                      <path className="show-icon" d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z" fill="#7C8187" />
                    </svg>
                  ) : (
                    <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
                      <path className="show-icon" d="M1.38.027a.795.795 0 0 1 .769.206L14.815 12.9a.792.792 0 0 1 0 1.124.792.792 0 0 1-1.124 0L9.234 9.567a2.77 2.77 0 0 1-3.753-3.753L1.024 1.357a.795.795 0 0 1 .357-1.33Zm.998 3.832 1.156 1.116a10.846 10.846 0 0 0-1.773 2.153c.696 1.117 2.929 4.038 6.333 3.959a6.127 6.127 0 0 0 1.346-.198l1.25 1.25a7.505 7.505 0 0 1-2.556.53h-.198c-4.663 0-7.331-4.282-7.83-5.145a.792.792 0 0 1 0-.792A12.58 12.58 0 0 1 2.378 3.86Zm5.328-2.272c4.726-.143 7.52 4.267 8.028 5.145.15.24.163.542.031.792a12.58 12.58 0 0 1-2.304 2.874l-1.195-1.116a10.846 10.846 0 0 0 1.813-2.154c-.705-1.116-2.937-4.045-6.333-3.958a6.127 6.127 0 0 0-1.346.198L5.149 2.117a7.505 7.505 0 0 1 2.557-.53Zm-.974 5.486v.055c0 .656.532 1.188 1.188 1.188l.047-.008-1.235-1.235Z" fill="#7C8187" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="preview-inner-container">
                <div className="preview-width">
                  <ReactMarkdown className="preview" children={markdown} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default App
