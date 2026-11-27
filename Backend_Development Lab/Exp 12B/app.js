const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data and cookies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure server-side session middleware
app.use(session({
    secret: 'lab12b_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15, // Session expires in 15 minutes
        httpOnly: true
    }
}));

// Middleware to protect dashboard route
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/');
}

// 1. Home / Login Route - Also tracks page visits using a Cookie
app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }

    // Read existing cookie or start at 1
    let visits = parseInt(req.cookies.visitCount || '0') + 1;
    res.cookie('visitCount', visits, { maxAge: 1000 * 60 * 60 * 24 }); // 24 hours

    const theme = req.cookies.theme || 'light';

    res.render('login', {
        error: null,
        visits: visits,
        theme: theme
    });
});

// 2. Login POST Route - Creates a Session for the user
app.post('/login', (req, res) => {
    const { username, role } = req.body;

    if (!username || username.trim() === '') {
        const visits = req.cookies.visitCount || 1;
        const theme = req.cookies.theme || 'light';
        return res.render('login', {
            error: 'Please enter a username to start a session.',
            visits: visits,
            theme: theme
        });
    }

    // Store user data in server-side session
    req.session.user = {
        username: username.trim(),
        role: role || 'Student',
        loginTime: new Date().toLocaleTimeString()
    };
    req.session.dashboardViews = 0;

    res.redirect('/dashboard');
});

// 3. Protected Dashboard Route - Reads Session and Cookie data
app.get('/dashboard', isAuthenticated, (req, res) => {
    req.session.dashboardViews += 1;
    const theme = req.cookies.theme || 'light';

    res.render('dashboard', {
        user: req.session.user,
        sessionID: req.sessionID,
        dashboardViews: req.session.dashboardViews,
        theme: theme
    });
});

// 4. Set Cookie Route - Saves user's theme preference in browser
app.post('/set-theme', (req, res) => {
    const selectedTheme = req.body.theme === 'dark' ? 'dark' : 'light';
    res.cookie('theme', selectedTheme, { maxAge: 1000 * 60 * 60 * 24 * 7 }); // 7 days
    res.redirect(req.session.user ? '/dashboard' : '/');
});

// 5. Clear Cookies Route
app.get('/clear-cookies', (req, res) => {
    res.clearCookie('visitCount');
    res.clearCookie('theme');
    res.redirect('/');
});

// 6. Logout Route - Destroys the server session
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
