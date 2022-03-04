function generateTemplate() {
  removeFormAction()
  setTemplateInputs()
  setTemplateSignatures()
  hideSubmit()
  timestamp()
  generateFile()
}

function generateFile() {
  let url = window.location.pathname
  let origFilename = url.substring(url.lastIndexOf("/") + 1)
  let newFilename =
    origFilename.split(".").slice(0, -1).join(".") + "-Template.html"
  let a = document.createElement("a")
  a.href = window.URL.createObjectURL(
    new Blob([document.documentElement.outerHTML], { type: "text/plain" })
  )
  a.download = newFilename
  a.click()
}

function removeFormAction() {
  document.getElementsByTagName("form")[0].action = ""
}

function setTemplateInputs(input) {
  let inputs = [...document.getElementsByTagName("input")]
  inputs.forEach((input, i) => {
    switch (input.type) {
      case "text":
        input.setAttribute("placeholder", "{{" + input.name + "}}")
        break
      case "checkbox":
        input.dataset.checked = "{{" + input.name + "}}"
        break
      case "radio":
        input.dataset.checked = "{{" + input.name + "}}"
        break
    }
  })
}

function setTemplateSignatures() {
  let signatures = [...document.getElementsByClassName("signature")]
  signatures.forEach((signature, i) => {
    let sid = ""
    if (signature.getElementsByClassName("sform_sig") != null) {
      sid = signature.getElementsByClassName("sform_sig")[0].field_name
    }
    signature.outerHTML = "{{" + sid + "}}"
  })
}

function hideSubmit() {
  document.querySelectorAll("input[type=submit]")[0].style.display =
    "none"
}

function timestamp() {
  let date = new Date(Date.now()).toUTCString()
  let script = document.createElement("script")
  script.innerHTML = "// this template was generated on: " + date
  document.head.appendChild(script)
}
