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

##### Execution Context

When a function in JavaScript ***is called***, it is provided an _execution
context_.

The _execution context_ is a JavaScript `Object` that is either implicitly or
explicitly passed at the time of the function's call.

The implicit way of passing a context with a function is something we have to
memorize and accept as part of the nature of JavaScript.

The tools for explicitly passing a context at function call-time are the
methods `call`, `apply`, and `bind.`

##### "Non-bare Function Calls

When a function is called, it gets an execution context passed in. That context
will be whatever the function was 'called on' - the object to the left of the
`.`  where it's called.

A simple way of saying it: when you call `someObject.someFunction()`, the
context inside of `someFunction` will be the thing to the left of the `.`:
`someObject`.

When no object is to the left of the function, JavaScript invisibly adds **the
global object**. A simple way of saying it: when you call `someFunction()`, the context inside
of `someFunction` will be the thing to the left of the `.`.  Since there's
nothing there, JavaScript swaps in the global object.

In browser-based JavaScript environment (or "JavaScript runtime"), the global
object is called `window`.

#### `this`

The JavaScript keyword `this` returns the current _execution context_ while the
function is being run.  Whether that context was passed explicitly or
implicitly, `this` returns it.

1. Execution context is set in a function by invoking `call` on the function
   and passing, as the first argument, a `thisArg` which is accessed via `this`
   in the function. Additional parameters to the function are listed after `,`
2. Execution context is set in a function by invoking `apply` on the function
   and passing, as first argument, a `thisArg` which is accessed via `this` in
   the function. Additional parameters to the function are stored in the
   second argument: an `Array` containing arguments to the function.
3. Execution context can be locked in a function by invoking `bind` on it and
   passing it a `thisArg`. The `bind` function makes a copy of the
   functionality of its function but with all the `this` stuff locked in place
   and returns that function. That _new_ function can have arguments passed to it
   during its call with `()` as usual.

#### closures

#### ES6 syntax

#### `let`, `const`

#### arrow functions

The arrow function expression (often simply called an "arrow function") is yet
another way of writing a function expression. They look different from "old
style" function expressions, but the ***most important difference*** is that
the arrow function is ***automatically bound*** to its parent's context and
does not create a context of its own.

Many programmers think arrow functions are much more predictable since they
do not create their own `this` during execution and instead "absorb" the
context of their enclosing environment.

Since _the whole point_ of an arrow function is to ***not have its own
execution context***, we should not use `call`, `bind`, or `apply` when
executing them. Most of the time, you'll see them used like anonymous functions
passed as first-class data into another function.

Because arrow functions are _so often used_ to take a value, do a single
operation with it, and return the result, they have two shortcuts:

* If you pass only one argument, you don't have to wrap the single parameter in `()`
* If there is only one expression, you don't need to wrap it in `{}` and the result of that expression is automatically returned.
* Anti-Shortcut: If you *DO* use `{}`, you must explicitly `return` the return value

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