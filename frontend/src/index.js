document.addEventListener("DOMContentLoaded", init)

function init(){
  console.log("INIT FN: Tea. Earl Grey. Hot.")
  fetchCategories()
  // fetchCards()
}

function fetchCategories() {
  console.log("FETCH CATEGORIES FN: Make it so.")
  const backendURL = 'localhost:3000'

  fetch(`http://${backendURL}/categories`)
    .then(response => response.json())
    .then(categoriesJSON => categoriesJSON.forEach(category => makeCategory(category)))
}

function makeCategory(category){
  console.log(`MAKE CATEGORIES FN: Captains log...made category ${category.title}`)

  const sideDiv = document.querySelector('#sidebar')
  const newCategoryBtn = document.createElement('button')
  newCategoryBtn.innerHTML = `
    ${category.title}
  `
  newCategoryBtn.setAttribute('class', 'btn btn-primary btn-block btn-lg')
  sideDiv.appendChild(newCategoryBtn)
}

function fetchCards() {
  console.log("FETCHCARDS FN: Make it so.")
  const backendURL = 'localhost:3000'

  fetch(`http://${backendURL}/cards`)
    .then(response => response.json())
    .then(cardsJSON => cardsJSON.forEach(card => makeCards(card)))
}

function makeCards(card) {
  console.log("MAKE CARDS FN: Captains log...")
  // Grab main div where cards will be created
  const mainDiv = document.querySelector('.main')
  // Create new div for each card, set class attributes for styling
  const newCardDiv = document.createElement('div')
  newCardDiv.setAttribute('class', 'card text-center card-display-ib')

  // Card inner HTML interpolated with card data
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
  // Add new div to main div
  mainDiv.appendChild(newCardDiv)
}