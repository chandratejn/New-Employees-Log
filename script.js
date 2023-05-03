let employees = [];
let id = 1;

const form = document.querySelector('form');
const addedEmployeesDiv = document.getElementById('addedEmployees');
const notificationDiv = document.getElementById('notification');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const empNameInput = document.getElementById('empname');
  const professionInput = document.getElementById('profession');
  const ageInput = document.getElementById('age');

  const empName = empNameInput.value.trim();
  const profession = professionInput.value.trim();
  const age = ageInput.value.trim();

  if (empName === '' || profession === '' || age === '') {
    notificationDiv.textContent = 'Error : Please Make sure All the fields are filled before adding in an employee !';
    notificationDiv.style.color = 'red';
  } else {
    const newEmployee = {
      id: id++,
      name: empName,
      profession: profession,
      age: age
    };

    employees.push(newEmployee);

    displayEmployees();
    clearInputs();

    notificationDiv.textContent = 'Success : Employee Added!';
    notificationDiv.style.color = 'green';
  }
});

function displayEmployees() {
  if (employees.length === 0) {
    notificationDiv.textContent = '';
    addedEmployeesDiv.innerHTML = `
      <h2>Added Employees</h2>
      <section><p>You have 0 Employees</p></section>
    `;
  } else {
    addedEmployeesDiv.innerHTML = `
      <h2>Added Employees</h2>
      ${employees.map((emp, index) => `
      <div class="newEmployee">
        <div class="employee">
          <p>${index + 1}.</p>
          <p>Name: ${emp.name}</p>
          <p>Profession: ${emp.profession}</p>
          <p>Age: ${emp.age}</p>
        </div>
        <button onclick="removeEmployee(${emp.id})">Delete User</button>
      </div>    
      `).join('')}
    `;
  }
}

function clearInputs() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.value = '');
}

function removeEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  updateEmployeesIds();
  displayEmployees();
}

function updateEmployeesIds() {
  employees.forEach((emp, index) => {
    emp.id = index + 1;
  });
}


function validateInput(input) {
  const pattern = /^[a-zA-Z.\- ]*$/;
  const value = input.value.trim();
  if (!pattern.test(value)) {
    input.value = value.replace(/[^a-zA-Z.\- ]/g, '');
  }
}

