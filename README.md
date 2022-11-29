# Form Template Generator

## Using the script

1. Add this script to the head

   ```html
   <script
     type="text/javascript"
     src="https://cdn.jsdelivr.net/gh/roostergrin/form-template-generator@0.0.7/form-template-generator.js"
   ></script>
   ```

   > Note you can replace `@0.0.X` with any release or set it to latest (not recommended) with `@master`

1. open your form in a browser
1. open the console
1. run `generateTemplate.run()`

The new template file will automatically download to your default location.

## Don't use IDs in your form

For radios, use `name` (same for all in a group) and `value` (unique to each choice).

```html
<input type="radio" name="1" value="1-1" />
<label>Yes</label>
<input type="radio" name="1" value="1-2" />
<label>No</label>
```

For checkboxes, use `name` and put `value="x"` (value can be anything, but luxsci needs there to be something).

```html
<input type="checkbox" name="2" value="x" /> <label>rooster</label>
```

For all other inputs, just use `name`.

```html
<div class="row">
 <label>Patient Name:</label>
 <input type="text" name="11" />
</div>

<div class="row">
  <label>Choose a pet:</label>
  <select name="6">
    <option value="">--Please choose an option--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
  </select>
</div>

<div class="row">
  <label>Number of tentacles:</label>
  <input type="number" name="7" />
</div>

<div class="row">
  <label>Tell us your story:</label>
  <textarea name="8" rows="5" cols="33">
    It was a dark and stormy night...
  </textarea>
</div>

<div class="row">
  <label>Start date:</label>
  <input type="date" name="9" />
</div>

<div class="row">
  <label>Choose a profile picture:</label>
  <input type="file" name="10" accept="image/jpeg" />
</div>
```

## Replacements

The template generator replaces these with `input type=text`:

- number
- date
- selects

Especially for `<select>` elements, it's likely your formatting will break.

You can override by putting a class on the containing div and using css along these lines:

```css
.containingDiv input {
  max-width: 3rem;
  float: unset !important;
  padding: unset !important;
  margin: unset !important;
}
```

## File

For `type=file`, the file will show up in the luxsci email. No need to do anything in the template unless you want to get fancy.

This one has `type=file`: https://formsroostergrin.com/impressionsorthodontics/Virtual-page/index.html

## Testing form

Testing form for updates to the template generator: https://formsroostergrin.com/form-template-generator/form.html

Luxsci config for the testing form is called "Form Template Generator".
