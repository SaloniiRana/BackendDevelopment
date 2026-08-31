const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Configure the EJS View Template Engine pipeline
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Incoming Data Parsing Middleware
app.use(express.urlencoded({ extended: true })); // Parses Form submissions (POST data)
app.use(express.json());                         // Parses incoming JSON payloads

// 3. GET Route - Main UI Render (EJS Templating)
app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: "Experiment 12A: Framework Controller Hub",
        routeContext: "Standard Home Gateway",
        dynamicMessage: req.query.msg || "Server state is idle. Awaiting data package transmission.",
        extractedParams: null,
        postedData: null
    });
});

// 4. RESTful API Route with URL Parameters (e.g., /api/student/202605)
app.get('/api/student/:id', (req, res) => {
    const studentId = req.params.id;
    
    res.render('index', {
        pageTitle: "RESTful URL Parameters Parsed",
        routeContext: `GET Request via /api/student/${studentId}`,
        dynamicMessage: `Successfully captured parameters from the browser address line.`,
        extractedParams: { id: studentId, status: "Active Node Route" },
        postedData: null
    });
});

// 5. POST Route - Handles HTTP POST data payloads sent from the UI Form
app.post('/api/process-form', (req, res) => {
    const { developerName, projectType, frameworkUsed } = req.body;

    res.render('index', {
        pageTitle: "HTTP POST Data Unpacked",
        routeContext: "POST Request via /api/process-form",
        dynamicMessage: "Form submission pipeline executed successfully! Server memory state updated.",
        extractedParams: null,
        postedData: {
            dev: developerName || "Anonymous Developer",
            type: projectType || "Not Specified",
            tech: frameworkUsed || "Express.js",
            timestamp: new Date().toLocaleTimeString()
        }
    });
});

// 6. Start Server Engine Execution
app.listen(PORT, () => {
    console.log(`[Server Core Active]: Listening on pipeline path -> http://localhost:${PORT}`);
    console.log(`[Nodemon Daemon]: File system monitor tracking hot reloads automatically.`);
});
