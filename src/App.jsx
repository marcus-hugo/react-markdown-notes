import { React, useState } from "react"
import ReactMarkdown from "react-markdown"
import data from "./data.json"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  const placeHolder = data[1].content
  const [markdown, setMarkdown] = useState("")

  // Set the preview on load - may remove this later?
  useState(() => {
    if (localStorage.getItem("notes")) {
      console.log("got notes!")
    } else {
      setMarkdown(placeHolder)
    }
  }, [])

  // Convert in real time
  function handleChange(e) {
    setMarkdown(e.target.value)
  }

  return (
    <>
      <Header data={data} />
      <main>
        <div>
          <div className="editor__title-container">
            <h3 className="editor__title">MARKDOWN</h3>
          </div>

          <textarea placeholder={placeHolder} value={markdown} onChange={handleChange} name="" id="markdown" cols="50" rows="30"></textarea>
        </div>
        <div className="preview">
          <div className="preview__title-container">
            <h3 className="preview__title">PREVIEW</h3>
            <img src="src/assets/icon-show-preview.svg" alt="" />
          </div>
          <ReactMarkdown className="preview" children={markdown} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
