import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

// Check if token exists in localStorage
const token = localStorage.getItem('token');
if (token) {
    console.log('Token found:', token);
    
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'none'
  document.getElementById('logout').style.display = 'block'
    // Redirect to a protected route or perform actions that require authentication
} else {
    // console.log('No token found. Redirecting to login...');
    // Redirect to login page
    
  document.getElementById('login').style.display = 'block';
  document.getElementById('signup').style.display = 'block'
  document.getElementById('logout').style.display = 'none'
}

// Add an event listener for form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Check if token exists in localStorage
    // const token = localStorage.getItem('token');
    if (!token) {
        // If no token, redirect to login page
        window.location.href = '/login';
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
            window.location.href = '/login';
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
                window.location.href = '/'; // Navigate back to home
            } else {
                alert('Please fill in all fields.');
            }
        }
    })
    .catch(error => {
        console.error('Error verifying token:', error);
        // window.location.href = '/login.html'; // Redirect to login on error
    });
});

// Function to handle logout
function handleLogout() {
    // Remove token and user details from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails'); // Assuming userDetails is stored under this key
    // window.location.href = '/login'; // Redirect to login page
}

// Add event listener for logout button
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    handleLogout(); // Call the logout function
});