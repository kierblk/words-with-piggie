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
    newCategoryLink.setAttribute('data-category-id', `${category.id}`)
    newCategoryLink.innerText = `${category.title}`
    categoryDropdownMenuDiv.appendChild(newCategoryLink)

    // Adds event listener to show all cards by selected category
    newCategoryLink.addEventListener('click', Category.handleCategoryClick)
  }

  static handleCategoryClick(event) {
    //Place holder for sort by category
    console.log(`You clicked category: ${event.target.innerText}`)
    console.log(event.target.dataset.categoryId)
    fetch(`${BASE_URL}/categories/${event.target.dataset.categoryId}`)
      .then(response => response.json())
      .then(categoryCards => {
        Card.removeAllCards()
        categoryCards.data.attributes.cards.forEach(card => Card.makeCards(card))
      })
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

  static resetCategoryListNew() {
    // This method prevents duplicates being shown in the category selection dropdown
    // when a new card is created or is cancelled/closed during creation.
    const categoriesSelection = document.querySelector('#new-card-category-selections')
    while(categoriesSelection.firstChild) { 
      categoriesSelection.removeChild(categoriesSelection.firstChild); 
    } 
  }

  static insertCategoryOptionsNew() {
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
  }

  static insertCategoryOptionsEdit() {
    fetch(`${BASE_URL}/categories`)
    .then(response => response.json())
    .then(categoriesJSON => categoriesJSON.data.forEach(category => {
      const optionTag = document.createElement('option')
      const categoriesSelection = document.querySelector('#edit-card-category-selections')
      categoriesSelection.setAttribute('class', 'form-control form-control-lg')
      optionTag.innerText = category.attributes.title
      optionTag.setAttribute('value', category.id)
      categoriesSelection.appendChild(optionTag)
    }))
  }

  static resetCategoryListEdit() {
    // This method prevents duplicates being shown in the category selection dropdown
    // when a new card is created or is cancelled/closed during creation.
    const categoriesSelection = document.querySelector('#edit-card-category-selections')
    while(categoriesSelection.firstChild) { 
      categoriesSelection.removeChild(categoriesSelection.firstChild); 
    } 
  }

  static handleManageCategoriesClick(){
    const categoryListDiv = document.querySelector('#category-list')
    console.log('you clicked this')

    fetch(`${BASE_URL}/categories`)
      .then(response => response.json())
      .then(categoriesJSON => categoriesJSON.data.forEach(category => {
        console.log(category.attributes)

        const newCategoryListItem = document.createElement('li')
        newCategoryListItem.setAttribute('data-category-id', `${category.attributes.id}`)
        newCategoryListItem.innerText = `${category.attributes.title}`

        const deleteCategoryButton = document.createElement('button')
        deleteCategoryButton.setAttribute('id', 'delete-category-button')
        deleteCategoryButton.setAttribute('type', 'button')
        deleteCategoryButton.setAttribute('class', 'btn btn-outline-danger')
        deleteCategoryButton.setAttribute('data-dismiss', 'modal')
        deleteCategoryButton.setAttribute('data-category-id', `${category.attributes.id}`)

        const deleteFAIcon = document.createElement('i')
        deleteFAIcon.setAttribute('class', 'far fa-trash-alt')
        deleteCategoryButton.appendChild(deleteFAIcon)

        newCategoryListItem.append(deleteCategoryButton)

        categoryListDiv.appendChild(newCategoryListItem)
      }))

      // Add event listener to the delete button
      // Delete button will delete category and all cards associated with it.
      // Create alert to confirm that delete will do the above thing.
      // After delete, reset the list

      // Add event listener to close that resets the list
  }
}