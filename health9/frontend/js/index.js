document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    const response = await fetch('http://localhost:8000/api/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      window.location.href = data.redirect_url;  // Chuyển hướng đến trang Home
    } else {
      alert('Invalid credentials');
    }
  });