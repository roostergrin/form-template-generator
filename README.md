# Form Template Generator

# Instructions

Add this script to the head

```jsx
<script type="text/javascript" src="[https://cdn.jsdelivr.net/gh/roostergrin/form-template-generator@master/form-template-generator.js](https://cdn.jsdelivr.net/gh/roostergrin/form-template-generator@master/form-template-generator.js)"></script>
```

OR

Append with Javascript

```jsx
const script = document.createElement("script")
script.src = "https://cdn.jsdelivr.net/gh/roostergrin/form-template-generator@master/form-template-generator.js"
script.async = false
document.head.appendChild(script)
eval(script)
```

To generate a new form template, write in the console `generateTemplate()`
