document.addEventListener("keydown", function (e) {
  const element = document.querySelectorAll('div[aria-label="Message"]')[0].innerText
  console.log(element + e.key)

  if (!document.getElementById("nvcify")) {
    const inputElement = document.querySelectorAll('div[aria-label="Message"]')[0]
    const button = document.createElement("button")
    button.id = "nvcify"
    button.addEventListener("click", function () {
      nvcify(element)
    })
    button.textContent = "NVC-ify"
    inputElement.parentNode.appendChild(button)
  }
})

function nvcify(text) {
  fetch(`https://nvc-api.herokuapp.com/translate?text=${text}`)
    .then((response) => response.json())
    .then((data) => {
      // clearInputField(document.querySelectorAll('div[aria-label="Message"]')[0])
      setText(document.querySelectorAll('div[aria-label="Message"]')[0], data[0].translation)
      console.log(data[0].translation)
    })
    .catch((error) => console.error(error))
}

var setText = function (el, text) {
  navigator.clipboard.writeText(text)
  el.focus()
  document.execCommand("paste")
}

function clearInputField(el) {
  el.focus()
  document.execCommand("selectAll")
  document.execCommand("delete")
}
