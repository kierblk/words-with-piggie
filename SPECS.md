# JS Project Requirements

## Project Deliverables

- [ ]  Submit a link to your GitHub project repo
- [ ]  A `README.md` file that describes your application
- [ ]  A **blog post** about your application
- [ ]  A 2-4 minute **Video Demo** introducing your application


## Project Technical Requirements

- [ ]  The application must be an HTML, CSS, and JS frontend with a Rails backend.
- [ ]  All interactions between the client and the server must be handled asynchronously
      (AJAX) and use JSON as the communication format.
- [ ]  The JS app must use Object Oriented JS (classes) to encapsulate related data and
      behavior.
- [ ]  The domain model served by the Rails backend must include a resource with at least
      one has-many relationship.abs
- [ ]  The backend and frontend must collaborate to demonstrate Client-Server communication.

  - [ ] At least 3 AJAX calls
  - [ ]  At least 2 of our CRUD verbs (Create, Read, Update, Delete)
  - [ ]  Client-side JS code must use fetch with the appropriate HTTP verb
  - [ ]  Rails API should use RESTful conventions.

## Best Practices

### JavaScript

- [ ] Use classes and functions to organize your code into reusable pieces
- [ ] Translate JSON responses into JS model objects using ES6 class or constructor function
      syntax.
- [ ] Use ES6 features when appropriate (Arrow functions, `let` & `const`, rest and spread
       syntax)

### Rails

- [ ] Follow Rails MVC and RESTful conventions
- [ ] Well-named variables and methods
- [ ] Short, single-purpose methods

### Git

- [ ]  Aim for a large number of small commits - commit frequently!
- [ ]  Add meaningful messages to your commits. When you look back at your commits with
      `git log`, the messages should describe each change.
- [ ]  Don't include changes in a commit that aren't related to the commit message.

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

In particular, the JavaScript Fundamentals concepts your reviewer may ask about include:

#### variables

#### data structures

#### functions

#### hoisting

Function declarations and variable declarations are hoisted in JS. Meaning the declarations act as though they were moved to the top of the JS file (above the call/invocations) because the JS Engine has a two-phase nature.

During the first phase, the compilation phase, JS only focuses on function and variable declarations when it reads through JS code from top to bottom. By the time JS has reached phase two, the execution phase where it will focus on the invocation or calls of functions and variables, these functions and variables have already been created in memory.

While hoisting allows access to functions and variable before they are declared, there are a few caveats:
1. Not all functions are hoisted, only regular function declarations
2. Variables definitions are hoisted, not variable values. 

#### scope

#### context

#### `this`

#### closures

#### ES6 syntax

#### `let`, `const`

#### arrow functions

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