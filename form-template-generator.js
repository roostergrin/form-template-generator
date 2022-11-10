// module pattern to avoid polluting the global namespace
// to use the script, use generateTemplate.run()
let generateTemplate = (function () {
  function run() {
    removeFormAction()
    setTemplateInputs()
    appendCheckboxAndRadioScripts()
    replaceSelects()
    setTemplateSignatures()
    hideSubmit()
    timestamp()
    generateFile()
  }

  function generateFile() {
    let url = window.location.pathname
    let origFilename = url.substring(url.lastIndexOf('/') + 1)
    let newFilename =
      origFilename.split('.').slice(0, -1).join('.') + '-Template.html'
    let a = document.createElement('a')
    a.href = window.URL.createObjectURL(
      new Blob([document.documentElement.outerHTML], {
        type: 'text/plain',
      }),
    )
    a.download = newFilename
    a.click()
  }

  function removeFormAction() {
    document.getElementsByTagName('form')[0].action = ''
  }

  function setTemplateInputs(input) {
    let inputs = [...document.getElementsByTagName('input')]
    inputs.forEach((input, i) => {
      switch (input.type) {
        case 'text':
          input.setAttribute('value', '{{' + input.name + '}}')
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

  function appendCheckboxAndRadioScripts() {
    let script1 = document.createElement('script')
    script1.type = 'text/javascript'
    script1.src =
      'https://d3nojzhs96djbd.cloudfront.net/static/js/jquery_1.11.0.min.js'
    document.body.appendChild(script1)
    let script2 = document.createElement('script')
    script1.type = 'text/javascript'
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

  function replaceSelects() {
    let selects = [...document.getElementsByTagName('select')]
    selects.forEach((select) => {
      // make a new input / text element
      // id and value from select
      // stick it in the dom before select
      // delete select
      const input = document.createElement('input')
      input.type = 'text'
      input.setAttribute('id', '{{' + select.id + '}}')
      input.setAttribute('value', '{{' + select.name + '}}')
      parent = select.parentNode
      parent.insertBefore(input, select)
      select.remove()
    })
  }

  function setTemplateSignatures() {
    let signatures = [...document.getElementsByClassName('signature')]
    signatures.forEach((signature) => {
      let inputs = [...signature.getElementsByTagName('input')]
      let input = inputs.filter((input) => input.value == '')[0]
      signature.outerHTML = '{{' + input.name + '}}'
    })
  }

  function hideSubmit() {
    document.querySelectorAll('input[type=submit]')[0].style.display = 'none'
  }

  function timestamp() {
    let date = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    })
    let script = document.createElement('script')
    script.innerHTML = '// this template was generated on: ' + date + ' PT'
    document.head.appendChild(script)
  }

  return {
    run,
  }
})()
