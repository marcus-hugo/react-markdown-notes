import { React, useState } from "react"
import ReactMarkdown from "react-markdown"
import data from "./data.json"

const currentYear = new Date().getFullYear()

function App() {
  const placeHolder = data[1].content
  const [markdown, setMarkdown] = useState(placeHolder)

  // Convert in real time
  function handleChange(e) {
    setMarkdown(e.target.value)
  }

  return (
    <>
      {/* Sidebar start */}
      {/* Sidebar end */}
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
            <h2 className="header__sub-title">Document Name</h2>
            <h3 className="header__doc-title">{data[1].name}</h3>
          </div>
        </div>

        <div className="container">
          <img className="icon-delete" src="src/assets/icon-delete.svg" alt="" />
          <button className="header__button">
            <img src="src/assets/icon-save.svg" alt="" />
            <span> Save Changes</span>
          </button>
        </div>
      </header>

      <main>
        <div>
          <div className="editor__title-container">
            <h3 className="editor__title">MARKDOWN</h3>
          </div>
          <textarea value={markdown} onChange={handleChange} name="" id="" cols="50" rows="30"></textarea>
        </div>
        <div className="preview">
          <div className="preview__title-container">
            <h3 className="preview__title">PREVIEW</h3>
            <img src="src/assets/icon-show-preview.svg" alt="" />
          </div>
          <ReactMarkdown className="preview" children={markdown} />
        </div>
      </main>

      <footer>
        <small>{currentYear} Marcus Hugo. Made with 🥵 and ☕️ .</small>
      </footer>
    </>
  )
}

export default App
