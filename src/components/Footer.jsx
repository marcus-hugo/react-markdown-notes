import React from "react"

const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className="footer">
      <small>{currentYear} Marcus Hugo. Made with 🥵 and ☕️ .</small>
    </footer>
  )
}

export default Footer
