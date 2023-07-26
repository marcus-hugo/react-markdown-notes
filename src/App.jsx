import { React, useState, useEffect } from "react"
import useMediaQuery from "./hooks/useMediaQuery"
import data from "./data.json"
import Sidebar from "./components/Sidebar"
import Modal from "./components/Modal"
import Header from "./components/Header"
import Editor from "./components/Editor"
import Footer from "./components/Footer"
import { nanoid } from "nanoid"
import useLocalStorage from "use-local-storage"

function App() {
  const [title, setTitle] = useState("")
  const [markdown, setMarkdown] = useState("")
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [{ id: nanoid(), createdAt: new Date().toLocaleDateString(), title: "untitled-document", content: "type note here..." }])
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showEditor, setShowEditor] = useState(true)

  const [showPreview, setShowPreview] = useState(true)
  const [hidePreview, setHidePreview] = useState(false)
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isTablet = useMediaQuery("(min-width: 768px)")
  const isDesktop = useMediaQuery("(min-width: 1440px)")

  const mql = window.matchMedia("(prefers-color-scheme: dark)")
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches // true
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light") // true = 'dark'

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  mql.addEventListener("change", switchTheme)

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

  // Show only Preview or Editor
  function handleShowPreview(e) {
    e.preventDefault()
    setShowPreview(!showPreview)
    setHidePreview(!hidePreview)
    console.log(showPreview)
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
    <div className="app-container" data-theme={theme}>
      <main>
        <Sidebar markdown={markdown} setMarkDown={setMarkdown} notes={notes} setNotes={setNotes} newNote={newNote} saveNote={saveNote} updateNote={updateNote} isOpen={isOpen} isMobile={isMobile} theme={theme} switchTheme={switchTheme} />
        {showModal && <Modal handleShowModal={handleShowModal} deleteCurrentNote={deleteCurrentNote} title={title} />}

        <form action="" onSubmit={saveNote} className="form">
          <Header markdown={markdown} notes={notes} setNotes={setNotes} title={title} setTitle={setTitle} deleteCurrentNote={deleteCurrentNote} isOpen={isOpen} setIsOpen={setIsOpen} handleToggle={handleToggle} handleShowModal={handleShowModal} isTablet={isTablet} isDesktop={isDesktop} />
          <Editor showEditor={showEditor} markdown={markdown} setMarkdown={setMarkdown} handlePreviewMode={handlePreviewMode} isMobile={isMobile} showPreview={showPreview} handleShowPreview={handleShowPreview} hidePreview={hidePreview} />
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default App
