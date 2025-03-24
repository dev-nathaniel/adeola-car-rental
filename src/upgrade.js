import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

// Check if token exists in localStorage
const token = localStorage.getItem('accessToken');
const selectedUpgrade = localStorage.getItem('selectedUpgrade');
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

// Example upgrade options
const upgradeOptions = [
  { id: 1, image: '/astra.jpeg', name: 'VAUXHALL ASTRA', improvement: 'More leg room', price: 7.30, seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol' },
  { id: 2, image: '/208.jpeg', name: 'PEUGEOT 208', improvement: 'Luxury', price: 10.30, seats: 5, doors: 5, transmission: 'Manual', fuel: 'Diesel' },
  { id: 3, image: '/mokka.jpeg', name: 'VAUXHALL MOKKA', improvement: 'Modern design', price: 12.30, seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol' },
];

// Function to populate upgrade options
const populateUpgradeOptions = () => {
  const upgradeContainer = document.querySelector('.upgrade-options'); // Ensure this matches your HTML structure

  upgradeOptions.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('upgradeItem', 'bg-gray-200', 'p-6', 'rounded');
    optionElement.setAttribute('data-upgrade-id', option.id);
    optionElement.innerHTML = `
            <div class="flex flex-col md:flex-row">
                    <div class="w-full md:w-1/4 mb-4 md:mb-0">
                      <div class="w-32 h-32 bg-gray-300 flex items-center justify-center mx-auto md:mx-0">
                        <div
                          class="relative w-full h-full pb-[100%]"
                        >
                          <div class="absolute inset-0">
                            <img
                            src=${option.image}
                            class="w-full h-full object-cover"
                          />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="w-full md:w-2/4">
                      <div class="flex items-center mb-2">
                        <h2 class="text-xl font-bold">${option.name}</h2>
                        <button class="ml-2 text-blue-500">
                          <i data-lucide="edit" size={16} ></i>
                        </button>
                      </div>
                      
                      <div class="flex flex-wrap mb-4">
                        <span class="mr-6">${option.seats} seats</span>
                        <span class="mr-6">${option.doors} doors</span>
                        <span class="mr-6">${option.transmission}</span>
                        <span>${option.fuel}</span>
                      </div>
                      
                      <div>
                        <h3 class="font-semibold mb-2">Improvements</h3>
                        <ul class="list-disc pl-5">

                            <li key={index}>${option.improvement}</li>

                        </ul>
                      </div>
                    </div>
                    
                    <div class="w-full md:w-1/4 flex flex-col items-center md:items-end justify-between mt-4 md:mt-0">
                      <div class="flex items-center">
                        <span class="text-[#1A1F2C] mr-1">More details</span>
                        <i data-lucide="chevron-down" size={16} class="text-[#1A1F2C]" ></i>
                      </div>
                      
                      <div class="mt-2 mb-4 text-right">
                        <div class="font-semibold">Additional Cost:</div>
                        <div class="text-xl font-bold">£${option.price}</div>
                      </div>
                      
                      <button 
                        data-upgrade-id=${option.id}
                        class="select-upgrade cursor-pointer px-6 py-2 border rounded bg-[#1A1F2C] text-white border-[#1A1F2C]" 
                      >
                        Upgrade
                      </button>
                    </div>
                  </div>
        `;
    upgradeContainer.appendChild(optionElement);
  });
};

// Call the function to populate the upgrade options
populateUpgradeOptions();

// Function to handle logout
function handleLogout() {
  // Remove token and user details from localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userDetails'); // Assuming userDetails is stored under this key
  // window.location.href = '/login'; // Redirect to login page
}

// Add event listener for logout button
document.getElementById('logout').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default link behavior
  handleLogout(); // Call the logout function
  window.location.href = '/upgrade';
});

document.querySelectorAll('.upgradeItem').forEach(upgradeItem => {
  const id = upgradeItem.getAttribute('data-upgrade-id')
  if (selectedUpgrade === id) {
    const upgradeButton = upgradeItem.querySelector('.select-upgrade')
    const totalPrice = document.getElementById('upgrade-total-price')
    upgradeButton.textContent = 'Selected'; // Change text to "Selected"
    totalPrice.textContent = `£${upgradeOptions.find((upgrade)=>upgrade.id == selectedUpgrade).price}`
  }
})

// Function to handle upgrade selection
const selectUpgrade = (event) => {
  let selectedUpgrade = localStorage.getItem('selectedUpgrade');
  event.preventDefault(); // Prevent default anchor behavior

  const upgradeId = event.target.getAttribute('data-upgrade-id');

  if (selectedUpgrade === upgradeId) {
    // If the car is already selected, deselect it
    localStorage.removeItem('selectedUpgrade');
    event.target.textContent = 'Upgrade'; // Change text back to "Select"
    const totalPrice = document.getElementById('upgrade-total-price')
    totalPrice.textContent = `£0.00`
  } else {
    // Select the new car
    localStorage.setItem('selectedUpgrade', upgradeId);
    // Update all car selection buttons to "Select"
    document.querySelectorAll('.select-upgrade').forEach(button => {
      button.textContent = 'Upgrade';
    });
    // Change the text of the selected car button
    event.target.textContent = 'Selected'; // Change text to "Selected"
   selectedUpgrade = localStorage.getItem('selectedUpgrade');
  const totalPrice = document.getElementById('upgrade-total-price')
    totalPrice.textContent = `£${upgradeOptions.find((upgrade)=>upgrade.id == selectedUpgrade).price}`

  }
};

// Add event listeners to all car selection buttons
document.querySelectorAll('.select-upgrade').forEach(button => {
  button.addEventListener('click', selectUpgrade);
});

