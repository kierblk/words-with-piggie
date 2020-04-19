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
    newCardDiv.setAttribute('data-card-id', `${card.id}` )
    mainCardWrapperDiv.appendChild(newCardDiv)

    const newImg = document.createElement('img')
    newImg.setAttribute('data-card-id', `${card.id}`)
    newImg.setAttribute('data-category-name', `${card.category_name}`)
    newImg.setAttribute('class', 'card-img-top object-fit-img')
    newImg.setAttribute('src', `${card.image}`)
    newCardDiv.appendChild(newImg)

    const newCardBodyDiv = document.createElement('div')
    newCardBodyDiv.setAttribute('class', 'card-body')
    newCardBodyDiv.setAttribute('data-card-id', `${card.id}`)
    newCardDiv.appendChild(newCardBodyDiv)

    const cardModalButton = document.createElement('button')
    cardModalButton.setAttribute('type', 'button')
    cardModalButton.setAttribute('class', 'btn btn-primary')
    cardModalButton.setAttribute('data-toggle', 'modal')
    cardModalButton.setAttribute('data-target', '#cardModalCenter')
    cardModalButton.setAttribute('data-card-id', `${card.id}`)
    cardModalButton.innerText = card.title
    newCardBodyDiv.appendChild(cardModalButton)

    // Adds event listener to show a single card
    cardModalButton.addEventListener('click', Card.handleCardClick)
  }

  static handleCardClick() {
    // After clicking the card modal button,
    // a GET fetch request is made for the specified card.
    // CArd information is passed to the show card method.
    fetch(`${BASE_URL}/cards/${this.dataset.cardId}`)
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
    const cardModalFooter = document.querySelector('#card-modal-footer')

    cardModalTitle.innerText = `${card.attributes.category_name} - ${card.attributes.title}`
    cardImgSrc.setAttribute('src', card.attributes.image)
    cardDescription.innerText = card.attributes.description

    // Event listener for deleting the card
    const cardDeleteButton = document.querySelector('#delete-card-button')
    cardDeleteButton.setAttribute('data-card-id', `${card.id}`)
    cardDeleteButton.addEventListener('click', Card.handleDeleteCardClick)

    const cardEditButton = document.querySelector('#edit-card-button')
    cardEditButton.setAttribute('data-card-id', `${card.id}`)
    cardEditButton.addEventListener('click', Card.handleEditCardClick)
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
      console.log('Success! Created New Card:', cardJSON.title)
      Card.makeCards(cardJSON)
      Category.resetCategoryListNew()
    })
    .catch((error) => {
      console.error('Error creating New Card:', error)
      Category.resetCategoryListNew()
    })
    newCardForm.reset()
  }

  static handleDeleteCardClick() {
    // A DELETE fetch to delete a card, after deletion the card is
    // removed from the DOM.
    fetch(`${BASE_URL}/cards/${this.dataset.cardId}`, {
      method: "DELETE", 
      mode: "cors"
    })
      .then(() => {

      console.log(`Success, deleted card number ${this.dataset.cardId}!`)
      // Find card element with certain card id from the DOM
      document.querySelectorAll('.card.text-center.d-inline-block.card-style').forEach((card) => {
        if(card.dataset.cardId === this.dataset.cardId){
          card.remove()
        }
      })
    })
    .catch((error) => {
      console.error('Error deleteing card:', error)
    })
    
    
  }

  static handleEditCardClick() {
    // trigger category options to be loaded into dom
    Category.insertCategoryOptionsEdit()

    const oldTitle = document.querySelector('#edit-card-title')
    const oldDescription = document.querySelector('#edit-card-description')
    const oldImage = document.querySelector('#edit-card-image')
    oldImage.setAttribute('placeholder', '')
    const oldCardCategory = document.querySelector('#edit-card-category-selections')
    const editCardButton = document.querySelector('#save-edit-card-button')
    

    // Making a GET fetch to grab the card, can I do this another way?
    fetch(`${BASE_URL}/cards/${this.dataset.cardId}`)
    .then((response) => response.json())
    .then((cardJSON) => {
      oldTitle.setAttribute('value', `${cardJSON.data.attributes.title}`)
      oldDescription.setAttribute('value', `${cardJSON.data.attributes.description}`)
      oldImage.setAttribute('value', `${cardJSON.data.attributes.image}`)
      oldCardCategory.setAttribute('value', `${cardJSON.data.attributes.category_id}`)
      editCardButton.setAttribute('data-card-id', `${cardJSON.data.attributes.id}`)
    })
    .catch((error) => {
      console.error('Error', error)
      editCardForm.reset()
    })
  }

  static handleEditSaveClick() {
    const oldTitle = document.querySelector('#edit-card-title')
    const oldDescription = document.querySelector('#edit-card-description')
    const oldImage = document.querySelector('#edit-card-image')
    const oldCardCategory = document.querySelector('#edit-card-category-selections')
    const editCardForm = document.querySelector('#edit-card-form')

    let updatedCard = {
      title: oldTitle.value,
      description: oldDescription.value,
      image: oldImage.value,
      category_id: oldCardCategory.value
    }

    fetch(`${BASE_URL}/cards/${this.dataset.cardId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedCard)
    })
    .then((response) => response.json())
    .then((cardJSON) => {
      console.log('Success! Updated card:', cardJSON.title)
      // remove old card before inserting updated card into the DOM
      // Find card element with certain card id from the DOM
      document.querySelectorAll('.card.text-center.d-inline-block.card-style').forEach((card) => {
        if(card.dataset.cardId === this.dataset.cardId){
          card.remove()
        }
      })
      Card.makeCards(cardJSON)
      Category.resetCategoryListNew()
      editCardForm.reset()
    })
    .catch((error) => {
      console.error('Error creating New Card:', error)
      Category.resetCategoryListNew()
      editCardForm.reset()
    })
  }
}