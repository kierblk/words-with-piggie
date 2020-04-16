document.addEventListener("DOMContentLoaded", init)

function init(){
  // Variable declarations
  const mainDiv = document.querySelector('.main')
  const getStartedBtn = document.querySelector('#get-started-btn')
  getStartedBtn.addEventListener('click', resetGame)

  // Setting up classes

class Card {
  constructor(title, description, image, category_id){
    this.title = title
    this.description = description
    this.image = image
    this.category_id = category_id
  }

  static fetchAllCards() {
    const backendURL = 'localhost:3000'
    fetch(`http://${backendURL}/cards`)
      .then(response => response.json())
      .then(cardsJSON => cardsJSON.forEach(card => Card.makeCards(card)))
  }

  static makeCards(card) {
    const mainCardWrapperDiv = document.querySelector('#main-card-wrapper')

    const newCardDiv = document.createElement('div')
    newCardDiv.setAttribute('class', 'card text-center d-inline-block card-style')
    mainCardWrapperDiv.appendChild(newCardDiv)

    const newImg = document.createElement('img')
    newImg.setAttribute('data-id', `${card.id}`)
    newImg.setAttribute('class', 'card-img-top object-fit-img')
    newImg.setAttribute('src', `${card.image}`)
    newCardDiv.appendChild(newImg)

    const newCardBodyDiv = document.createElement('div')
    newCardBodyDiv.setAttribute('class', 'card-body')
    newCardDiv.appendChild(newCardBodyDiv)

    const cardModalButton = document.createElement('button')
    cardModalButton.setAttribute('type', 'button')
    cardModalButton.setAttribute('class', 'btn btn-primary')
    cardModalButton.setAttribute('data-toggle', 'modal')
    cardModalButton.setAttribute('data-target', '#cardModalCenter')
    cardModalButton.setAttribute('data-card_id', `${card.id}`)
    cardModalButton.innerText = card.title
    newCardBodyDiv.appendChild(cardModalButton)
    newCardDiv.addEventListener('click', Card.handleCardClick)
  }

  // Show Card / Modal Functions
  showCard(mainDiv) {
    const images = Array.from(mainDiv)
    const modal = document.querySelector('.modal')
  }

  static handleCardClick(event) {
    console.log(event.target.dataset.card_id)
  }
}

class Category {
  constructor(title, description){
    this.title = title
    this.description = description
  }

  static fetchAllCategories() {
    const backendURL = 'localhost:3000'
    fetch(`http://${backendURL}/categories`)
      .then(response => response.json())
      .then(categoriesJSON => categoriesJSON.forEach(category => Category.makeCategory(category)))
  }

  static makeCategory(category){
    const categoryDropdownMenuDiv = document.querySelector('.dropdown-menu')

    const newCategoryLink = document.createElement('a')
    newCategoryLink.setAttribute('class', 'dropdown-item')
    newCategoryLink.setAttribute('href', '#')
    newCategoryLink.innerText = `${category.title}`
    categoryDropdownMenuDiv.appendChild(newCategoryLink)
  }
}

// Do some stuff

  Category.fetchAllCategories()
  start(mainDiv)

  // Start / Hide Start / Reset Game functions
  
  function start(mainDiv) {
    const startWrapperDiv = document.createElement('div')
    startWrapperDiv.setAttribute('id', 'start-wrapper')
    startWrapperDiv.setAttribute('class', '')
    mainDiv.appendChild(startWrapperDiv)

    const h1HeaderText = document.createElement('h1')
    h1HeaderText.setAttribute('id', 'header-text')
    h1HeaderText.setAttribute('class', 'header-text')
    h1HeaderText.innerText = 'Welcome'
    startWrapperDiv.appendChild(h1HeaderText)

    const p1 = document.createElement('p')
    p1.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nam aperiam repudiandae assumenda dolor fugit, cumque doloremque modi, maiores dignissimos necessitatibus excepturi eveniet provident ea suscipit! Quod at distinctio ipsam.'
    startWrapperDiv.appendChild(p1)

    const p2 = document.createElement('p')
    p2.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nam aperiam repudiandae assumenda dolor fugit, cumque doloremque modi, maiores dignissimos necessitatibus excepturi eveniet provident ea suscipit! Quod at distinctio ipsam.'
    startWrapperDiv.appendChild(p2)

    const startBtn = document.createElement('button')
    startBtn.setAttribute('id', 'start-button')
    startBtn.setAttribute('class', 'start btn btn-lg btn-success brand-text')
    startBtn.innerText = 'Start'
    startWrapperDiv.appendChild(startBtn)
    startBtn.addEventListener('click', hideStart)
  }

  function hideStart(event){
    const startWrapper = document.querySelector('#start-wrapper')
    startWrapper.classList.add('d-none')
    Card.fetchAllCards()
  }

  function resetGame() {
    const startWrapper = document.querySelector('#start-wrapper')
    startWrapper.classList.remove('d-none')
    const mainCardWrapperDiv = document.querySelector('#main-card-wrapper')
    while(mainCardWrapperDiv.firstChild) { 
      mainCardWrapperDiv.removeChild(mainCardWrapperDiv.firstChild); 
    } 
  }

  // Event Listeners


}





