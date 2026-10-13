import "./navbar.css";

function Navbar({ darkMode, onDarkModeChange, page }) {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="site-nav__brand" href="#home">
        TextUtils
      </a>

      <ul className="site-nav__links">
        <li>
          <a href="#home" aria-current={page === "home" ? "page" : undefined}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" aria-current={page === "about" ? "page" : undefined}>
            About
          </a>
        </li>
      </ul>

      <label className="theme-toggle">
        <input
          aria-label="Enable dark mode"
          checked={darkMode}
          onChange={onDarkModeChange}
          type="checkbox"
        />
        <span className="theme-toggle__track" aria-hidden="true" />
        <span className="theme-toggle__label">Enable Dark Mode</span>
      </label>
    </nav>
  );
}

export default Navbar;
