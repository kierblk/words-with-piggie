document.addEventListener("DOMContentLoaded", init)

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

    newCategoryLink.addEventListener('click', Category.handleCategoryClick)
  }

  static handleCategoryClick(event) {
    console.log(`You clicked category: ${event.target.innerText}`)
  }

  static handleCreateCategoryClick(event) {
    const newTitle = document.querySelector('#new-category-title')
    const newDescription = document.querySelector('#new-category-description')
    const newCategoryForm = document.querySelector('#new-category-form')
    let newCategory = new Category(newTitle.value, newDescription.value)

    fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newCategory)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success! Created New Category:', data.title)
      Category.makeCategory(data)
    })
    .catch((error) => {
      console.error('Error creating New Category:', error)
    })
    newCategoryForm.reset()
  }
}

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

  static handleCardClick(event) {
    console.log(`You have clicked Card ${event.target.dataset.card_id}`)

    fetch(`http://localhost:3000/cards/${event.target.dataset.card_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Success! Grabbed card:', data.title)
        Card.showCard(data)
      })
      .catch((error) => {
        console.error('Error', error)
      })
  }

  static showCard(data) {
    const cardModalDiv = document.querySelector('#cardModalCenter')
    const cardModalTitle = document.querySelector('#cardModalCenterTitle')
    const cardModalBodyDiv = document.querySelector('#card-modal-body')
    const cardImgDiv = document.querySelector('#card-image-div')
    const cardImgSrc = document.querySelector('#card-image')
    const cardDescription = document.querySelector('#card-description')

    cardModalTitle.innerText = data.title
    cardImgSrc.setAttribute('src', data.image)
    cardDescription.innerText = data.description
  }

  static handleCreateCardClick(event) {
    const newTitle = document.querySelector('#new-card-title')
    const newDescription = document.querySelector('#new-card-description')
    const newCardForm = document.querySelector('#new-card-form')
    const newImage = document.querySelector('#new-card-image')
    const newCardCategory = document.querySelector('#new-card-category-selections')
    let newCard = new Card(newTitle.value, newDescription.value, newImage.value, newCardCategory.value)
    console.log(newCard)

    fetch('http://localhost:3000/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newCard)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success! Created New Card:', data.title)
      Card.makeCards(data)
    })
    .catch((error) => {
      console.error('Error creating New Card:', error)
    })

    newCardForm.reset()
  }
}


function init(){
  // Variable declarations
  let startWrapper
  const mainDiv = document.querySelector('.main')
  const restartLink = document.querySelector('#restart')
  restartLink.addEventListener('click', resetGame)

  const createCategoryButton = document.querySelector('#create-category-button')
  createCategoryButton.addEventListener('click', Category.handleCreateCategoryClick )

  const createCardButton = document.querySelector('#create-card-button')
  createCardButton.addEventListener('click', Card.handleCreateCardClick )

  const newCardLink = document.querySelector('#new-card')
  newCardLink.addEventListener('click', () => {
    startWrapper = document.querySelector('#start-wrapper')
    if (!startWrapper.classList.contains('d-none')) {
      hideStart()
    }

    fetch(`http://localhost:3000/categories`)
    .then(response => response.json())
    .then(categoriesJSON => categoriesJSON.forEach(category => {
      const optionTag = document.createElement('option')
      const categoriesSelection = document.querySelector('#new-card-category-selections')
      categoriesSelection.setAttribute('class', 'form-control form-control-lg')
      optionTag.innerText = category.title
      optionTag.setAttribute('value', category.id)
      categoriesSelection.appendChild(optionTag)
    }))
  })

  Category.fetchAllCategories()
  start(mainDiv)

  // Start / Hide Start / Reset Game functions
  
  function start(mainDiv) {
    startWrapper = document.querySelector('#start-wrapper')
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

  function hideStart(){
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
}





