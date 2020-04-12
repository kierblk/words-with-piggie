document.addEventListener("DOMContentLoaded", init)

function init(){
  // Variable declarations
  const mainDiv = document.querySelector('.main')
  let getStartedBtn = document.querySelector('#get-started-btn')
 

  getStartedBtn.addEventListener('click', resetGame)

  console.log("INIT FN: Tea. Earl Grey. Hot.")

  fetchCategories()
  start(mainDiv)

  // Functions below
  
  function start(mainDiv) {
    const startText = `
    <div class="" id="start-wrapper">
      <h1 id="header-text" class="header-text">Welcome</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nam aperiam repudiandae assumenda dolor fugit, cumque doloremque modi, maiores dignissimos necessitatibus excepturi eveniet provident ea suscipit! Quod at distinctio ipsam.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat cupiditate officiis nam veritatis, itaque eos perspiciatis et hic modi sunt expedita harum exercitationem ipsa dicta iure adipisci fuga repellendus optio.</p>
  
      <button id="start-button" class="start btn btn-lg btn-success brand-text">Start</button>
    </div> 
    `
    mainDiv.innerHTML += startText
    const startBtn = document.querySelector('#start-button')
    startBtn.addEventListener('click', hideStart)
  }

  function resetGame() {
    const startWrapper = document.querySelector('#start-wrapper')
    startWrapper.classList.remove('d-none')
  }
  
  function hideStart(event){
    const startWrapper = document.querySelector('#start-wrapper')
    startWrapper.classList.add('d-none')
    console.log(startWrapper)
    fetchCards()
    showCard(mainDiv)
  }
  
  function fetchCategories() {
    // console.log("FETCH CATEGORIES FN: Make it so.")
    const backendURL = 'localhost:3000'
  
    fetch(`http://${backendURL}/categories`)
      .then(response => response.json())
      .then(categoriesJSON => categoriesJSON.forEach(category => makeCategory(category)))
  }
  
  function makeCategory(category){
    // console.log(`MAKE CATEGORIES FN: Captains log...made category ${category.title}`)
    let categoryDropdownMenuDiv = document.querySelector('.dropdown-menu')
    const newCategoryBtn = `
      <a class="dropdown-item" href="#">
      ${category.title}
      </a>
    `
    categoryDropdownMenuDiv.innerHTML += newCategoryBtn
  }
  
  function fetchCards() {
    // console.log("FETCHCARDS FN: Make it so.")
    const backendURL = 'localhost:3000'
  
    fetch(`http://${backendURL}/cards`)
      .then(response => response.json())
      .then(cardsJSON => cardsJSON.forEach(card => makeCards(card)))
  }
  
  function makeCards(card) {
    console.log("MAKE CARDS FN: Captains log...")
    const mainCardWrapperDiv = document.querySelector('#main-card-wrapper')
    const newCardDiv = document.createElement('div')
    newCardDiv.setAttribute('class', 'card text-center d-inline-block card-style')
    newCardDiv.innerHTML = `
      <img class="card-img-top object-fit-img" src="${card.image}">
      <div class="card-body">
        <h5 class="card-title">${card.title}</h5>
      </div>
    `
    mainCardWrapperDiv.appendChild(newCardDiv)
  }
  
  function showCard(mainDiv) {
    const images = Array.from(mainDiv)
    const modal = document.querySelector('.modal')
  }

}



