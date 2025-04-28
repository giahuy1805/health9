async function fetchUserData() {
    const response = await fetch('http://localhost:8000/api/home/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Sử dụng token nếu có
      }
    });
  
    if (response.ok) {
      const data = await response.json();
      document.getElementById('username').textContent = data.user; // Hiển thị tên người dùng
    } else {
      alert('Failed to fetch user data. Redirecting to login.');
      window.location.href = 'index.html'; // Chuyển hướng về trang đăng nhập nếu không được phép
    }
  }
  
      // Logout functionality
      document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('token'); // Clear token if used
        window.location.href = 'index.html'; // Redirect to login
      });
  
      // Fetch user data on page load
      fetchUserData();