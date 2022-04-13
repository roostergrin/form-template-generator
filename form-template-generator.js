// module pattern to avoid polluting the global namespace
// to use the script, use generateIDs.run()
let generateTemplate = (function () {
  function run() {
    removeFormAction()
    setTemplateInputs()
    appendCheckboxAndRadioScripts()
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
          input.setAttribute('placeholder', '{{' + input.name + '}}')
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

  function setTemplateSignatures() {
    let signatures = [...document.getElementsByClassName('signature')]
    signatures.forEach(signature => {
      let inputs = [...signature.getElementsByTagName('input')]
      let input = inputs.filter(input => input.value == '')[0]
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
