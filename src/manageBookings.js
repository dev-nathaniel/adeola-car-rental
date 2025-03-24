import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

{/* <button class="cursor-pointer px-4 py-2 bg-[#F6F6F7] text-[#1A1F2C] rounded hover:bg-[#E2E8F0] transition-colors">
    Modify Booking
  </button> */}

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
    window.location.href = '/login'
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
  
  const cars = [
    { id: 1, name: 'MERCEDES A-CLASS', image: '/mercedes.jpg', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol', price: 69.50 },
    { id: 2, name: 'VAUXHALL CORSA', image: '/corsa.jpg', seats: 5, doors: 5, transmission: 'Manual', fuel: 'Petrol', price: 60.70 },
    { id: 3, name: 'RANGE ROVER', image: '/range.jpg', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Diesel', price: 80.00 },
    { id: 4, name: 'ROLLS ROYCE CULLINAN', image: '/rollsroyce.jpg', seats: 4, doors: 2, transmission: 'Automatic', fuel: 'Petrol', price: 150.00 },
    { id: 5, name: 'TESLA MODEL S', image: '/tesla.jpg', seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Electric', price: 100.00 },
    // Add more cars as needed
  ];
  
  const upgradeOptions = [
    { id: 1, image: '/astra.jpeg', name: 'VAUXHALL ASTRA', improvement: 'More leg room', price: 7.30, seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol' },
    { id: 2, image: '/208.jpeg', name: 'PEUGEOT 208', improvement: 'Luxury', price: 10.30, seats: 5, doors: 5, transmission: 'Manual', fuel: 'Diesel' },
    { id: 3, image: '/mokka.jpeg', name: 'VAUXHALL MOKKA', improvement: 'Modern design', price: 12.30, seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol' },
  ];
  


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
    window.location.href = '/manageBookings';
});

// Function to fetch bookings from the API
const fetchBookings = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('https://adeola-car-rental-server.onrender.com/bookings', { // Replace with your API URL
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            if (response.status === 403 || response.status === 401) {
                alert('Unauthorized access. Please login again.');
                window.location.href = '/login';
                return []; // Exit the function and return an empty array
            } else {
                throw new Error('Network response was not ok');
            }
        }
        const bookings = await response.json();
        console.log(bookings)
        return bookings;
    } catch (error) {
        console.log('Error fetching bookings:', error);
        alert('Failed to fetch bookings. Please try again.');
        fetchBookings(); // Attempt to fetch bookings again
        return []; // Return an empty array in case of error
    }
};

// Function to render bookings
const renderBookings = (bookings) => {
    const bookingsContainer = document.querySelector('.bookingsCont'); // Adjust selector as needed

    // Clear previous content
    bookingsContainer.innerHTML = '';

    if (bookings.length === 0) {
        // No bookings found, display the message
        bookingsContainer.innerHTML = `
            <div class="text-center py-16">
                <Car class="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 class="text-xl font-medium mb-2">No bookings found</h3>
                <p class="text-gray-500 mb-6">You haven't made any bookings yet.</p>
                <a href="/" class="px-6 py-3 bg-[#F6F6F7] text-[#1A1F2C] rounded-md hover:bg-[#E2E8F0] transition-colors">
                    Book a Car Now
                </a>
            </div>
        `;
    } else {
        // Wrap bookings in a container if there are bookings
        const bookingsWrapper = document.createElement('div');
        bookingsWrapper.className = 'space-y-6';

        // Map through bookings and create HTML for each booking
        bookings.forEach(booking => {
            const isCancelled = booking.status === 'cancelled'; // Adjust based on your status logic
            const car = cars.find((car)=>car.id == booking.carId)
            const upgrade = upgradeOptions.find((upgrade)=>upgrade.id == booking.upgradeId)
            const bookingElement = `
                <div class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/3 p-4">
          <img src=${car.image} alt=${car.name} class="w-full h-40 object-cover rounded" />
        </div>
        <div class="md:w-2/3 p-4">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold">${car.name}</h3>
            <span class='px-3 py-1 rounded-full text-xs font-medium  ${isCancelled ? 'text-red-600 bg-red-100' : 'text-green-800 bg-green-100'}'>
              ${booking.status}
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 mt-4">
            <div class="flex items-center space-x-2">
              <i data-lucide='calendar' class="h-4 w-4 text-rental-muted" ></i>
              <span class="text-sm">${new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div class="flex items-center space-x-2">
              <i data-lucide='map-pin' class="h-4 w-4 text-rental-muted" ></i>
              <span class="text-sm">${booking.locationPickUp}</span>
            </div>
            <div class="flex items-center space-x-2">
              <i data-lucide='user' class="h-4 w-4 text-rental-muted" ></i>
              <span class="text-sm">Booking #${booking._id}</span>
            </div>
            <div class="flex items-center space-x-2">
              <i data-lucide='credit-card' class="h-4 w-4 text-rental-muted"> </i>
              <span class="text-sm">${booking?.price}</span>
            </div>
          </div>
          
          <div class="mt-4 flex space-x-3">
          ${isCancelled ? `` :
              `<div>
                
                <button data-booking-id=${booking._id} id='cancelButton' class="cursor-pointer px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
                  Cancel
                </button>
              </div>`}
            <button class="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
            `;
            bookingsWrapper.insertAdjacentHTML('beforeend', bookingElement);
        });

        // Add the bookings wrapper to the bookings container
        bookingsContainer.appendChild(bookingsWrapper);
    }
};

// Function to cancel booking
const cancelBooking = async (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`https://adeola-car-rental-server.onrender.com/bookings/${bookingId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'cancelled' })
            });
            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }
            alert('Booking cancelled successfully.');
            location.reload();
        } catch (error) {
            console.log('Error canceling booking:', error);
            alert('Failed to cancel booking. Please try again.');
        }
    }
};

// Add event listener for cancel button
document.addEventListener('click', function(event) {
    if(event.target.id == 'cancelButton') {
        event.preventDefault();
        const bookingId = event.target.getAttribute('data-booking-id');
        cancelBooking(bookingId);
    }
});

// Initialize the page
const init = async () => {
    const bookings = await fetchBookings();
    renderBookings(bookings);
    createIcons({ icons });
};

// Call the init function to fetch and render bookings
init();


