# Form Template Generator

## Instructions

Add this script to the head

```jsx
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/roostergrin/form-template-generator@0.0.1/form-template-generator.js"
></script>
```

OR

Append with Javascript

```jsx
const script = document.createElement("script")
script.src =
  "https://cdn.jsdelivr.net/gh/roostergrin/form-template-generator@0.0.1/form-template-generator.js"
script.async = false
document.head.appendChild(script)
eval(script)
```

Note you can replace `@0.0.1` with any release or set it to latest (not recommended) with `@master`

To generate a new form template, run in the console `generateTemplate()`

The new template file will automatically download to your default location!
