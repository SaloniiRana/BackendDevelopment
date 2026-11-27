# Experiment 13A: Express + Mongoose User Management System

## Objective
To understand and implement MongoDB database integration in Node.js using **Express.js** and **Mongoose** through a simple user registration, login, and user listing web application.

## Key Mongoose Concepts Implemented
* **Connection (`mongoose.connect`):** Connects the Express server to a local MongoDB instance (`mongodb://localhost:27017/userdb`) or MongoDB Atlas.
* **Schema (`mongoose.Schema`):** Defines the structure, data types (`String`, `Date`), validation (`required: true`), and uniqueness constraints (`unique: true`) for user documents.
* **Model (`mongoose.model`):** Provides the interface (`User`) for creating and querying MongoDB documents.
* **CRUD Operations:**
  * `new User(...).save()` — Inserts a new user document into MongoDB during signup.
  * `User.findOne({ username })` — Queries a single user document to verify login credentials.
  * `User.find()` — Retrieves all registered user documents from the database.

## Routes Overview

| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Renders the registration, login, and user list forms |
| `POST` | `/signup` | Registers a new user and handles duplicate key errors (`11000`) |
| `POST` | `/login` | Authenticates username and password against MongoDB |
| `GET` | `/users` | Displays all registered users stored in MongoDB |

## How to Run
1. Ensure **MongoDB** is running locally (or set a MongoDB Atlas connection string in `server.js`).
2. Open the terminal inside `lab/Experiment13A`:
   ```bash
   cd "lab/Experiment13A"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000` in your browser to test signing up, logging in, and viewing all users.
