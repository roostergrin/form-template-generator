# Form Template Generator

## Instructions

Add this script to the head

```jsx
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/roostergrin/form-template-generator@0.0.3/form-template-generator.js"
></script>
```

Note you can replace `@0.0.X` with any release or set it to latest (not recommended) with `@master`

To generate a new form template:

- open your form in a browser
- open the console
- run `generateTemplate()`

The new template file will automatically download to your default location!

## Warnings

The template generator doesn't yet handle `<select>` elements. If you have them, you have to update the generated template by hand:

- remove `<select class="form-control" name="X" id="X" value="X">` and all of its internal `<option>` elements
- replace with `<input type="text" name="X" id="X" value="{{X}}" />`