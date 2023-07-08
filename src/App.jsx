function App() {
  return (
    <>
      {/* Sidebar start */}
      {/* Sidebar end */}
      {/* Header start */}
      <header>
        <div className="container">
          <div>
            <img src="src/assets/icon-menu.svg" alt="" />
          </div>
          <img src="src/assets/icon-document.svg" alt="" />
          <div>Document Name</div>
          <h1>Welcome.md</h1>
        </div>

        <div className="container">
          <img src="src/assets/icon-delete.svg" alt="" />
          <button>
            <img src="src/assets/icon-save.svg" alt="" />
            Save Changes
          </button>
        </div>
      </header>
      {/* Header end */}
      {/* Main start */}
      <main>
        <div>
          <div>
            <h2>MARKDOWN</h2>
            <textarea value="# Welcome to Markdown" name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
        <div>
          <div>
            <h2>PREVIEW</h2>
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
