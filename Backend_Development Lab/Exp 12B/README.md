# Experiment 12B: Using Node.js to Manage Sessions & Cookies

## Objective
To understand why HTTP is stateless and implement state management in Node.js and Express using **Cookies** (client-side storage) and **Sessions** (server-side storage) for user authentication and preferences.

## Concepts Covered

### 1. Why HTTP is Stateless
Every HTTP request is independent—once a server sends a response, it forgets the client. To keep users logged in or remember preferences across requests, web applications use cookies and sessions.

### 2. Cookies vs. Sessions

| Feature | Cookies (`cookie-parser`) | Sessions (`express-session`) |
| :--- | :--- | :--- |
| **Storage Location** | Stored in the user's web browser | Stored on the server (only a Session ID is sent via cookie) |
| **Security** | Visible/editable on the client side | More secure for sensitive user login state |
| **Use Case in Lab** | Tracking `visitCount` and `theme` (`light`/`dark`) | Storing logged-in `username`, `role`, and `dashboardViews` |

## Project Structure
* `app.js` — Express server configuring `cookie-parser` and `express-session` with login, protected dashboard, theme cookie, and logout routes.
* `views/login.ejs` — Login page displaying the browser `visitCount` cookie and theme selector.
* `views/dashboard.ejs` — Protected user dashboard displaying active server session details.
* `package.json` — Project dependencies (`express`, `ejs`, `cookie-parser`, `express-session`, `nodemon`).

## How to Run
1. Navigate to the folder:
   ```bash
   cd "lab/Exp 12B"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser, log in to test session state, refresh the dashboard to see the session counter increment, and click **Destroy Session (Logout)** to end the session.
