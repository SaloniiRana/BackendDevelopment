// 1. Array of Student Objects (Data Structure Implementation)
let students = [
    { rollNo: 101, name: "Aarav Sharma", course: "B.Tech CSE", marks: 88 },
    { rollNo: 102, name: "Priya Verma", course: "B.Tech IT", marks: 92 },
    { rollNo: 103, name: "Rohan Gupta", course: "B.Tech CSE", marks: 64 },
    { rollNo: 104, name: "Sneha Nair", course: "BCA", marks: 79 }
];

// 2. Function Declaration: Calculate Grade based on marks
function calculateGrade(marks) {
    if (marks >= 90) return "A+";
    if (marks >= 75) return "A";
    if (marks >= 60) return "B";
    if (marks >= 40) return "C";
    return "F";
}

// 3. Arrow Function: Calculate Class Average using Array.reduce()
const getAverageMarks = (studentList) => {
    if (studentList.length === 0) return 0;
    const total = studentList.reduce((sum, student) => sum + student.marks, 0);
    return (total / studentList.length).toFixed(2);
};

// 4. Render Array of Objects into HTML Table
function renderTable(dataList) {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    dataList.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>${calculateGrade(student.marks)}</td>
            <td><button onclick="deleteStudent(${student.rollNo})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });

    updateSummary(dataList);
}

// 5. Update Summary Stats
function updateSummary(dataList) {
    const summaryBox = document.getElementById("summaryBox");
    const avg = getAverageMarks(dataList);
    summaryBox.textContent = `Showing ${dataList.length} student(s) | Average Marks: ${avg}`;
}

// 6. Add a New Student Object to the Array (push)
document.getElementById("studentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const course = document.getElementById("courseInput").value.trim();
    const marks = Number(document.getElementById("marksInput").value);

    const nextRollNo = students.length > 0 ? students[students.length - 1].rollNo + 1 : 101;

    const newStudent = {
        rollNo: nextRollNo,
        name: name,
        course: course,
        marks: marks
    };

    students.push(newStudent);
    this.reset();
    renderTable(students);
});

// 7. Filter Students with Marks >= 75 (filter)
function filterTopScorers() {
    const topStudents = students.filter((student) => student.marks >= 75);
    renderTable(topStudents);
}

// 8. Sort Students by Marks Descending (sort)
function sortByMarks() {
    const sorted = [...students].sort((a, b) => b.marks - a.marks);
    renderTable(sorted);
}

// 9. Apply +5 Grace Marks capped at 100 (map)
function addGraceMarks() {
    students = students.map((student) => {
        return {
            ...student,
            marks: Math.min(100, student.marks + 5)
        };
    });
    renderTable(students);
}

// 10. Delete Student by Roll Number (findIndex & splice)
function deleteStudent(rollNo) {
    const index = students.findIndex((student) => student.rollNo === rollNo);
    if (index !== -1) {
        students.splice(index, 1);
        renderTable(students);
    }
}

// Reset View to Full Array
function showAllStudents() {
    renderTable(students);
}

// Initial render on page load
renderTable(students);
