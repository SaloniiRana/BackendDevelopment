const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded form data and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sample in-memory data
let tasks = [
    { id: 1, title: 'Set up Node.js and Express server', status: 'Completed' },
    { id: 2, title: 'Configure EJS view engine', status: 'Completed' },
    { id: 3, title: 'Test REST API routes and URL params', status: 'Pending' }
];

// 1. Home Route - Renders EJS page with all tasks
app.get('/', (req, res) => {
    res.render('index', {
        courseName: 'Backend Development Lab - Experiment 12',
        tasks: tasks
    });
});

// 2. URL Parameter Route - View a single task by ID
app.get('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).send('<h2>Task not found</h2><a href="/">Go Back</a>');
    }

    res.render('task', { task });
});

// 3. POST Route - Handle HTML form submission to add a new task
app.post('/add-task', (req, res) => {
    const { title, status } = req.body;

    if (title && title.trim() !== '') {
        const newTask = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title: title.trim(),
            status: status || 'Pending'
        };
        tasks.push(newTask);
    }

    res.redirect('/');
});

// 4. RESTful API Endpoints (JSON responses)
// GET all tasks
app.get('/api/tasks', (req, res) => {
    res.status(200).json({
        count: tasks.length,
        data: tasks
    });
});

// GET single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
});

// POST create a task via JSON API
app.post('/api/tasks', (req, res) => {
    const { title, status } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: title,
        status: status || 'Pending'
    };

    tasks.push(newTask);
    res.status(201).json({ message: 'Task created', task: newTask });
});

// DELETE a task by ID
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const deletedTask = tasks.splice(index, 1);
    res.status(200).json({ message: 'Task deleted', task: deletedTask[0] });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
