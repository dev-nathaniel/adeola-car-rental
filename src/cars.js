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
}

// Retrieve data from localStorage
const pickupLocation = localStorage.getItem('pickupLocation');
const returnLocation = localStorage.getItem('returnLocation');
const pickupDate = localStorage.getItem('pickupDate');
const pickupTime = localStorage.getItem('pickupTime');
const returnDate = localStorage.getItem('returnDate');
const returnTime = localStorage.getItem('returnTime');

// Use the retrieved data (e.g., display it on the page)
console.log('Pickup Location:', pickupLocation);
console.log('Return Location:', returnLocation);
console.log('Pickup Date:', pickupDate);
console.log('Pickup Time:', pickupTime);
console.log('Return Date:', returnDate);
console.log('Return Time:', returnTime);

const date = document.getElementById('rentDate')
const location = document.getElementById('rentLocation')

date.textContent = `${pickupDate} - ${returnDate}`
location.textContent = `${pickupLocation} - ${returnLocation}`

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
    window.location.href = '/cars';
});