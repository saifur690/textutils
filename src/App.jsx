import { useEffect, useRef, useState } from "react";
import "./App.css";
import About from "./About";
import Navbar from "./navbar";

const DARK_MODE_STORAGE_KEY = "textutils-dark-mode";

function App() {
  const [page, setPage] = useState(() =>
    window.location.hash === "#about" ? "about" : "home",
  );
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = window.localStorage.getItem(DARK_MODE_STORAGE_KEY);
    return savedPreference === null ? true : savedPreference === "true";
  });
  const [text, setText] = useState("");
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    window.localStorage.setItem(DARK_MODE_STORAGE_KEY, String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    function updatePage() {
      setPage(window.location.hash === "#about" ? "about" : "home");
    }

    window.addEventListener("hashchange", updatePage);
    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current);
    },
    [],
  );

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readingMinutes = (wordCount / 125).toFixed(3);

  function showToast(message, type = "success") {
    window.clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = window.setTimeout(() => {
      setToast(null);
      toastTimer.current = null;
    }, 3000);
  }

  function transformText(transform, successMessage) {
    if (!text.trim()) {
      showToast("Please enter some text first!", "error");
      return;
    }

    setText(transform(text));
    showToast(successMessage);
  }

  async function copyText() {
    if (!text.trim()) {
      showToast("Please enter some text first!", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast("Text copied!");
    } catch {
      showToast("Could not copy text. Check clipboard permissions and try again.", "error");
    }
  }

  function removeExtraSpaces() {
    transformText(
      (currentText) => currentText
        .replace(/[^\S\r\n]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim(),
      "Extra spaces removed!",
    );
  }

  function toggleDarkMode() {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);
    showToast(nextDarkMode ? "Dark mode enabled!" : "Light mode enabled!");
  }

  return (
    <div className={`app-shell${darkMode ? " app-shell--dark" : ""}`}>
      {toast && (
        <div
          className={`app-toast app-toast--${toast.type}`}
          role="alert"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      )}
      <Navbar
        darkMode={darkMode}
        onDarkModeChange={toggleDarkMode}
        page={page}
      />
      <main className="app-main" id={page === "about" ? "about" : "home"}>
        {page === "about" ? (
          <About darkMode={darkMode} onDarkModeChange={toggleDarkMode} />
        ) : (
        <section className="text-tool" aria-labelledby="editor-title">
          <h1 id="editor-title">Enter the text to analyze below</h1>
          <textarea
            aria-label="Text to analyze"
            className="text-tool__input"
            onChange={(event) => {
              setText(event.target.value);
            }}
            placeholder="Type or paste your text here..."
            value={text}
          />

          <div className="text-tool__actions">
            <button
              onClick={() =>
                transformText(
                  (currentText) => currentText.toUpperCase(),
                  "Text converted to uppercase!",
                )
              }
              type="button"
            >
              Convert to Uppercase
            </button>
            <button
              onClick={() =>
                transformText(
                  (currentText) => currentText.toLowerCase(),
                  "Text converted to lowercase!",
                )
              }
              type="button"
            >
              Convert to Lowercase
            </button>
            <button
              onClick={() => transformText(() => "", "Text cleared!")}
              type="button"
            >
              Clear Text
            </button>
            <button onClick={copyText} type="button">
              Copy Text
            </button>
            <button onClick={removeExtraSpaces} type="button">
              Remove Extra Spaces
            </button>
          </div>

          <section className="text-summary" aria-labelledby="summary-title">
            <h2 id="summary-title">Your text summary</h2>
            <p>
              {wordCount} {wordCount === 1 ? "word" : "words"} and {text.length}{" "}
              {text.length === 1 ? "character" : "characters"}
            </p>
            <p>{readingMinutes} minutes read</p>
          </section>

          <section className="text-preview" aria-labelledby="preview-title">
            <h2 id="preview-title">Preview</h2>
            <p>{text || "Your text preview will appear here."}</p>
          </section>
        </section>
        )}
      </main>
    </div>
  );
}

export default App;
