import { createIcons, icons } from 'lucide';

//loading animation, proper error messages

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

const userDetails = localStorage.getItem('userDetails');
const getDeviceInfo = async () => {
    let deviceName = "Unknown Device";
    let deviceId = "default-id";

    if (navigator.userAgentData) {
      const brands = navigator.userAgentData.brands.map(b => b.brand + " " + b.version).join(", ");
      const platform = navigator.userAgentData.platform;
      deviceName = `${platform} - ${brands}`;
      deviceId = btoa(`${platform}-${brands}`); // Base64 encode for uniqueness
    } else {
      // Fallback for older browsers
      deviceName = navigator.userAgent;
      deviceId = btoa(navigator.userAgent);
    }

    return {deviceId, deviceName};
  };

// Function to handle the input of the 6-digit code
const inputs = document.querySelectorAll('input[type="text"]'); // Select all input fields
const form = document.querySelector('form'); // Select the form element

inputs.forEach((input, index) => {
    input.addEventListener('input', (event) => {
        // Move to the next input if the current one is filled
        if (event.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }

        // Check if all inputs are filled before submitting
        // const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        // if (allFilled) {
        //     submitCode();
        // }
    });

    // Optional: Handle backspace to move to the previous input
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// Add event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Check if all inputs are filled
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    if (allFilled) {
        submitCode(); // Call the function to submit the code
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to submit the code to the API
async function submitCode() {
    const code = Array.from(inputs).map(input => input.value).join(''); // Join all input values
    const {deviceId, deviceName} = await getDeviceInfo()
    const user = JSON.parse(userDetails)
    const id = user._id
    fetch('https://adeola-car-rental-server.onrender.com/verifydevice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, code, deviceId, deviceName }) // Send the code as JSON
    })
    .then(async response => {
        if (response.ok) {
            // Handle successful verification
            alert('Device verified successfully!');
            // Redirect or perform other actions as needed
            const { accessToken, ...others } = await response.json()
            localStorage.setItem('accessToken', accessToken);
        const checkingout = localStorage.getItem('checkingout')
        if (checkingout) {
            window.location.href = '/checkout'
        } else {
            window.location.href = '/'
        }
        } else {
            // Handle error response
            alert('Verification failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error verifying device:', error);
        alert('An error occurred. Please try again.');
    });
}