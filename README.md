# React Markdown Notes App

## Made with:

- React
- Markdown
- react-markdown(to sanitize html)

## Goals & Challenges

- Be able to convert Markdown to HTML
- Real time conversion
- Sanitize HTML
- CRUD operations
- Save to local storage

## Solutions & Problems Solved

`useEffect` will run once on load, which is perfect for the textarea placeholder value.

Set markdown `useState` initial value to an empty string, so that when you begin typing in the textarea, the placeholder is cleared.

Found react-markdown to sanitize the HTML output. [https://github.com/remarkjs/react-markdown]

For textarea [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea]

```js
new Date().toLocaleDateString()
```
