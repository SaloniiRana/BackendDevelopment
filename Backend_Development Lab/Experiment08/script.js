// 1. Form Submit Event (preventDefault)
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.className = "task-item";

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
});

// 2. Event Delegation on Parent <ul> (handles both toggle complete and delete)
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const listItem = event.target.closest("li");
        listItem.remove();
    } else if (event.target.tagName === "SPAN") {
        event.target.classList.toggle("completed");
    }
});

// 3. Input & Keydown Events
const liveInput = document.getElementById("liveInput");
const charCount = document.getElementById("charCount");
const lastKey = document.getElementById("lastKey");

liveInput.addEventListener("input", () => {
    charCount.textContent = liveInput.value.length;
});

liveInput.addEventListener("keydown", (event) => {
    lastKey.textContent = event.key;
});

// 4. Mouse Events
const hoverBox = document.getElementById("hoverBox");

hoverBox.addEventListener("mouseenter", () => {
    hoverBox.style.backgroundColor = "#bfdbfe";
    hoverBox.textContent = "Mouse entered! Double-click to reset.";
});

hoverBox.addEventListener("mouseleave", () => {
    hoverBox.style.backgroundColor = "#e2e8f0";
    hoverBox.textContent = "Hover over me or double-click me!";
});

hoverBox.addEventListener("dblclick", () => {
    hoverBox.style.backgroundColor = "#bbf7d0";
    hoverBox.textContent = "Double-click event triggered!";
});
