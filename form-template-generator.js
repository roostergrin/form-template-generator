function generateTemplate () {
  setTemplateInputs()
  setTemplateSignatures()
  generateFile()
}

function generateFile() {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([document.documentElement.outerHTML], {type: "text/plain"}));
    // would love to dynamically set this.
    a.download = "form-template.html";
    a.click()
}

function setTemplateInputs(input) {
    var inputs = [...document.getElementsByTagName("input")]
    // break; doesn't work in a .forEach
    for (var i = 0; i < inputs.length; i++) {
      input = inputs[i]
      switch(input.type) {
        case 'text':
          input.setAttribute('placeholder', "{{" + input.name + "}}")
          break;
        case 'checkbox':
          input.dataset.checked = "{{" +input.name + "}}"
          break;
        case 'radio':
        input.dataset.checked = "{{" +input.name + "}}"
          break;
      }
    }
  }

  function setTemplateSignatures(){
    var signatures = [...document.getElementsByClassName("signature")]
    for (var i = 0; i < signatures.length; i++) {
      let signature = signatures[i]
      let sid = ''
      if(signature.getElementsByClassName("sform_sig") != null) {
        sid = signature.getElementsByClassName("sform_sig")[0].id
      }
      signature.outerHTML = "{{" + sid + "}}"
    }
  }