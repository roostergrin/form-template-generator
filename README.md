# Form Template Generator

## Instructions

Add this script to the head

```jsx
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/roostergrin/form-template-generator@0.0.6/form-template-generator.js"
></script>
```

Note you can replace `@0.0.X` with any release or set it to latest (not recommended) with `@master`

To generate a new form template:

- open your form in a browser
- open the console
- run `generateTemplate.run()`

The new template file will automatically download to your default location!

## Warnings

### selects

The template generator replaces `<select>` elements with `<input>` elements. It's likely your formatting will break.

You can override by putting a class on the containing div and using css along these lines:

```
.containingDiv input {
  max-width: 3rem;
  float: unset !important;
  padding: unset !important;
  margin: unset !important;
}
```
