function App() {
  const placeHolder = `
# Welcome to Markdown

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

## How to use this?

1. Write markdown in the markdown editor window
2. See the rendered markdown in the preview window

### Features

- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
- Name and save the document to access again later
- Choose between Light or Dark mode depending on your preference

> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

#### Headings

To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.

##### Lists

You can see examples of ordered and unordered lists above.

###### Code Blocks

This markdown editor allows for inline-code snippets

`

  return (
    <>
      {/* Sidebar start */}
      {/* Sidebar end */}
      {/* Header start */}
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
            <h3 className="header__doc-title">Welcome.md</h3>
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
      {/* Header end */}
      {/* Main start */}
      <main>
        <div>
          <div className="editor__title-container">
            <h3 className="editor__title">MARKDOWN</h3>
          </div>
          <textarea value={placeHolder} name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div>
          <div className="preview__title-container">
            <h3 className="preview__title">PREVIEW</h3>
            <img src="src/assets/icon-show-preview.svg" alt="" />
          </div>
          <div>
            <h1>Welcome to Markdown</h1>
          </div>
        </div>
      </main>
      Markdown Preview
      {/* Main end */}
      <footer>2023 Marcus Hugo. Made with love.</footer>
    </>
  )
}

export default App
