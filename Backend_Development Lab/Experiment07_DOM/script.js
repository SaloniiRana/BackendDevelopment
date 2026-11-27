// Part A: ES6 (ECMAScript 2015) Features

// 1. Class & Inheritance
class Course {
    constructor(code, title) {
        this.code = code;
        this.title = title;
    }

    getDetails() {
        return `${this.code}: ${this.title}`;
    }
}

class LabCourse extends Course {
    constructor(code, title, credits = 2) { // Default parameter
        super(code, title);
        this.credits = credits;
    }
}

// 2. Async/Await with Promise
const fetchServerStatus = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve("ES6 Async Data Loaded Successfully"), 400);
    });
};

// Arrow Function demonstrating let, const, destructuring, spread/rest, and template literals
const runES6Demo = async () => {
    const lab = new LabCourse("CS302", "Backend Development Lab");

    // Object destructuring
    const { code, title, credits } = lab;

    // Spread & Rest operators
    const part1 = ["let/const", "Arrow Functions", "Template Literals"];
    const part2 = ["Destructuring", "Spread/Rest", "Classes", "Promises"];
    const allTopics = [...part1, ...part2];

    const countTopics = (...items) => items.length;
    const asyncMessage = await fetchServerStatus();

    const outputDiv = document.getElementById("es6Output");
    outputDiv.innerHTML = `
        <p><strong>Course Class:</strong> ${code} - ${title} (${credits} Credits)</p>
        <p><strong>Topics Covered (${countTopics(...allTopics)}):</strong> ${allTopics.join(", ")}</p>
        <p><strong>Async Status:</strong> ${asyncMessage}</p>
    `;
};

// Part B: DOM Selection, Content, Attributes & Style Manipulation
const updateContent = () => {
    const para = document.querySelector("#demoText");
    const link = document.getElementById("docLink");

    // Safe text modification using textContent
    para.textContent = "Text updated via document.querySelector() and textContent!";
    para.style.color = "#1e3a5f";
    para.style.fontWeight = "bold";

    // Attribute modification
    link.setAttribute("href", "https://example.com");
    link.textContent = "Updated Link (example.com)";
};

const toggleHighlight = () => {
    const domBox = document.getElementById("domBox");
    domBox.classList.toggle("highlight");
};

// Part C: Creating & Removing DOM Elements
let itemCounter = 3;

const addNode = () => {
    const list = document.getElementById("nodeList");
    const newItem = document.createElement("li");
    newItem.textContent = `Dynamically Created Node #${itemCounter++}`;
    list.appendChild(newItem);
};

const removeLastNode = () => {
    const list = document.getElementById("nodeList");
    if (list.lastElementChild) {
        list.removeChild(list.lastElementChild);
    }
};
