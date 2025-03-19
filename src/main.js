import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });


// Check if token exists in localStorage
const token = localStorage.getItem('accessToken');
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

// setupCounter(document.querySelector('#counter'))


// Function to handle logout
function handleLogout() {
    // Remove token and user details from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails'); // Assuming userDetails is stored under this key
    // window.location.href = '/login'; // Redirect to login page
}

// Add event listener for logout button
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    handleLogout(); // Call the logout function
    window.location.href = '/';
});