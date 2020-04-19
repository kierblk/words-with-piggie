document.addEventListener("DOMContentLoaded", init)

BASE_URL = 'http://localhost:3000'

class Category {
  constructor(title, description){
    this.title = title
    this.description = description
  }

  static fetchAllCategories() {
    // A GET fetch request is made to grab all categories from the backend 
    // Categories are passed to the makeCategory method to be inserted into the DOM
    fetch(`${BASE_URL}/categories`)
      .then(response => response.json())
      .then(categoriesJSON => categoriesJSON.data.forEach(category => Category.makeCategory(category.attributes)))
  }

  static makeCategory(category){
    // Inserts a category into the DOM
    const categoryDropdownMenuDiv = document.querySelector('.dropdown-menu')
    const newCategoryLink = document.createElement('a')
    newCategoryLink.setAttribute('class', 'dropdown-item')
    newCategoryLink.setAttribute('href', '#')
    newCategoryLink.innerText = `${category.title}`
    categoryDropdownMenuDiv.appendChild(newCategoryLink)

    // Adds event listener to show all cards by selected category
    newCategoryLink.addEventListener('click', Category.handleCategoryClick)
  }

  static handleCategoryClick(event) {
    //Place holder for sort by category
    console.log(`You clicked category: ${event.target.innerText}`)
  }

  static handleCreateCategoryClick(event) {
    // After clicking the create category button within the new category modal
    // a POST fetch request is made with the form contents.
    // The form is reset, and the new category is added to the DOM
    const newTitle = document.querySelector('#new-category-title')
    const newDescription = document.querySelector('#new-category-description')
    const newCategoryForm = document.querySelector('#new-category-form')
    let newCategory = new Category(newTitle.value, newDescription.value)

    fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newCategory)
    })
    .then((response) => response.json())
    .then((categoryJSON) => {
      console.log('Success! Created New Category:', categoryJSON.title)
      Category.makeCategory(categoryJSON)
    })
    .catch((error) => {
      console.error('Error creating New Category:', error)
    })
    newCategoryForm.reset()
  }

  static resetCategoryList() {
    // This method prevents duplicates being shown in the category selection dropdown
    // when a new card is created or is cancelled/closed during creation.
    const categoriesSelection = document.querySelector('#new-card-category-selections')
    while(categoriesSelection.firstChild) { 
      categoriesSelection.removeChild(categoriesSelection.firstChild); 
    } 
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
    // A GET getch request is made to grab all cards from the backend
    // cards are passed to the makeCArds method to be inserted into the DOM
    fetch(`${BASE_URL}/cards`)
      .then(response => response.json())
      .then(cardsJSON => cardsJSON.data.forEach(card => Card.makeCards(card.attributes)))
  }

  static makeCards(card) {
    // Inserts a category into the DOM
    const mainCardWrapperDiv = document.querySelector('#main-card-wrapper')

    const newCardDiv = document.createElement('div')
    newCardDiv.setAttribute('class', 'card text-center d-inline-block card-style')
    mainCardWrapperDiv.appendChild(newCardDiv)

    const newImg = document.createElement('img')
    newImg.setAttribute('data-id', `${card.id}`)
    newImg.setAttribute('data-category-name', `${card.category_name}`)
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

    // Adds event listener to show a single card
    cardModalButton.addEventListener('click', Card.handleCardClick)
  }

  static handleCardClick(event) {
    // After clicking the card modal button,
    // a GET fetch request is made for the specified card.
    // CArd information is passed to the show card method.
    fetch(`${BASE_URL}/cards/${event.target.dataset.card_id}`)
      .then((response) => response.json())
      .then((cardJSON) => {
        console.log('Success! Grabbed card:', cardJSON.data.attributes.title)
        Card.showCard(cardJSON.data)
      })
      .catch((error) => {
        console.error('Error', error)
      })
  }

  static showCard(card) {
    // Inserts the card information into the show card modal
    const cardModalDiv = document.querySelector('#cardModalCenter')
    const cardModalTitle = document.querySelector('#cardModalCenterTitle')
    const cardModalBodyDiv = document.querySelector('#card-modal-body')
    const cardImgDiv = document.querySelector('#card-image-div')
    const cardImgSrc = document.querySelector('#card-image')
    const cardDescription = document.querySelector('#card-description')

    cardModalTitle.innerText = `${card.attributes.category_name} - ${card.attributes.title}`
    cardImgSrc.setAttribute('src', card.attributes.image)
    cardDescription.innerText = card.attributes.description
  }

  static handleCreateCardClick(event) {
    // After clicking the create card button within the new card modal
    // a POST fetch request is made with the form contents.
    // The form is reset, and the new card is added to the DOM
    const newTitle = document.querySelector('#new-card-title')
    const newDescription = document.querySelector('#new-card-description')
    const newCardForm = document.querySelector('#new-card-form')
    const newImage = document.querySelector('#new-card-image')
    const newCardCategory = document.querySelector('#new-card-category-selections')
    let newCard = new Card(newTitle.value, newDescription.value, newImage.value, newCardCategory.value)
    console.log(newCard)
    console.log("First")

    fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newCard)
    })
    .then((response) => response.json())
    .then((cardJSON) => {
      console.log('Success! Created New Card:', cardJSON)
      Card.makeCards(cardJSON)
    })
    .catch((error) => {
      console.log("Second")
      console.error('Error creating New Card:', error)
    })
    newCardForm.reset()
  }
}


