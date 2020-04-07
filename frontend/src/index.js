document.addEventListener("DOMContentLoaded", init)

function init(){
  // console.log("Tea. Earl Grey. Hot.")

  const backendURL = 'localhost:3000'

  fetch(`http://${backendURL}/cards`)
    .then(response => response.json())
    .then(data => console.log(data))
}