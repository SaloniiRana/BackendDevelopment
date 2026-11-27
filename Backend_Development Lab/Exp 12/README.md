# Experiment 12: Node.js, Express.js, and EJS Templating

## Objective
To understand and implement server-side JavaScript using Node.js, build RESTful APIs with Express.js, handle HTTP requests and responses, work with URL parameters and POST data, implement EJS templating, and use development tools like Nodemon.

## Project Structure
* `app.js` — Main Express server handling page routes, URL parameters, POST form submissions, and RESTful JSON API endpoints.
* `views/index.ejs` — Main EJS template displaying dynamic server data and a POST form.
* `views/task.ejs` — Detail view rendered using URL route parameters (`/task/:id`).
* `package.json` — Project metadata, dependencies (`express`, `ejs`), and dev script (`nodemon`).

## API & Page Routes

| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Renders the home page with all tasks using EJS |
| `GET` | `/task/:id` | Renders details for a single task using `req.params.id` |
| `POST` | `/add-task` | Parses form data via `express.urlencoded()` and adds a task |
| `GET` | `/api/tasks` | Returns all tasks in JSON format |
| `GET` | `/api/tasks/:id` | Returns a specific task in JSON format |
| `POST` | `/api/tasks` | Creates a new task from a JSON request body |
| `DELETE` | `/api/tasks/:id` | Deletes a task by ID |

## How to Run
1. Open the terminal inside the `Exp 12` folder:
   ```bash
   cd "lab/Exp 12"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server using Nodemon (auto-restarts on file changes):
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.