function init(){
  // startWrapper declared but not defined as it does not exist in the DOM at this point.
  let startWrapper
  const mainDiv = document.querySelector('.main')
  const restartLink = document.querySelector('#restart')
  // Event listener to "reset" the game
  restartLink.addEventListener('click', resetGame)

  const createCategoryButton = document.querySelector('#create-category-button')
  // Event listener to create a category
  createCategoryButton.addEventListener('click', Category.handleCreateCategoryClick )

  const createCardButton = document.querySelector('#create-card-button')
  // Event listener to create a card
  createCardButton.addEventListener('click', Card.handleCreateCardClick )

  const cancelNewCardButton = document.querySelector('#cancel-card')
  // Event listener to reset the category list if you cancel creating a new card
  cancelNewCardButton.addEventListener('click', Category.resetCategoryList)

  const closeNewCardButton = document.querySelector('#close-card')
  // Event listener to reset the category list if you cancel creating a new card
  closeNewCardButton.addEventListener('click', Category.resetCategoryList)

  const newCardLink = document.querySelector('#new-card')
  newCardLink.addEventListener('click', () => {
    // This function ensures that if a user creates a new card before click
    // the start button, that the start wrapper class is updated with 'd-none'
    // to hide the start message and ensure correct rendering of the new card 
    // within the DOM
    startWrapper = document.querySelector('#start-wrapper')    
    if (!startWrapper.classList.contains('d-none')) {
      hideStart()
    }

    // A GET fetch request for all categories to populate the categories dropdown
    // in the create new card modal.
    fetch(`${BASE_URL}/categories`)
    .then(response => response.json())
    .then(categoriesJSON => categoriesJSON.data.forEach(category => {
      const optionTag = document.createElement('option')
      const categoriesSelection = document.querySelector('#new-card-category-selections')
      categoriesSelection.setAttribute('class', 'form-control form-control-lg')
      optionTag.innerText = category.attributes.title
      optionTag.setAttribute('value', category.id)
      categoriesSelection.appendChild(optionTag)
    }))
  })

  // Loading all categories into the nav bar dropdown upon DOM content loaded
  Category.fetchAllCategories()
  start()
  
  function start() {
    // Displays the start button and the welcome message.
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
    // Event listener to hide the start button and welcome message
    // and trigger the all cards GET fetch
    startBtn.addEventListener('click', hideStart)
  }

  function hideStart(){
    // Hides the start button and welcome message using a bootstrap 
    // class 'd-none'
    startWrapper = document.querySelector('#start-wrapper')
    startWrapper.classList.add('d-none')
    Card.fetchAllCards()
  }

  function resetGame() {
    // resets the game to the beginning by removing all the child elements
    // (in this case all the cards currently displayed) and removing the
    // 'd-none' class from the wrapper div.
    const startWrapper = document.querySelector('#start-wrapper')
    startWrapper.classList.remove('d-none')
    const mainCardWrapperDiv = document.querySelector('#main-card-wrapper')
    while(mainCardWrapperDiv.firstChild) { 
      mainCardWrapperDiv.removeChild(mainCardWrapperDiv.firstChild); 
    } 
  }
}





