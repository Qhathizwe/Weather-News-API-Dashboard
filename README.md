# 🌦️ Weather & News API — Async JavaScript Demonstration

A practical TypeScript project demonstrating **three different approaches to handling asynchronous operations in JavaScript/TypeScript**:

* 🔄 Callbacks
* 🤝 Promises
* ⚡ Async/Await

The project uses weather and news API requests as practical examples and outputs the results directly to the **console**.

The main purpose of this project is not to build a graphical user interface, but to clearly demonstrate how asynchronous JavaScript works and how different asynchronous techniques can be used to handle API requests.

---

## 📚 Project Overview

This project was created as a learning exercise to understand how JavaScript handles operations that take time to complete, such as fetching data from external APIs.

The project is divided into **three separate examples**, with each file demonstrating a different asynchronous programming approach.

```text
                    API Requests
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
          Callback     Promise    Async/Await
             │           │           │
             ▼           ▼           ▼
          Console     Console     Console
           Output      Output      Output
```

Each implementation performs asynchronous operations and displays the resulting data in the terminal/console.

---

# 🧩 Three Async Approaches

## 1. 🔄 Callback

The callback example demonstrates how asynchronous operations can be handled by passing a function that should execute after an operation has completed.

### Concept

```text
Start Operation
      ↓
Wait for API response
      ↓
Callback function
      ↓
Display result
```

The callback approach helps demonstrate the foundation of asynchronous JavaScript before Promises and Async/Await became the commonly preferred approaches.

### What this example demonstrates

* Callback functions
* Asynchronous API requests
* Handling returned data
* Executing code after an asynchronous operation completes
* Console-based output

---

# 2. 🤝 Promises

The Promise example demonstrates how asynchronous operations can be represented using JavaScript `Promise` objects.

This implementation also demonstrates three important Promise methods:

### 🔗 Promise Chain

Promises can be chained together so that the result of one asynchronous operation can be passed to the next operation.

```text
Request 1
   ↓
.then()
   ↓
Request 2
   ↓
.then()
   ↓
Request 3
```

This helps demonstrate how multiple asynchronous operations can be performed sequentially.

---

### 📦 Promise.all()

`Promise.all()` allows multiple promises to execute together and waits until **all of them have completed successfully**.

```text
          ┌── Request 1 ──┐
          │               │
Start ────┼── Request 2 ──┼──→ Promise.all()
          │               │
          └── Request 3 ──┘
                         ↓
                  Combined Results
```

This is useful when multiple independent pieces of information are required before continuing.

For example:

```typescript
Promise.all([
    getWeather(),
    getNews()
])
```

The program waits for both operations and then works with their results.

---

### 🏁 Promise.race()

`Promise.race()` waits for the **first promise to settle**.

```text
          ┌── Request 1 ──┐
          │               │
Start ────┼── Request 2 ──┼──→ Promise.race()
          │               │
          └── Request 3 ──┘
                         ↓
                  First Result
```

This demonstrates an important difference between `Promise.all()` and `Promise.race()`.

### Promise comparison

| Method           | Behaviour                                     |
| ---------------- | --------------------------------------------- |
| `.then()` chain  | Executes asynchronous operations sequentially |
| `Promise.all()`  | Waits for all promises                        |
| `Promise.race()` | Responds to the first promise to settle       |

---

# 3. ⚡ Async/Await

The Async/Await example demonstrates a more modern and readable way of working with Promises.

Instead of relying heavily on `.then()` chains, `async` and `await` allow asynchronous code to be written in a style that looks more like normal synchronous code.

### Example concept

```typescript
async function getData() {
    const weather = await getWeather();

    console.log(weather);
}
```

The `await` keyword pauses execution inside the asynchronous function until the Promise produces its result.

### What this example demonstrates

* `async` functions
* `await`
* Promise-based API requests
* Sequential asynchronous operations
* Cleaner asynchronous code
* Console output

---

# 🧠 What This Project Teaches

The main goal of this project is to understand the evolution of asynchronous JavaScript.

```text
Callbacks
    ↓
Promises
    ↓
Async/Await
```

### Callbacks

The traditional approach to handling asynchronous operations.

### Promises

A structured way to represent the eventual completion or failure of an asynchronous operation.

### Async/Await

A modern syntax built on top of Promises that makes asynchronous code easier to read and maintain.

---

# 🌐 API Integration

The project uses external API requests as realistic examples of asynchronous operations.

API requests are particularly useful for demonstrating asynchronous programming because the application must:

1. Send a request.
2. Wait for a response.
3. Receive the data.
4. Process the response.
5. Display the result.

The application demonstrates these steps through the three different asynchronous approaches.

---

# 🖥️ Console-Based Output

