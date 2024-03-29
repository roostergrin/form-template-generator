// module pattern to avoid polluting the global namespace
// to use the script, use generateTemplate.run()
let generateTemplate = (function () {
  function run() {
    removeFormAction()
    handleInputs()
    handleTextareas()
    handleSelects()
    handleSignatures()
    appendCheckboxAndRadioScripts()
    hideSubmit()
    addTimestamp()
    generateFile()
  }

  function runpdf() {
    removeFormAction()
    handleInputs()
    handleTextareas()
    handleSelects()
    handleSignatures()
    appendCheckboxAndRadioScripts()
    hideSubmit()
    updateStyles()
    addTimestamp()
    generateFile()
  }

  function removeFormAction() {
    document.getElementsByTagName('form')[0].action = ''
  }

  function handleInputs(input) {
    let inputs = [...document.getElementsByTagName('input')]
    inputs.forEach((input, i) => {
      switch (input.type) {
        case 'text':
          input.setAttribute('value', '{{' + input.name + '}}')
          break
        case 'email':
          input.setAttribute('value', '{{' + input.name + '}}')
          break
        case 'number':
          thingReplacer(input)
          break
        case 'date':
          thingReplacer(input)
          break
        case 'checkbox':
          input.setAttribute('x-sel', '{{' + input.name + '}}')
          break
        case 'radio':
          input.setAttribute('x-sel', '{{' + input.name + '}}')
          break
      }
    })
  }

  function handleTextareas() {
    let textareas = [...document.getElementsByTagName('textarea')]
    textareas.forEach((textarea) => {
      textarea.innerHTML = '{{' + textarea.name + '}}'
    })
  }

  function handleSelects() {
    let selects = [...document.getElementsByTagName('select')]
    selects.forEach((select) => {
      thingReplacer(select)
    })
  }

  function thingReplacer(thing) {
    // make a new input / text element
    // get value from thing
    // stick it in the dom before thing
    // delete thing
    const input = document.createElement('input')
    input.type = 'text'
    input.setAttribute('value', '{{' + thing.name + '}}')
    parent = thing.parentNode
    parent.insertBefore(input, thing)
    thing.remove()
  }

  function handleSignatures() {
    let signatures = [...document.getElementsByClassName('signature')]
    signatures.forEach((signature) => {
      let inputs = [...signature.getElementsByTagName('input')]
      let input = inputs.filter((input) => input.value == '')[0]
      signature.outerHTML = '{{' + input.name + '}}'
    })
  }

  function appendCheckboxAndRadioScripts() {
    let script1 = document.createElement('script')
    script1.type = 'text/javascript'
    script1.src =
      'https://d3nojzhs96djbd.cloudfront.net/static/js/jquery_1.11.0.min.js'
    document.body.appendChild(script1)
    let script2 = document.createElement('script')
    script2.type = 'text/javascript'
    script2.innerHTML = `
    $(document).ready(function(){
      var RB = $("input[x-sel]");
      for (var i=0; i < RB.length; i++) {
        var R = $(RB[i]);
        R.prop( "checked", R.attr("x-sel") == R.attr("value") ? true : false );
      }
    });`
    document.body.appendChild(script2)
  }

  function hideSubmit() {
    document.querySelectorAll('input[type=submit]')[0].style.display =
      'none'
  }

  function updateStyles() {
    // to get luxsci to convert to pdf
    // - remove all media queries
    // - remove .container and .page styling
    // - add webkit for flex

    // create a new style element called updatedStyles
    // add all the rules you want to keep (and add webkit to any rules with flex)
    // delete all style tags
    // append updatedStyles

    let updatedStyles = document.createElement('style')
    updatedStyles.innerHTML = ''

    let sheets = document.styleSheets

    // walk through css sheets
    for (i = 0; i < sheets.length; i++) {
      // get all rules
      rules = sheets[i].cssRules

      // walk through rules
      for (j = rules.length - 1; j > -1; j--) {
        if (
          !(rules[j] instanceof CSSMediaRule) &&
          rules[j].selectorText !== '.container' &&
          rules[j].selectorText !== '.page'
        ) {
          updatedStyles.innerHTML += rules[j].cssText
          if (rules[j].cssText.includes('display: flex')) {
            updatedStyles.innerHTML = updatedStyles.innerHTML.slice(0, -1) // remove trailing '}'
            updatedStyles.innerHTML += 'display: -webkit-box;}' // luxsci needs this to do flex
          }
        }
      }
    }

    let styles = document.getElementsByTagName('style')
    while (styles[0]) {
      styles[0].remove()
    }

    document.head.appendChild(updatedStyles)
  }

  function addTimestamp() {
    let date = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles'
    })
    let script = document.createElement('script')
    script.innerHTML =
      '// this template was generated on: ' + date + ' PT'
    document.head.appendChild(script)
  }

  function generateFile() {
    let url = window.location.pathname
    let origFilename = url.substring(url.lastIndexOf('/') + 1)
    let newFilename =
      origFilename.split('.').slice(0, -1).join('.') + '-template.html'
    let a = document.createElement('a')
    a.href = window.URL.createObjectURL(
      new Blob([document.documentElement.outerHTML], {
        type: 'text/plain'
      })
    )
    a.download = newFilename
    a.click()
  }

  return {
    run,
    runpdf
  }
})()
