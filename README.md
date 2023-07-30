# React Markdown Notes

## Made with:

- React
- Markdown
- react-markdown(to sanitize html)
- focus-trap-react(for accessible modal)

## Goals & Challenges

- Convert Markdown to HTML in real time
- Sanitize HTML
- CRUD operations
- Save to local storage
- Organize CSS with Sass
- Make components accessible

## UI/UX Features

- Show/hide notes sidebar when clicking the hamburger menu button.
- Currently clicked note will move to the top of the list of notes in the sidebar and populates the editor/preview and title.
- New Document button creates a new note in local storage. You can edit the title and begin typing in the markdown editor(textarea).
- Save Changes button will update any changes to the title or markdown editor and update local storage.
- When clicking the trash icon a modal will pop up asking you to confirm deleting the current note. You may exit by clicking a close button. When clicking the Confirm & Delete button will remove the note permenantly from the sidebar and local storage.
- Preview Mode will hide the the editor and only show the previewed note.
- On mobile, only the editor or the preview is shown when clicking the show/hide button.

## Solutions & Problems Solved

- `useEffect` will update local storage when notes state changes.

- Found react-markdown to sanitize the HTML output. [https://github.com/remarkjs/react-markdown]

- For setting the current date for each note:

```js
new Date().toLocaleDateString()
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
