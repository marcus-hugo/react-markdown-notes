import useState from "react"

function ToggleSwitch({ theme, switchTheme }) {
  return (
    <div className="toggle-switch-wrapper">
      <img src="../src/assets/icon-dark-mode.svg" alt="" />

      <label className="toggle-switch" htmlFor="theme-toggle">
        <input onChange={switchTheme} checked={theme === "dark" ? false : true} type="checkbox" className="toggle-switch__input" id="theme-toggle" title="Toggles light and dark" role="switch" aria-checked={theme === "light" ? "true" : "false"} aria-live="polite" />
        <span className="toggle-switch__slider"></span>
      </label>
      <img src="../src/assets/icon-light-mode.svg" alt="" />
    </div>
  )
}

export default ToggleSwitch
