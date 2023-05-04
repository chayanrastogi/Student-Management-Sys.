let count = 0;
let students = [];

// Cache frequently used elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const gradeInput = document.getElementById('grade');
const degreeInput = document.getElementById('degree');
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('search');

function addStudent() {
  // Get input values
  const nameValue = nameInput.value;
  const emailValue = emailInput.value;
  const ageValue = ageInput.value;
  const gradeValue = gradeInput.value;
  const degreeValue = degreeInput.value;

  // Check for empty inputs
  if (!nameValue || !emailValue || !ageValue || !gradeValue || !degreeValue) {
    alert("All fields are required!");
    return;
  }

  // Increment ID and add student to array
  count++;
  students.push({ ID: count, name: nameValue, email: emailValue, age: ageValue, grade: gradeValue, degree: degreeValue });

  // Store the updated students array in local storage
  localStorage.setItem("students", JSON.stringify(students));

  // Clear the input fields
  nameInput.value = '';
  emailInput.value = '';
  ageInput.value = '';
  gradeInput.value = '';
  degreeInput.value = '';

  // Update table
  showTable();
}

function showTable() {
  // Remove existing table rows
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  // Create new table rows
  students.forEach((student) => {
    const row = document.createElement('tr');
    row.id = `row-${student.ID}`;

    Object.keys(student).forEach((key) => {
      const cell = document.createElement('td');
      cell.innerHTML = student[key];
      row.appendChild(cell);
    });

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('a');
    editButton.classList.add('fa');
    editButton.innerHTML = '&#xf044;';
    editButton.addEventListener('click', () => edit(student.ID));
    const deleteButton = document.createElement('a');
    deleteButton.classList.add('fa');
    deleteButton.innerHTML = '&#xf1f8;';
    deleteButton.addEventListener('click', () => del(student.ID));
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
  });
}

function search() {
  const filter = searchInput.value.toUpperCase();
  students.forEach((student) => {
    const row = document.getElementById(`row-${student.ID}`);
    const name = student.name.toUpperCase();
    const email = student.email.toUpperCase();
    const degree = student.degree.toUpperCase();
    if (name.includes(filter) || email.includes(filter) || degree.includes(filter)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function edit(id) {
  const student = students.find(s => s.ID === id);
  if (!student) {
    return;
  }
  nameInput.value = student.name;
  emailInput.value = student.email;
  ageInput.value = student.age;
  gradeInput.value = student.grade;
  degreeInput.value = student.degree;
}

function del(id) {
  const index = students.findIndex(s => s.ID === id);
  if (index === -1) {
    return;
  }
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  showTable();
}

// Load students from local storage on page load
const savedStudents = localStorage.getItem('students');
if (savedStudents) {
    students = JSON.parse(savedStudents);
    count = students.length;
    showTable();
    } else {
    students = [];
    }
