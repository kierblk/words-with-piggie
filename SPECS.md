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

We have, technically, four options for declaration:

1. GLOBAL variables
      - `nyName = "sara"`
      - Not ever an option for us to use
      - implicit declaration, no keyword

2. `var`
      - `var myName = "Sara"`
      - Not really an option anymore
      - does NOT support block scoping
      - global or function scoped
      - can be re-declared
      - can be re-assigned
      - hoisted
      - During compilation phase, initalized to `undefined`

3. `let`
      - `let myName = "Sara"`
      - can be global, functional, or block scoped
      - canNOT be re-declared
      - can be re-assigned
      - not really hoisted
      - can be declared with no initializer, but will be given `undefined` during execution not compilation

4. `const`
      - `const myName = "Sara"`
      - can be global, functional, or block scoped
      - canNOT be re-declared
      - canNOT be re-assigned
      - not really hoisted
      - canNOT be declared with no initializer, must be given one right away

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

**Kinda life `self` in Ruby, but for JS** 

The JavaScript keyword `this` returns the current _execution context_ while the
function is being run.  Whether that context was passed explicitly or
implicitly, `this` returns it.

##### Four ways `this` gets it's value, not including Arrow Functions

1. Function invocation
      No receiving object: `run()`
      Non-strict mode: `this` will be the global object
      Strict-mode: `this` is undefined

2. Method invocation
      Has a receiving object: `obj.method()`
      Non-strict mode: `this` will be the receiving `obj`
      Strict mode: not change, same as non-strict mode

3. Apply, or bind/call/apply invocation
      Can override `this` in any case!!
      EX: `run.call(thisArg)`
      Tells the function or method EXPLICITLY what `this` is

4. Constructor invocation
      Uses the `new` keyword before invocation
      EX: `new waffle(waffleInfo)`
      `this` is the new object that is created
      Rare case of **implicit** return, the new object is returned as well.

##### Arrow Functions and `this`

      Every function starting with the keyword `function` (expressions or declarations) get two hidden bonus parameters: `this` and `arguments` EXCEPT ARROW FUNCTIONS, THEY GET NEITHER!

      Arrow functions, completely unlike all other functions, have no `this` of their own.
      Instead, references to `this` will refer to wherever `this` is defined. It takes its parent scope as `this`.

##### Event Listeners and `this`

When adding event listeners, `this` in the callback will be the DOM element the listener was attached to... unless the callback was an arrow function.

#### closures

#### ES6 syntax ?

##### Template Strings

Back ticks - make special strings that allow interpolatation and formation of HTML templates within.

##### Destructuring

A shorthand way of making variable assignments from information within a plain object or an array.

```JS
      // Objects
      const myObject = {
            name: "Sara",
            favoriteFruit: "Apples"
      }

      const favoriteFruit = myObject.favoriteFruit
      const { favoriteFruit } = myObject

      // Arrays
      const myArray = ["red", "green", "blue"]
      const ["red", "green", "blue"] = myArray

      // Arguments
      const greet = ({name, greeting}) => `${greeting}, ${name}!`
      greet({name: "Sara", greeting: "Hi there"})
```

##### Default Arguments

```JS
      function greet(name, greeting = "Hi there"){
            return `${greeting}, ${name}!`
      }

      greet("Sara") // "Hi there, Sara!"
      greet("Sara", "Yo") // "Yo, Sara!"
```

##### Rest/Spread Operators

**REST**

```JS
      function greet(greeting, name, ...otherNames){
            return `${greeting}, ${name} ${otherNames.length >= 1 ? otherNames.join(" ") : ""}!`
      }

      greet("Hi there", "Sara") // "Hi there, Sara!"
      greet("Hi there", "Sara", "Brandon", "Anastasia") // "Hi there, Sara Brandon Anastasia!"
```

**SPREAD**
Allows us to preserve values from an object or an array, to basically make a copy.

```JS
      // Objects
      const myObject = {
            name: "Sara",
            favoriteFruit: "Apples"
      }

      const newObject = {
            ...myObject,
            name: "Brandon"
      }

      //Array
      const myArray = [1, 2, 3, 5]

      const myArrayCopy = [...myArray]
      const myArrayPlus7 = [...myArray, 7]
```

Could also use `object.assign()` to achieve this.. but rest and spread are easier.

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