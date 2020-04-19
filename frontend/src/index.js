document.addEventListener("DOMContentLoaded", init)

BASE_URL = 'http://localhost:3000'






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
  createCardButton.addEventListener('click', Card.handleCreateCardClick)

  const editCardButton = document.querySelector('#save-edit-card-button')
  // Event listener to create a card
  editCardButton.addEventListener('click', Card.handleEditSaveClick)

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
    Category.insertCategoryOptions()
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





