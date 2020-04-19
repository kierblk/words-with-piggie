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
    const cardModalFooter = document.querySelector('#card-modal-footer')

    cardModalTitle.innerText = `${card.attributes.category_name} - ${card.attributes.title}`
    cardImgSrc.setAttribute('src', card.attributes.image)
    cardDescription.innerText = card.attributes.description

    const cardDeleteButton = document.querySelector('#delete-card-button')
    cardDeleteButton.setAttribute('data-card-id', `${card.id}`)
    cardDeleteButton.addEventListener('click', Card.handleDeleteCardClick)
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
    })
    .catch((error) => {
      console.error('Error creating New Card:', error)
    })
    newCardForm.reset()
  }

  static handleDeleteCardClick() {
    const mainCardWrapperDiv = document.querySelector('#main-card-wrapper')
    fetch(`${BASE_URL}/cards/${this.dataset.cardId}`, {
      method: "DELETE", 
      mode: "cors"
    })
      .then(() => {
      console.log(`Success, deleted card number ${this.dataset.cardId}!`)
    })
    .catch((error) => {
      console.error('Error deleteing card:', error)
    })
    mainCardWrapperDiv.removeChild(mainCardWrapperDiv.lastChild)
  }
}