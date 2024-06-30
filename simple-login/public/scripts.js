// public/scripts.js
async function loginUser() {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      if (data.message === 'Login successful') {
        window.location.href = 'CSE499SeniorProject/SaveMyPlants/main-index.html'; // Redirect to dashboard or home page
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      const messageElement = document.getElementById('message');
      messageElement.textContent = error.message;
    }
  }
  