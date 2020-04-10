document.addEventListener("DOMContentLoaded", init)

function init(){
  console.log("INIT FN: Tea. Earl Grey. Hot.")
  fetchCards()
}

function fetchCards() {
  console.log("FETCHCARDS FN: Make it so.")
  const backendURL = 'localhost:3000'

  fetch(`http://${backendURL}/cards`)
    .then(response => response.json())
    .then(cardsJSON => cardsJSON.forEach(card => makeCards(card)))
}

function makeCards(card) {

  const mainDiv = document.querySelector('.main')

  const newCardDiv = document.createElement('div')
  newCardDiv.setAttribute('class', 'card text-center card-display-ib')

  newCardDiv.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${card.title}</h5>
      <img id="card-image" src="${card.image}"><br />
      <p class="card-text">${card.description}</p>
      <a href="#" class="btn btn-info"><i class="far fa-check-circle fa-1x"></i></a>
      <a href="#" class="btn btn-primary"><i class="far fa-times-circle fa-1x"></i></a>
    </div>
    <div class="card-footer text-muted">
    <i class="fas fa-edit"></i> <i class="far fa-trash-alt "></i>
    </div>
  `

  mainDiv.appendChild(newCardDiv)

  console.log(newCardDiv)

}