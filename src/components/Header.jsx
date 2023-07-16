import React from "react"

const Header = props => {
  const handleClick = () => {
    console.log("saved!")
  }

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
          <h2 className="header__sub-title">Document Name</h2>
          <h3 className="header__doc-title">{props.data[1].name}</h3>
        </div>
      </div>

      <div className="container">
        <img className="icon-delete" src="src/assets/icon-delete.svg" alt="" />
        <button onClick={handleClick} className="header__button-save">
          <img src="src/assets/icon-save.svg" alt="" />
          <span> Save Changes</span>
        </button>
      </div>
    </header>
  )
}

export default Header
