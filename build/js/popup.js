document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(event.target);
    const username = formData.get('phone');
    const password = formData.get('passw');

    // Make an AJAX request to the server
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (!response.ok) {
        // If login fails, show a popup with the error message
        return response.json().then(data => {
          alert(data.message);
        });
      } else {
        // If login is successful, you might want to redirect or perform other actions
        console.log('Login successful');
      }
    })
    .catch(error => console.error('Error:', error));
  });