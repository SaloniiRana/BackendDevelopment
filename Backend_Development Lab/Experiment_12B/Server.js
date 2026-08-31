const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000; // Running on Port 4000 to keep it separate from other tasks

// 1. Configure the Template View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Setup Server Middleware Pipes
app.use(express.urlencoded({ extended: true }));     // Parses text data submitted from forms
app.use(cookieParser('my-super-secret-cookie-key')); // Parses incoming cookies securely

// 3. Configure Express Session Middleware Engine
app.use(session({
    secret: 'my-backend-session-secret-key', // Secret key used to sign the session ID cookie
    resave: false,                           // Prevents saving session data back if it wasn't modified
    saveUninitialized: false,                // Saves space by not creating empty sessions for anonymous users
    cookie: { 
        maxAge: 1000 * 60 * 10,              // Session automatically expires after 10 minutes (in milliseconds)
        secure: false,                       // Set to true only if your website uses secure HTTPS links
        httpOnly: true                       // Blocks hacker browser scripts from stealing the user token cookie
    }
}));

// 4. GET Route - Main Dashboard Layout Interface
app.get('/', (req, res) => {
    // Reading Tracking Metrics from the local server session storage
    if (!req.session.pageViews) {
        req.session.pageViews = 1;
    } else {
        req.session.pageViews++;
    }

    // Checking if a theme choice cookie is already saved inside the visitor's browser
    const clientTheme = req.cookies.userTheme || 'light';

    res.render('index', {
        pageTitle: "Experiment 12B: HTTP State Management System",
        sessionViews: req.session.pageViews,
        username: req.session.loggedInUser || null,
        activeTheme: clientTheme
    });
});

// 5. POST Route - Processes login forms to establish a secure session
app.post('/login', (req, res) => {
    const { loginUser } = req.body;
    
    if (loginUser && loginUser.trim() !== "") {
        // Saving the username directly into the server's private session allocation box
        req.session.loggedInUser = loginUser.trim();
    }
    res.redirect('/');
});

// 6. POST Route - Deploys a persistent client cookie tracker to remember user theme
app.post('/set-theme', (req, res) => {
    const { themeChoice } = req.body;
    
    // Dropping a persistent tracker setting directly into the user's hard drive space
    res.cookie('userTheme', themeChoice, { 
        maxAge: 1000 * 60 * 60 * 24, // Cookie stays alive inside browser memory for exactly 24 Hours
        httpOnly: true 
    });
    
    res.redirect('/');
});

// 7. GET Route - Performs a secure server logout (Tear down session)
app.get('/logout', (req, res) => {
    // Deleting the user data entry from the server storage systems
    req.session.destroy((err) => {
        if (err) {
            console.log("Error tearing down execution state context container:", err);
        }
        res.clearCookie('connect.sid'); // Erases the unique session tracking ID cookie out of the browser
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`[Server 12B Active]: System running smoothly at: http://localhost:${PORT}`);
});
