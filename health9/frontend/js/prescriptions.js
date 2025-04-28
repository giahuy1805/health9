// Fetch and display prescriptions
async function fetchPrescriptions() {
  const response = await fetch('http://localhost:8000/api/prescriptions/');
  const prescriptions = await response.json();
  const tableBody = document.querySelector('#prescription-table tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  prescriptions.forEach((prescription) => {
    const medicines = prescription.medicines
      .map(med => med.name)
      .join(', ');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${prescription.id}</td>
      <td>${prescription.patient_name}</td>
      <td>${prescription.doctor_name}</td>
      <td>${prescription.date}</td>
      <td>${medicines}</td>
      <td>
        <button onclick="editPrescription(${prescription.id}, '${prescription.patient_name}', '${prescription.doctor_name}', '${prescription.medicines.map(med => med.id).join(',')}')">Edit</button>
        <button onclick="deletePrescription(${prescription.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Fetch and populate medicines as checkboxes
async function fetchMedicines() {
  const response = await fetch('http://localhost:8000/api/medicines/');
  const medicines = await response.json();
  const medicineList = document.getElementById('medicine-list');
  medicineList.innerHTML = ''; // Clear existing options

  medicines.forEach((medicine) => {
    const div = document.createElement('div');
    div.classList.add('medicine-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `medicine-${medicine.id}`;
    checkbox.value = medicine.id;

    const label = document.createElement('label');
    label.htmlFor = `medicine-${medicine.id}`;
    label.textContent = `${medicine.name} (${medicine.quantity})`;

    div.appendChild(checkbox);
    div.appendChild(label);
    medicineList.appendChild(div);
  });
}

// Get selected medicines
function getSelectedMedicines() {
  const selectedCheckboxes = Array.from(document.querySelectorAll('#medicine-list input[type="checkbox"]:checked'));
  return selectedCheckboxes.map(checkbox => checkbox.value);
}

// Add or update prescription
document.getElementById('prescription-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('prescription-id').value;
  const patient_name = document.getElementById('patient-name').value;
  const doctor_name = document.getElementById('doctor-name').value;
  const selectedMedicines = getSelectedMedicines();

  const method = id ? 'PUT' : 'POST';
  const url = id
    ? `http://localhost:8000/api/prescriptions/${id}/`
    : 'http://localhost:8000/api/prescriptions/';

  await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patient_name,
      doctor_name,
      medicines: selectedMedicines,
    }),
  });

  document.getElementById('prescription-form').reset();
  fetchPrescriptions();
  fetchMedicines();
});

// Edit prescription
function editPrescription(id, patient_name, doctor_name, medicineIds) {
  document.getElementById('prescription-id').value = id;
  document.getElementById('patient-name').value = patient_name;
  document.getElementById('doctor-name').value = doctor_name;

  const selectedIds = medicineIds.split(',');
  const checkboxes = document.querySelectorAll('#medicine-list input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = selectedIds.includes(checkbox.value);
  });
}

// Delete prescription
async function deletePrescription(id) {
  await fetch(`http://localhost:8000/api/prescriptions/${id}/`, {
    method: 'DELETE',
  });
  fetchPrescriptions();
}

// Initial fetch
fetchPrescriptions();
fetchMedicines();