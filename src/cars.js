import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

// Check if token exists in localStorage
const token = localStorage.getItem('accessToken');
const selectedCar = localStorage.getItem('selectedCar');

if (token) {
    console.log('Token found:', token);
    
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'none'
  document.getElementById('logout').style.display = 'block'
    // Redirect to a protected route or perform actions that require authentication
} else {
    document.getElementById('login').style.display = 'block';
    document.getElementById('signup').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
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



const cars = [
    { id: 1, name: 'MERCEDES A-CLASS', image: '/mercedes.jpg', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol', price: 69.50 },
    { id: 2, name: 'VAUXHALL CORSA', image: '/corsa.jpg', seats: 5, doors: 5, transmission: 'Manual', fuel: 'Petrol', price: 60.70 },
    { id: 3, name: 'RANGE ROVER', image: '/range.jpg', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Diesel', price: 80.00 },
    { id: 4, name: 'ROLLS ROYCE CULLINAN', image: '/rollsroyce.jpg', seats: 4, doors: 2, transmission: 'Automatic', fuel: 'Petrol', price: 150.00 },
    { id: 5, name: 'TESLA MODEL S', image: '/tesla.jpg', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Electric', price: 100.00 },
    // Add more cars as needed
];

// Function to populate the car list
const populateCarList = () => {
    const carListContainer = document.querySelector('.car-list'); // Ensure this matches your HTML structure
    cars.forEach(car => {
        console.log(car)
        const carElement = document.createElement('div');
        carElement.classList.add('carItem', 'bg-gray-200', 'p-6', 'rounded');
        carElement.setAttribute('data-car-id', car.id);
        carElement.innerHTML = `
            <div class="flex flex-col md:flex-row justify-between">
                <div class="flex flex-col md:flex-row">
                  <div class="w-full md:w-48 h-48 bg-white flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                    <img src=${car.image} alt="model" class="w-full h-full object-contain p-4" />
                  </div>

                  <div>
                    <h2 class="text-xl font-bold text-[#1A1F2C] mb-4">${car.name}</h2>
                    <div class="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                      <span>${car.seats} seats</span>
                      <span>${car.doors} doors</span>
                      <span>${car.transmission}</span>
                      <span>${car.fuel}</span>
                    </div>
                    <button class="text-[#1A1F2C] font-medium flex items-center">
                      <span>More details</span>
                      <i data-lucide="chevron-down" size={16} class="ml-1"></i>
                    </button>
                  </div>
                </div>

                <div class="mt-6 md:mt-0 flex flex-col items-end">
                  <div class="text-xl font-bold mb-4">£${car.price} / day</div>
                  <a href="/extras"
                    data-car-id=${car.id}
                    class="select-car bg-gray-300 text-[#1A1F2C] px-6 py-3 rounded hover:bg-gray-400 transition-colors">
                    Select
                  </a>
                </div>
              </div>
        `;
        carListContainer.appendChild(carElement);
    });
};
// Call the function to populate the car list
populateCarList();

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

document.querySelectorAll('.carItem').forEach(carItem => {
    const id = carItem.getAttribute('data-car-id')
    if (selectedCar === id) {
        const carbutton = carItem.querySelector('.select-car')
        carbutton.textContent = 'Selected'; // Change text to "Selected"
    }
})

// Function to handle car selection
const selectCar = (event) => {
const selectedCar = localStorage.getItem('selectedCar');
event.preventDefault(); // Prevent default anchor behavior

    const carId = event.target.getAttribute('data-car-id');

    if (selectedCar === carId) {
        // If the car is already selected, deselect it
        localStorage.removeItem('selectedCar');
        event.target.textContent = 'Select'; // Change text back to "Select"
    } else {
        // Select the new car
        localStorage.setItem('selectedCar', carId);
        // Update all car selection buttons to "Select"
        document.querySelectorAll('.select-car').forEach(button => {
            button.textContent = 'Select';
        });
        // Change the text of the selected car button
        event.target.textContent = 'Selected'; // Change text to "Selected"
        window.location.href = '/extras'
    }
};

// Add event listeners to all car selection buttons
document.querySelectorAll('.select-car').forEach(button => {
    button.addEventListener('click', selectCar);
});