// Handle registration
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:8000/api/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert('Registration successful!');
      window.location.href = 'index.html';
    } else {
      alert('Registration failed!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});




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
        <td>
          <button onclick="editMedicine(${medicine.id}, '${medicine.name}', '${medicine.description}')">Edit</button>
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
  
    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:8000/api/medicines/${id}/`
      : 'http://localhost:8000/api/medicines/';
  
    await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
  
    document.getElementById('medicine-form').reset();
    fetchMedicines();
  });
  
  // Delete medicine
  async function deleteMedicine(id) {
    await fetch(`http://localhost:8000/api/medicines/${id}/`, {
      method: 'DELETE',
    });
    fetchMedicines();
  }
  
  // Edit medicine
  function editMedicine(id, name, description) {
    document.getElementById('medicine-id').value = id;
    document.getElementById('medicine-name').value = name;
    document.getElementById('medicine-description').value = description;
  }
  
  // Initial fetch
  fetchMedicines();

