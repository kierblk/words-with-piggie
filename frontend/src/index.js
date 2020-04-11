document.addEventListener("DOMContentLoaded", init)

function init(){
  console.log("INIT FN: Tea. Earl Grey. Hot.")
  fetchCategories()
  fetchCards()
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
  let categoryDropdownMenuDiv = document.querySelector('.dropdown-menu')
  const newCategoryBtn = `
    <a class="dropdown-item" href="#">
    ${category.title}
    </a>
  `
  categoryDropdownMenuDiv.innerHTML += newCategoryBtn
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
  newCardDiv.setAttribute('class', 'card text-center d-inline-block card-style')

  // Card inner HTML template interpolated with card data
  newCardDiv.innerHTML = `
    <img class="card-img-top object-fit-img" src="${card.image}">
    <div class="card-body">
      <h5 class="card-title">${card.title}</h5>
    </div>
  `
  // Add new div to main div
  mainDiv.appendChild(newCardDiv)
}

