import { createIcons, icons } from 'lucide';


// Check if token exists in localStorage
const token = localStorage.getItem('accessToken');
const selectedExtra = localStorage.getItem('selectedExtra');
const selectedProtection = localStorage.getItem('selectedProtection');

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

// Function to populate protection options
const populateProtectionOptions = () => {
    const protectionContainer = document.querySelector('.protection-options'); // Ensure this matches your HTML structure

    protectionOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('protectionItem', 'bg-gray-200', 'p-4', 'rounded');
        optionElement.setAttribute('data-protection-id', option.id)
        optionElement.innerHTML = `
                  <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div class="mb-2 md:mb-0">
                      <h2 class="text-lg font-semibold">${option.name}</h2>
                    </div>
                    
                    <div class="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6">
                      <span class="font-medium">${typeof option.price === 'number' ? '£' + option.price : option.price}</span>
                      
                      <div class="flex items-center">
                        <span class="text-[#1A1F2C] mr-1">More details</span>
                        <i data-lucide="chevron-down" size={16} class="text-[#1A1F2C]" ></i>
                      </div>
                      
                      <button
                        data-protection-id=${option.id} 
                        class="select-protection flex items-center cursor-pointer bg-gray-300 hover:bg-gray-400 transition-colors px-4 py-2 rounded"
                      >
                        <i id='protectionButtonIcon-${option.id}' data-protection-id=${option.id} data-lucide="plus" size={16} class="mr-1" ></i>
                        <span id='protectionButtonText-${option.id}' data-protection-id=${option.id}>Add</span>
                      </button>
                    </div>
                  </div>
        `;
        protectionContainer.appendChild(optionElement);
    });
};

// Function to populate additional extras
const populateAdditionalExtras = () => {
    const extrasContainer = document.querySelector('.additional-extras'); // Ensure this matches your HTML structure

    additionalExtras.forEach(extra => {
        const extraElement = document.createElement('div');
        extraElement.classList.add('extraItem', 'bg-gray-200', 'p-4', 'rounded');
        extraElement.setAttribute('data-extra-id', extra.id);
        extraElement.innerHTML = `
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div class="mb-2 md:mb-0">
                      <h2 class="text-lg font-semibold">${extra.name}</h2>
                    </div>
                    
                    <div class="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6">
                      <span class="font-medium">£${extra.price} / day</span>
                      

                      <div class="flex items-center">
                        <span class="text-[#1A1F2C] mr-1">More details</span>
                        <i data-lucide="chevron-down" size={16} class="text-[#1A1F2C]" ></i>
                      </div>

                      <button data-extra-id=${extra.id} class="select-extra flex items-center cursor-pointer bg-gray-300 hover:bg-gray-400 transition-colors px-4 py-2 rounded">
                        <i id='extraButtonIcon-${extra.id}' data-extra-id=${extra.id} data-lucide="plus" size={16} class="mr-1" ></i>
                        <span id='extraButtonText-${extra.id}' data-extra-id=${extra.id}>Add</span>
                      </button>
                    </div>
                  </div>
        `;
        extrasContainer.appendChild(extraElement);
        console.log(extraElement.querySelector('button').getAttribute('data-extra-id'))
    });

    // Caution, this will import all the icons and bundle them.
    createIcons({ icons });
};

// Call the functions to populate the options
populateProtectionOptions();
populateAdditionalExtras();

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
    window.location.href = '/extras';
});

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

document.getElementById('reviewButton').addEventListener('click', function (event) {
    console.log('test')
    event.preventDefault(); // Prevent the default form submission

    // Check if token exists in localStorage
    // const token = localStorage.getItem('accessToken');
    if (!token) {
        // If no token, redirect to login page
        localStorage.setItem('checkingout', true)
        window.location.href = '/login';
        return; // Exit the function
    }

    document.getElementById('reviewButton').textContent = 'Loading...'

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
                document.getElementById('reviewButton').textContent = 'Review & Book'
        localStorage.setItem('checkingout', true)
        window.location.href = '/login';
            } else {
                document.getElementById('reviewButton').textContent = 'Review & Book'

                window.location.href = '/checkout'
                // Check if all fields are filled
                // const fields = [
                //     document.getElementById('cardNumber'),
                //     document.getElementById('expiryMonth'),
                //     document.getElementById('expiryYear'),
                //     document.getElementById('cvv'),
                //     document.getElementById('nameOnCard'),
                //     document.getElementById('country'),
                //     document.getElementById('address'),
                //     document.getElementById('city'),
                //     document.getElementById('postcode')
                // ];

                // const allFilled = fields.every(field => field.value.trim() !== '');

                // if (allFilled) {
                //     alert('Successfully booked!');
                //     window.location.href = '/'; // Navigate back to home
                // } else {
                //     alert('Please fill in all fields.');
                // }
            }
        })
        .catch(error => {
                document.getElementById('reviewButton').textContent = 'Review & Book'
                console.error('Error verifying token:', error);
            // window.location.href = '/login.html'; // Redirect to login on error
        });
});


