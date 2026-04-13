class Student {
  constructor(name, id, marks) {
    this.name = name;
    this.id = id;
    this.marks = marks;
  }
}

let students = [];

const form = document.getElementById("studentForm");
const displayBtn = document.getElementById("displayBtn");
const searchBtn = document.getElementById("searchBtn");
const avgBtn = document.getElementById("avgBtn");
const output = document.getElementById("output");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let id = document.getElementById("id").value;
  let marks = document.getElementById("marks").value;

  let student = new Student(name, id, marks);
  students.push(student);

  output.innerHTML = "Student Added!";
  form.reset();
});

displayBtn.addEventListener("click", function () {
  if (students.length === 0) {
    output.innerHTML = "No students available";
    return;
  }

  let data = "<h3>All Students</h3>";

  students.forEach((s) => {
    data += `• ${s.name} (ID: ${s.id}) - ${s.marks} marks <br>`;
  });

  output.innerHTML = data;
});

searchBtn.addEventListener("click", function () {
  let id = document.getElementById("searchId").value;

  let found = students.find((s) => s.id == id);

  if (found) {
    output.innerHTML = `Found: ${found.name} - ${found.marks} marks`;
  } else {
    output.innerHTML = "Not found";
  }
});

avgBtn.addEventListener("click", function () {
  if (students.length === 0) {
    output.innerHTML = "No data";
    return;
  }

  let total = students.reduce((sum, s) => sum + Number(s.marks), 0);
  let avg = total / students.length;

  output.innerHTML = `Average Marks: ${avg}`;
});
