# Experiment 15: Django To-Do Application

## Objective
To install, set up, and build a CRUD (Create, Read, Update, Delete) To-Do web application using the **Django** web framework and **SQLite** database.

## Architecture (MVT Pattern)
* **Model (`todo/models.py`):** Defines the `Task` database table (`title`, `completed`, `created_at`) using Django's ORM.
* **View (`todo/views.py`):** Handles HTTP requests and business logic for listing, adding, toggling completion status, and deleting tasks.
* **Template (`todo/templates/todo/`):** Renders dynamic HTML pages (`task_list.html` and `add_task.html`) using Django Template Language.

## Project Structure
```text
Experiment15_Django_Todo_App/
├── manage.py
├── requirements.txt
├── README.md
├── todo_project/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── todo/
    ├── models.py
    ├── views.py
    ├── urls.py
    ├── admin.py
    └── templates/
        └── todo/
            ├── task_list.html
            └── add_task.html
```

## Key `manage.py` Commands Used
* `python manage.py startapp todo` — Creates the `todo` application module.
* `python manage.py makemigrations todo` — Generates migration files from changes in `models.py`.
* `python manage.py migrate` — Applies migrations to create tables in `db.sqlite3`.
* `python manage.py runserver` — Starts the local Django development server.

## How to Run
1. Navigate to the project directory:
   ```bash
   cd "lab/Experiment15_Django_Todo_App"
   ```
2. Install Django:
   ```bash
   pip install -r requirements.txt
   ```
3. Run database migrations:
   ```bash
   python manage.py makemigrations todo
   python manage.py migrate
   ```
4. Start the server:
   ```bash
   python manage.py runserver
   ```
5. Open `http://127.0.0` in your web browser.
