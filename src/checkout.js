import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

// Check if token exists in localStorage
const token = localStorage.getItem('token');
if (token) {
    console.log('Token found:', token);
    
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'none'
  document.getElementById('profile').style.display = 'block'
    // Redirect to a protected route or perform actions that require authentication
} else {
    // console.log('No token found. Redirecting to login...');
    // Redirect to login page
}

// Add an event listener for form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Check if token exists in localStorage
    // const token = localStorage.getItem('token');
    if (!token) {
        // If no token, redirect to login page
        window.location.href = '/login.html';
        return; // Exit the function
    }

    // Verify token before checking if all fields are filled
    // const token = localStorage.getItem('token');
    fetch('https://adeola-car-rental-server.onrender.com/verifytoken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            // If token is not valid, redirect to login page
            window.location.href = '/login.html';
        } else {
            // Check if all fields are filled
            const fields = [
                document.getElementById('cardNumber'),
                document.getElementById('expiryMonth'),
                document.getElementById('expiryYear'),
                document.getElementById('cvv'),
                document.getElementById('nameOnCard'),
                document.getElementById('country'),
                document.getElementById('address'),
                document.getElementById('city'),
                document.getElementById('postcode')
            ];

            const allFilled = fields.every(field => field.value.trim() !== '');

            if (allFilled) {
                alert('Successfully booked!');
                window.location.href = '/index.html'; // Navigate back to home
            } else {
                alert('Please fill in all fields.');
            }
        }
    })
    .catch(error => {
        console.error('Error verifying token:', error);
        window.location.href = '/login.html'; // Redirect to login on error
    });
});