document.querySelectorAll('.extraItem').forEach(extraItem => {
    const id = extraItem.getAttribute('data-extra-id')
    if (selectedExtra === id) {
        const extrabutton = extraItem.querySelector('.select-extra')
        extrabutton.querySelector('span').textContent = 'Added'; // Change text to "Selected"
        document.getElementById(`extraButtonIcon-${id}`).style.display = 'none'; // Remove the icon
    }
})

// Function to handle car selection
const selectExtra = (event) => {
    const selectedExtra = localStorage.getItem('selectedExtra');
    console.log('test')
    event.preventDefault(); // Prevent default anchor behavior

    const extraId = event.target.getAttribute('data-extra-id');
    console.log(selectedExtra)

    if (selectedExtra === extraId) {
        // If the car is already selected, deselect it
        localStorage.removeItem('selectedExtra');
        document.getElementById(`extraButtonText-${extraId}`).textContent = 'Add'; // Change text back to "Select"
        document.getElementById(`extraButtonIcon-${extraId}`).style.display = 'block'; // Add the icon back
    } else {
        // Select the new car
        console.log(extraId)
        localStorage.setItem('selectedExtra', extraId);
        // Update all car selection buttons to "Select"
        document.querySelectorAll('.select-extra').forEach(button => {
            button.querySelector('span').textContent = 'Add';
            button.querySelector('svg').style.display = 'block'; // Add the icon back
        });
        // Change the text of the selected car button
        document.getElementById(`extraButtonText-${extraId}`).textContent = 'Added'; // Change text to "Selected"
        document.getElementById(`extraButtonIcon-${extraId}`).style.display = 'none'; // Remove the icon
        // window.location.href = '/extras'
    }
};

// Add event listeners to all car selection buttons
document.querySelectorAll('.select-extra').forEach(button => {
    button.addEventListener('click', selectExtra);
    console.log(button)
});

document.querySelectorAll('.protectionItem').forEach(protectionItem => {
    const id = protectionItem.getAttribute('data-protection-id')
    if (selectedProtection === id) {
        const protectionButton = protectionItem.querySelector('.select-protection')
        protectionButton.querySelector('span').textContent = 'Added'; // Change text to "Selected"
        document.getElementById(`protectionButtonIcon-${id}`).style.display = 'none'; // Remove the icon
    }
})

// Function to handle car selection
const selectProtection = (event) => {
    const selectedProtection = localStorage.getItem('selectedProtection');
    console.log('test')
    event.preventDefault(); // Prevent default anchor behavior

    const protectionId = event.target.getAttribute('data-protection-id');
    console.log(selectedProtection)

    if (selectedProtection === protectionId) {
        // If the car is already selected, deselect it
        localStorage.removeItem('selectedProtection');
        document.getElementById(`protectionButtonText-${protectionId}`).textContent = 'Add'; // Change text back to "Select"
        document.getElementById(`protectionButtonIcon-${protectionId}`).style.display = 'block'; // Add the icon back
    } else {
        // Select the new car
        console.log(protectionId)
        localStorage.setItem('selectedProtection', protectionId);
        // Update all car selection buttons to "Select"
        document.querySelectorAll('.select-protection').forEach(button => {
            button.querySelector('span').textContent = 'Add';
            button.querySelector('svg').style.display = 'block'; // Add the icon back
        });
        // Change the text of the selected car button
        document.getElementById(`protectionButtonText-${protectionId}`).textContent = 'Added'; // Change text to "Selected"
        document.getElementById(`protectionButtonIcon-${protectionId}`).style.display = 'none'; // Remove the icon
        // window.location.href = '/extras'
    }
};

// Add event listeners to all car selection buttons
document.querySelectorAll('.select-protection').forEach(button => {
    button.addEventListener('click', selectProtection);
    console.log(button)
});
