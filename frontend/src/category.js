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