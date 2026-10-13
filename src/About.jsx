import { useState } from "react";

const aboutItems = [
  {
    title: "What is TextUtils?",
    body: (
      <>
        <strong>TextUtils is a simple text analysis tool.</strong> Use the home
        page to change letter case, remove extra spaces, copy text, and review
        word and character counts.
      </>
    ),
  },
  {
    title: "How does text analysis work?",
    body: (
      <>
        Your word count, character count, reading-time estimate, and preview
        update as you type. Text changes happen in your browser, so you can
        immediately see the result.
      </>
    ),
  },
  {
    title: "Is my text saved or uploaded?",
    body: (
      <>
        TextUtils does not send your text to a server. Your text stays in the
        current page and is cleared when you refresh or leave it.
      </>
    ),
  },
];

function About({ darkMode, onDarkModeChange }) {
  const [openItem, setOpenItem] = useState(0);

  return (
    <section className="about-page" aria-labelledby="about-title">
      <h1 id="about-title">About Us</h1>

      <div className="about-accordion">
        {aboutItems.map((item, index) => {
          const isOpen = openItem === index;
          const headingId = `about-heading-${index}`;
          const panelId = `about-panel-${index}`;

          return (
            <section className="about-accordion__item" key={item.title}>
              <h2 className="about-accordion__heading">
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className="about-accordion__trigger"
                  id={headingId}
                  onClick={() => setOpenItem(isOpen ? null : index)}
                  type="button"
                >
                  {item.title}
                  <span
                    aria-hidden="true"
                    className={`about-accordion__chevron${isOpen ? " is-open" : ""}`}
                  />
                </button>
              </h2>
              {isOpen && (
                <div
                  aria-labelledby={headingId}
                  className="about-accordion__body"
                  id={panelId}
                  role="region"
                >
                  {item.body}
                </div>
              )}
            </section>
          );
        })}
      </div>
      <button
        className="about-theme-button"
        onClick={onDarkModeChange}
        type="button"
      >
        {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
      </button>
    </section>
  );
}

export default About;
