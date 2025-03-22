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

const carId = localStorage.getItem('selectedCar')
const extraId = localStorage.getItem('selectedExtra')
const protectionId = localStorage.getItem('selectedProtection')
const upgradeId = localStorage.getItem('selectedUpgrade')

// Protection options
const protectionOptions = [
    { id: 1, name: 'Basic Protection', description: 'Included with reservation', price: 'Included with reservation' },
    { id: 2, name: 'Premium Protection', description: 'Covers all damages', price: 30.99 },
    { id: 3, name: 'Full Coverage', description: 'No excess on damages', price: 50.00 },
];

// Additional extras
const additionalExtras = [
    { id: 1, name: 'Additional Driver', description: 'Add another driver to your rental', price: 12.50 },
    { id: 2, name: 'GPS (SAT Nav)', description: 'Navigate easily with GPS', price: 7.00 },
    { id: 3, name: 'Child Seats', description: 'Ensure safety for your child', price: 10.99 },
];

const cars = [
    { id: 1, name: 'MERCEDES A-CLASS', image: '/path/to/suv-image.jpg', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol', price: 69.50 },
    { id: 2, name: 'VAUXHALL CORSA', image: '/path/to/sedan-image.jpg', seats: 5, doors: 5, transmission: 'Manual', fuel: 'Petrol', price: 60.70 },
    { id: 3, name: 'RANGE ROVER', image: '/path/to/hatchback-image.jpg', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Diesel', price: 80.00 },
    { id: 4, name: 'ROLLS ROYCE CULLINAN', image: '/path/to/convertible-image.jpg', seats: 4, doors: 2, transmission: 'Automatic', fuel: 'Petrol', price: 150.00 },
    { id: 5, name: 'TESLA MODEL S', image: '/path/to/tesla-image.jpg', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Electric', price: 100.00 },
    // Add more cars as needed
];

const upgradeOptions = [
    { id: 1, name: 'VAUXHALL ASTRA', improvement: 'More leg room', price: 7.30, seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol' },
    { id: 2, name: 'PEUGEOT 208', improvement: 'Luxury', price: 10.30, seats: 5, doors: 5, transmission: 'Manual', fuel: 'Diesel' },
    { id: 3, name: 'VAUXHALL MOKKA', improvement: 'Modern design', price: 12.30, seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol' },
  ];

//if they want to move to home page you can tell them it will be added to their cart

const populateCart = () => {
    const cartContainer = document.querySelector('.bookingContainer'); // Ensure this matches your HTML structure

        
        cartContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="flex space-x-4">
                  <div class="flex flex-col">
                    <div class="w-24 h-24 bg-gray-300 flex items-center justify-center mb-2">
                      <div class="w-full h-full flex items-center justify-center border border-gray-400">
                        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1" fill="none">
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                    <a 
                      href="/upgrade" 
                      class="w-24 text-rental-primary border border-rental-primary text-center py-1 text-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <i data-lucide="arrow-up-right" size={14} class="mr-1" ></i>
                      Upgrade
                  </a>
                  </div>
                  <div>
                    <div class="flex items-center">
                      <h2 class="text-lg font-bold">${upgradeId ? upgradeOptions.find((upgrade)=>upgrade.id == upgradeId)?.name : cars.find((car)=>car.id == carId)?.name}</h2>
                      <button class="ml-2 text-rental-primary">
                        <i data-lucide="edit" size={16} ></i>
                      </button>
                    </div>
                    <div class="text-sm mt-1">
                      <span>${upgradeId ? upgradeOptions.find((upgrade)=>upgrade.id == upgradeId)?.seats : cars.find((car)=>car.id == carId)?.seats} seats</span>
                      <span class="mx-2">•</span>
                      <span>${upgradeId ? upgradeOptions.find((upgrade)=>upgrade.id == upgradeId)?.doors : cars.find((car)=>car.id == carId)?.doors} doors</span>
                      <span class="mx-2">•</span>
                      <span>${upgradeId ? upgradeOptions.find((upgrade)=>upgrade.id == upgradeId)?.transmission : cars.find((car)=>car.id == carId)?.transmission}</span>
                      <span class="mx-2">•</span>
                      <span>${upgradeId ? upgradeOptions.find((upgrade)=>upgrade.id == upgradeId)?.fuel : cars.find((car)=>car.id == carId)?.fuel}</span>
                    </div>
                    
                    <div class="mt-4">
                      <div class="flex items-center">
                        <h3 class="font-medium">Extras</h3>
                        <button class="ml-2 text-rental-primary">
                          <i data-lucide="edit" size={16} ></i>
                        </button>
                      </div>
                      <ul class="mt-1">
                          <li key={index} class="flex items-center text-sm">
                            <span class="mr-2">•</span>
                            <span>${additionalExtras.find((extra)=>extra.id == extraId)?.name}</span>
                          </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div class="flex items-center mb-2">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" class="mr-2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span class="font-medium">Pick up</span>
                  </div>
                  <div class="flex items-center justify-between mb-1">
                    <div>
                      ${new Date(pickupDate).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric'})} • ${pickupTime}
                      <div>${pickupLocation}</div>
                    </div>
                    <button class="text-rental-primary">
                      <i data-lucide="edit" size={16} ></i>
                    </button>
                  </div>
                </div>
                
                <div>
                  <div class="flex items-center mb-2">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" class="mr-2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span class="font-medium">Return</span>
                  </div>
                  <div class="flex items-center justify-between mb-1">
                    <div>
                        ${new Date(returnDate).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })} • ${returnTime}
                      <div>${returnLocation}</div>
                    </div>
                    <button class="text-rental-primary">
                      <i data-lucide="edit" size={16} ></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end mt-4">
                <div class="flex items-center">
                  <span class="font-bold mr-4">Total:</span>
                  <span class="font-bold text-lg">£${cars.find((car)=>car.id == carId).price + additionalExtras.find((extra)=>extra.id == extraId).price + protectionOptions.find((protection)=>protection.id == protectionId).price + (upgradeId ? upgradeOptions.find((upgrade)=>upgrade.id == upgradeId).price : 0)}</span>
                </div>
              </div>
        `;
    

    // Caution, this will import all the icons and bundle them.
    createIcons({ icons });
};

populateCart()

// Add an event listener for form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Check if token exists in localStorage
    // const token = localStorage.getItem('accessToken');
    if (!token) {
        // If no token, redirect to login page
        localStorage.setItem('checkingout', true)
        window.location.href = '/login';
        return; // Exit the function
    }

    // Verify token before checking if all fields are filled
    // const token = localStorage.getItem('accessToken');
    fetch('https://adeola-car-rental-server.onrender.com/verifytoken', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            // If token is not valid, redirect to login page
        localStorage.setItem('checkingout', true)
        alert('You need to sign in to checkout, your order will be saved')
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
        localStorage.setItem('checkingout', false)
        localStorage.removeItem('selectedCar')
        localStorage.removeItem('selectedExtra')
        localStorage.removeItem('selectedProtection')
        localStorage.removeItem('selectedUpgrade')
       localStorage.removeItem('pickupLocation');
localStorage.removeItem('returnLocation');
localStorage.removeItem('pickupDate');
localStorage.removeItem('pickupTime');
localStorage.removeItem('returnDate');
localStorage.removeItem('returnTime');
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails'); // Assuming userDetails is stored under this key
    // window.location.href = '/login'; // Redirect to login page
}

// Add event listener for logout button
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    handleLogout(); // Call the logout function
        window.location.href = '/checkout';
});

// Add beforeunload event listener to show alert when leaving the page
window.addEventListener('beforeunload', (event) => {
    // Set a custom message (note: most browsers ignore this message)
    const message = 'Are you sure you want to leave this page? Your changes may not be saved.';
    event.returnValue = message; // For most browsers
    return message; // For some older browsers
});

// Add unload event listener to perform actions when the user leaves the page
// window.addEventListener('unload', (event) => {
//     // Perform any cleanup or save actions here
//     localStorage.removeItem('selectedCar')
//         localStorage.removeItem('selectedExtra')
//         localStorage.removeItem('selectedProtection')
//         localStorage.removeItem('selectedUpgrade')
//        localStorage.removeItem('pickupLocation');
// localStorage.removeItem('returnLocation');
// localStorage.removeItem('pickupDate');
// localStorage.removeItem('pickupTime');
// localStorage.removeItem('returnDate');
// localStorage.removeItem('returnTime');
//     console.log('User is leaving the page. Perform cleanup here.');
//     // Note: You cannot use asynchronous operations here
// });