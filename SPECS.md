# JS Project Requirements

## Project Deliverables

- [x]  Submit a link to your GitHub project repo
- [x]  A `README.md` file that describes your application
- [x]  A **blog post** about your application
- [x]  A 2-4 minute **Video Demo** introducing your application


## Project Technical Requirements

- [x]  The application must be an HTML, CSS, and JS frontend with a Rails backend.

- [x]  All interactions between the client and the server must be handled asynchronously
      (AJAX) and use JSON as the communication format.
      - Fetch is used to return JSON from the server.

- [x]  The JS app must use Object Oriented JS (classes) to encapsulate related data and
      behavior.
      - There is a `Card` JS class and a `Category` JS class

- [x]  The domain model served by the Rails backend must include a resource with at least
      one has-many relationship.
      - A Cards `belong_to` a Category
      - A Category `has_many` Cards

- [x]  The backend and frontend must collaborate to demonstrate Client-Server communication.

  - [x] At least 3 AJAX calls
      - Fetch 1
  - [X]  At least 2 of our CRUD verbs (Create, Read, Update, Delete)
      - Cards can be created, read, updated, and deleted.
      - Categories can be created and read, with update and delete following very soon.

  - [x]  Client-side JS code must use fetch with the appropriate HTTP verb
      - Fetch requests use GET (by defualt when no options are specified), PATCH for update,
        and DELETE for deletion requests.

  - [x]  Rails API should use RESTful conventions.
      - Category requests are made to `/categories` and `/categories/:id`, as appropriate.
      - Card requests are made to `/cards` and `cards/:id` as appropriate.

## Best Practices

### JavaScript

- [x] Use classes and functions to organize your code into reusable pieces
- [x] Translate JSON responses into JS model objects using ES6 class or constructor function
      syntax.
- [x] Use ES6 features when appropriate (Arrow functions, `let` & `const`, rest and spread
       syntax)

### Rails

- [x] Follow Rails MVC and RESTful conventions
- [x] Well-named variables and methods
- [x] Short, single-purpose methods

### Git

- [x]  Aim for a large number of small commits - commit frequently!
- [x]  Add meaningful messages to your commits. When you look back at your commits with
      `git log`, the messages should describe each change.
- [x]  Don't include changes in a commit that aren't related to the commit message.

## Suggested Project Structure

There is no requirement for how you decide to structure the code within that repo, but in the past, students have had success using a structure like:

```txt
javascript-project/
  backend/
    app/
    (...other rails files and folders)
  frontend/
    index.html
    style.css
    index.js
  README.md
```

## Project Review

### What should you be prepared for in Project Review?

During your project review, be prepared to:

1. Explain your code from execution point to exit point. Use the best technical vocabulary you can.
2. Live code. This could be refactoring, adding a new feature, or both.
3. Answer questions about your knowledge of _JavaScript Fundamentals_.


### Learning Goals

These are the skills and knowledge that you should aim to demonstrate through the project review.

- Explain how Rails routes a request to a controller and method based on the URL and HTTP verb
- Use `render json:` to render serialized JSON
- Select, Create, and Modify DOM nodes
- Attach listeners to DOM nodes to respond to user interaction
- Use `preventDefault` to control form submit behavior
- Use `fetch` with 'GET', 'POST', 'PATCH' & 'DELETE' HTTP methods
- Create a JavaScript object with ES6 class syntax
- Instantiate JavaScript objects and call methods on them.