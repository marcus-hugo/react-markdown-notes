import { React, useEffect, useState } from "react"
import data from "/src/data.json"
import { nanoid } from "nanoid"

const Sidebar = props => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || [])

  const createNewNote = () => {
    let newNote = {
      id: nanoid(),
      createdAt: `${new Date().toLocaleDateString()}`,
      name: "New Note",
      content: `${props.markdown}`
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
  }

  // Check for local storage
  useEffect(() => {
    console.log("Sidebar notes array updated")
  }, [notes])

  return (
    <div className="sidebar-container">
      <div>
        <h3 className="sidebar__title">MY DOCUMENTS</h3>
      </div>
      <div>
        <button onClick={createNewNote} className="sidebar__button">
          + New Document
        </button>
      </div>
      <div>
        <ul className="sidebar__ul">
          {notes.map(note => {
            return (
              <li key={note.id} id={note.id} className="sidebar__li">
                <img src="src/assets/icon-document.svg" alt="" />
                <div>
                  <span className="sidebar__note-date">{note.createdAt}</span>
                  <h3 className="sidebar__note-title">{note.name}</h3>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
