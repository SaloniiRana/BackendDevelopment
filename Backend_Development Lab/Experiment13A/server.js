const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and HTML form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Connect to MongoDB (Local or MongoDB Atlas)
const DB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/userdb';

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 2. Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 3. Create the User Model
const User = mongoose.model('User', userSchema);

// 4. Routes

// HOME ROUTE - Signup, Login & View Users UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Experiment 13A - User Management System</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 750px; margin: 40px auto; padding: 20px; background: #f4f6f8; }
        .card { background: #ffffff; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        h1, h2 { color: #1e3a5f; margin-top: 0; }
        input { width: 100%; padding: 10px; margin: 6px 0 12px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        button { background: #1e3a5f; color: white; padding: 10px 18px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
        button:hover { background: #162c46; }
      </style>
    </head>
    <body>
      <h1>Express + Mongoose User Management</h1>

      <div class="card">
        <h2>Register New User</h2>
        <form action="/signup" method="POST">
          <input type="text" name="username" placeholder="Username" required>
          <input type="email" name="email" placeholder="Email" required>
          <input type="password" name="password" placeholder="Password" required>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div class="card">
        <h2>Login</h2>
        <form action="/login" method="POST">
          <input type="text" name="username" placeholder="Username" required>
          <input type="password" name="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      </div>

      <div class="card">
        <h2>Database Records</h2>
        <form action="/users" method="GET">
          <button type="submit">Show All Registered Users</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// SIGNUP ROUTE - Save a new user document in MongoDB
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    res.send(`
      <h2 style="color: green;">User registered successfully!</h2>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Email:</strong> ${email}</p>
      <a href="/">Go back to home</a>
    `);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send(`
        <h2 style="color: red;">Error: Username or email already exists</h2>
        <a href="/">Go back and try again</a>
      `);
    } else {
      res.status(500).send(`
        <h2 style="color: red;">Error: ${error.message}</h2>
        <a href="/">Go back and try again</a>
      `);
    }
  }
});

// LOGIN ROUTE - Query MongoDB for matching credentials
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send(`
        <h2 style="color: red;">User not found</h2>
        <a href="/">Go back and try again</a>
      `);
    }

    if (user.password !== password) {
      return res.status(401).send(`
        <h2 style="color: red;">Incorrect password</h2>
        <a href="/">Go back and try again</a>
      `);
    }

    res.send(`
      <h2 style="color: green;">Login successful!</h2>
      <p>Welcome back, <strong>${user.username}</strong>!</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Account Created:</strong> ${user.createdAt.toDateString()}</p>
      <a href="/">Go back to home</a>
    `);
  } catch (error) {
    res.status(500).send(`
      <h2 style="color: red;">Error: ${error.message}</h2>
      <a href="/">Go back and try again</a>
    `);
  }
});

// GET ALL USERS ROUTE - Fetch all documents from MongoDB
app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();

    if (allUsers.length === 0) {
      return res.send(`
        <h2>No users registered yet</h2>
        <a href="/">Go back to home</a>
      `);
    }

    let userList = '<h2>Registered Users</h2><ul>';
    allUsers.forEach((user) => {
      userList += `
        <li>
          <strong>Username:</strong> ${user.username} |
          <strong>Email:</strong> ${user.email} |
          <strong>Joined:</strong> ${user.createdAt.toDateString()}
        </li>
      `;
    });
    userList += '</ul><a href="/">Go back to home</a>';

    res.send(userList);
  } catch (error) {
    res.status(500).send(`
      <h2 style="color: red;">Error: ${error.message}</h2>
      <a href="/">Go back to home</a>
    `);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
