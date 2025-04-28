// Fetch and display medicines
async function fetchMedicines() {
  const response = await fetch('http://localhost:8000/api/medicines/');
  const medicines = await response.json();
  const tableBody = document.querySelector('#medicine-table tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  medicines.forEach((medicine) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${medicine.id}</td>
      <td>${medicine.name}</td>
      <td>${medicine.description}</td>
      <td>${medicine.quantity}</td>
      <td>
        <button onclick="editMedicine(${medicine.id}, '${medicine.name}', '${medicine.description}', ${medicine.quantity})">Edit</button>
        <button onclick="deleteMedicine(${medicine.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add or update medicine
document.getElementById('medicine-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('medicine-id').value;
  const name = document.getElementById('medicine-name').value;
  const description = document.getElementById('medicine-description').value;
  const quantity = document.getElementById('medicine-quantity').value;

  const method = id ? 'PUT' : 'POST';
  const url = id
    ? `http://localhost:8000/api/medicines/${id}/`
    : 'http://localhost:8000/api/medicines/';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, quantity }),
  });

  if (response.ok) {
    document.getElementById('medicine-form').reset();
    fetchMedicines();
  } else {
    const errorData = await response.json();
    console.error('Error:', errorData);
    alert('Failed to save medicine: ' + JSON.stringify(errorData));
  }
});

// Edit medicine
function editMedicine(id, name, description, quantity) {
  document.getElementById('medicine-id').value = id;
  document.getElementById('medicine-name').value = name;
  document.getElementById('medicine-description').value = description;
  document.getElementById('medicine-quantity').value = quantity;
}

// Delete medicine
async function deleteMedicine(id) {
  await fetch(`http://localhost:8000/api/medicines/${id}/`, {
    method: 'DELETE',
  });
  fetchMedicines();
}

// Initial fetch
fetchMedicines();