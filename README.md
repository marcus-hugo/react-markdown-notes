# React Markdown Notes - Frontend Mentor Challenge

## Made with:

- React
- Markdown
- react-markdown(to sanitize html)
- nanoid
- use-local-storage
- focus-trap-react(for accessible modal)

## UI/UX Features

- Show/hide notes sidebar when clicking the hamburger menu button.
- Currently clicked note will move to the top of the list of notes in the sidebar and populates the editor/preview and title.
- New Document button creates a new note in local storage. You can edit the title and begin typing in the markdown editor(textarea).
- Save Changes button will update any changes to the title or markdown editor and update local storage.
- When clicking the trash icon a modal will pop up asking you to confirm deleting the current note. You may exit by clicking a close button. When clicking the Confirm & Delete button will remove the note permenantly from the sidebar and local storage.
- Preview Mode will hide the the editor and only show the previewed note.
- On mobile, only the editor or the preview is shown when clicking the show/hide button.

## Goals & Challenges

- Make it as close to the Figma design
- Convert Markdown to HTML in real time
- Sanitize HTML
- CRUD operations
- Save to local storage
- Organize CSS with Sass
- Make components accessible

## Solutions & Problems Solved

- How to convert HTML to Markdown in real time by using an HTML `textarea` and set it's inital `value={markdown}`. With the `onChange` property, React will update the value with what is being typed in the `textarea`.

  ```js
  <textarea aria-label="type markdown here" placeholder={placeholder} value={markdown} onChange={e => setMarkdown(e.target.value)} id="markdown" cols="35" rows="30"></textarea>
  ```

- I Found react-markdown to sanitize the HTML. [https://github.com/remarkjs/react-markdown]. I simply added a ReactMarkdown component and set the children attribute to equal what is typed into the HTML textarea.

  ```js
  <ReactMarkdown className="preview" children={markdown} />
  ```

- How to set the notes state with local storage on inital load. If notes does not exist in local storage, then set notes in local storage to an array with the first object being pulled from a data file.

  ```js
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [{ id: nanoid(), createdAt: new Date().toLocaleDateString(), title: data[0].title, content: data[0].content }])
  ```

  Everytime a note is added, saved, or deleted a useEffect will update local storage.

  ```js
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])
  ```

- How to set the current date for each note. This will pull the local time from the users browser.

  ```js
  new Date().toLocaleDateString()
  ```

- To make the modal accessible and keep the user from tabbing out and keeping an intuitive tab order I implimented an npm package focus-trap-react. It was a straightforward process of wrapping the modal in a FocusTrap component.

  ```js
  <FocusTrap>
    <div className="modal-backdrop">
      <div id="alertdialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog_label" aria-describedby="dialog_desc" tabIndex="-1" className="modal__content">
        <div className="modal__inner-container">
          <h3 id="dialog_label" className="modal__title">
            Delete this document?
          </h3>
          <button autoFocus aria-label="close" id="closeBtn" className="modal__button-escape" onClick={handleShowModal}>
            X
          </button>
        </div>

        <p id="dialog_desc" className="modal__text">
          Are you sure you want to delete "{title}" document and its contents? This action cannot be reversed.
        </p>
        <button id="notes_confirm" type="button" onClick={deleteCurrentNote} className="modal__button-save">
          Confirm & Delete
        </button>
      </div>
    </div>
  </FocusTrap>
  ```

## References:

- For textarea [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea]

- For using media queries with react:
  [https://fireship.io/snippets/use-media-query-hook/]

- For a react theme switcher
  [https://css-tricks.com/easy-dark-mode-and-multiple-color-themes-in-react/]

## Accessiblity

- Accessibile Modal
  [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal]
