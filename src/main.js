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

// Hardcoded suggestions for UK cities
const hardcodedLocations = [
    "London",
    "Birmingham",
    "Manchester",
    "Glasgow",
    "Liverpool",
    "Newcastle upon Tyne",
    "Sheffield",
    "Bristol",
    "Leeds",
    "Edinburgh",
    "Cardiff",
    "Nottingham",
    "Coventry",
    "Belfast",
    "Brighton",
    "Stoke-on-Trent",
    "Derby",
    "Wolverhampton",
    "Swansea",
    "Southampton"
];

const setupAutocomplete = (inputId, suggestionsId) => {
    const input = document.getElementById(inputId);
    const suggestionsContainer = document.getElementById(suggestionsId);

    // Set Tailwind CSS classes for the suggestions container
    suggestionsContainer.classList.add('max-h-48', 'overflow-y-auto', 'border', 'border-gray-300', 'rounded', 'shadow-lg');

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions

        // if (query.length < 3) {
        //     return; // Do not show suggestions if input is less than 3 characters
        // }

        // Filter hardcoded locations based on user input
        const filteredLocations = hardcodedLocations.filter(location => 
            location.toLowerCase().includes(query)
        );

        // Display filtered suggestions
        filteredLocations.forEach(location => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = location;
            suggestionItem.classList.add('suggestion-item', 'cursor-pointer', 'p-2', 'hover:bg-gray-200', 'transition-colors', 'bg-white', 'border-b', 'border-gray-300');
            suggestionItem.addEventListener('click', () => {
                input.value = location; // Fill input with selected suggestion
                suggestionsContainer.innerHTML = ''; // Clear suggestions
                input.blur(); // Remove focus from input to prevent typing
            });
            suggestionsContainer.appendChild(suggestionItem);
        });
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (event) => {
        if (!suggestionsContainer.contains(event.target) && event.target !== input) {
            suggestionsContainer.innerHTML = ''; // Clear suggestions
        }
    });
};

// Initialize autocomplete for both inputs
setupAutocomplete('pickup-location', 'pickup-suggestions');
setupAutocomplete('return-location', 'return-suggestions');

// Assuming you have the following variables for the date and time inputs
const pickupLocationInput = document.getElementById('pickup-location');
const returnLocationInput = document.getElementById('return-location');
const pickupDateInput = document.getElementById('pickup-date');
const pickupTimeInput = document.getElementById('pickup-time');
const returnDateInput = document.getElementById('return-date');
const returnTimeInput = document.getElementById('return-time');

// Function to validate all inputs
const validateInputs = () => {
    // Check if all fields are filled
    if (!pickupLocationInput.value || !returnLocationInput.value || 
        !pickupDateInput.value || !pickupTimeInput.value || 
        !returnDateInput.value || !returnTimeInput.value) {
        alert('Please fill in all fields.');
        return false;
    }

    // Validate pick-up date and time
    if (!validatePickupDateTime()) {
        return false; // If validation fails, stop further checks
    }

    // Validate return date and time
    return validateReturnDateTime();
};

// Function to validate pick-up date and time
const validatePickupDateTime = () => {
    const pickupDate = new Date(`${pickupDateInput.value}T${pickupTimeInput.value}`);
    const now = new Date();

    if (pickupDate < now) {
        alert('Pick-up date and time must be in the future.');
        return false;
    }

    return true;
};

// Function to validate return date and time
const validateReturnDateTime = () => {
    const pickupDate = new Date(`${pickupDateInput.value}T${pickupTimeInput.value}`);
    const returnDate = new Date(`${returnDateInput.value}T${returnTimeInput.value}`);

    // Check if return date and time are at least 2 hours after pickup date and time
    const twoHoursLater = new Date(pickupDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours in milliseconds

    if (returnDate <= pickupDate) {
        alert('Return date and time must be after the pick-up date and time.');
        return false;
    }

    if (returnDate < twoHoursLater) {
        alert('Return date and time must be at least 2 hours after the pick-up date and time.');
        return false;
    }

    return true;
};

// Add event listener for the "Find Cars" button
document.getElementById('find-cars').addEventListener('click', (event) => {
    // Prevent default navigation
    event.preventDefault();

    // Validate inputs
    if (validateInputs()) {
        // Store data in localStorage
        localStorage.setItem('pickupLocation', pickupLocationInput.value);
        localStorage.setItem('returnLocation', returnLocationInput.value);
        localStorage.setItem('pickupDate', pickupDateInput.value);
        localStorage.setItem('pickupTime', pickupTimeInput.value);
        localStorage.setItem('returnDate', returnDateInput.value);
        localStorage.setItem('returnTime', returnTimeInput.value);

        // Navigate to the cars page
        window.location.href = '/cars';
    }
});