There is **no graphical user interface (GUI)** in this project.

The results are intentionally displayed in the **console/terminal**.

Example:

```text
=== Callback Example ===

Weather Result:
...

News Result:
...


=== Promise Example ===

Promise Chain:
...

Promise.all():
...

Promise.race():
...


=== Async/Await Example ===

Weather Result:
...
News Result:
...
```

This keeps the project focused on understanding the asynchronous JavaScript concepts rather than frontend design.

---

# 📁 Project Structure

The project is organized around the three asynchronous programming approaches.

```text
Weather-News-API-Dashboard/
│
├── src/
│   │
│   ├── callback
│   │   └── ...
│   │
│   ├── promise
│   │   └── ...
│   │
│   └── async
│       └── ...
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

Each implementation provides a separate example so the approaches can be studied and compared independently.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/Qhathizwe/Weather-News-API-Dashboard.git
```

## 2. Enter the project directory

```bash
cd Weather-News-API-Dashboard
```

## 3. Install dependencies

```bash
npm install
```

## 4. Run the project

Use the appropriate npm script configured in the project:

```bash
npm run [(file name) (async, callback, promise)]
```

or run the relevant TypeScript files using the project's configured commands.

---

---

# 🔍 Key Concepts Demonstrated

This project provides practical examples of:

* Asynchronous JavaScript
* TypeScript
* Callback functions
* Promises
* Promise chaining
* `Promise.all()`
* `Promise.race()`
* `async`
* `await`
* API requests
* JSON responses
* Error handling
* Console logging
* Sequential asynchronous operations
* Parallel asynchronous operations

---

# ⚖️ Callback vs Promise vs Async/Await

| Feature                 | Callback    | Promise          | Async/Await      |
| ----------------------- | ----------- | ---------------- | ---------------- |
| Asynchronous operations | ✅           | ✅                | ✅                |
| Easy to read            | ⚠️          | ✅                | ✅                |
| Chaining                | ⚠️          | ✅                | ✅                |
| Error handling          | More manual | `.catch()`       | `try/catch`      |
| Multiple requests       | Possible    | `Promise.all()`  | `Promise.all()`  |
| First completed request | Manual      | `Promise.race()` | `Promise.race()` |
| Modern approach         | Older       | Modern           | Modern/readable  |

The project demonstrates that **Async/Await is built around Promises**, while callbacks represent the earlier approach to managing asynchronous operations.

---

# 🎯 Learning Objectives

By completing this project, the developer should be able to understand:

### 1. Why asynchronous programming is necessary

API requests do not return their results immediately. JavaScript needs a way to continue executing while waiting for external operations.

### 2. How callbacks work

A callback can be supplied to execute after an asynchronous operation finishes.

### 3. How Promises work

Promises represent a future result and provide methods for handling success and failure.

### 4. How Promise chaining works

Multiple asynchronous operations can be connected together.

### 5. How `Promise.all()` works

Multiple independent asynchronous operations can be handled together.

### 6. How `Promise.race()` works

The first Promise to settle determines the result.

### 7. How Async/Await works

Promises can be handled using cleaner, more readable syntax.

---

# 💡 Why Use Weather and News APIs?

Weather and news APIs provide realistic examples because they involve external data and network requests.

Instead of creating artificial delays just to demonstrate asynchronous programming, this project uses actual API-style operations to show how asynchronous code works in a practical situation.

---

# 🧪 Experimenting With the Project

One of the best ways to learn from this project is to modify the code and observe the console output.

Try:

* Changing the API request.
* Adding another asynchronous request.
* Adding another `.then()` to a Promise chain.
* Adding another Promise to `Promise.all()`.
* Adding another Promise to `Promise.race()`.
* Adding error handling.
* Comparing execution times.
* Running requests sequentially versus concurrently.

---

# 📈 Possible Future Improvements

Although this project is intentionally console-based, it could later be expanded with:

* A web-based interface
* Weather search
* News search
* Loading indicators
* Error messages
* API response cards
* Charts and data visualisation
* Location-based weather
* Unit conversion
* More Promise examples
* Automated tests

However, the current project remains focused on **understanding asynchronous programming concepts**.

---

# 👨‍💻 Author

## Scelo Mike Phoswa

Aspiring Software Developer | IT Technician | Technology Enthusiast

GitHub:

https://github.com/Qhathizwe

Project:

https://github.com/Qhathizwe/Weather-News-API-Dashboard

---

## ⭐ Project Purpose

> **A hands-on demonstration of Callback, Promise, and Async/Await techniques using real API requests and console output.**

The project is designed to make the differences between asynchronous programming approaches easier to understand by implementing each approach separately and observing the results directly in the console.
