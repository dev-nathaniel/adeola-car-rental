import { createIcons, icons } from 'lucide';

//loading animation, proper error messages

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

let showPassword = false;

const password = document.getElementById('password')
const eyeButton = document.getElementById('eye-button')
const eye = document.getElementById('eye')
const eyeOff = document.getElementById('eye-off')
const loadingIndicator = document.getElementById('loading')
const submitButton = document.getElementById('submit-button')
const emailInput = document.getElementById("email");
const errorMessageEmail = document.getElementById("emailError");
const errorMessagePassword = document.getElementById("passwordError");

errorMessageEmail.style.display = 'none';
errorMessagePassword.style.display = 'none';


const changePasswordState = () => {
    if (showPassword) {
        password.type = 'text'
        eye.classList.remove('hidden')
        eyeOff.classList.add('hidden')
    } else {
        password.type = 'password'
        eyeOff.classList.remove('hidden')
        eye.classList.add('hidden')
    }
}

eyeButton.addEventListener('click', () => {
    showPassword = !showPassword;
    changePasswordState()
})

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

// Function to validate email
const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    return emailPattern.test(email);
};

// Function to validate password
const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/; // At least 8 characters, 1 letter, 1 number, 1 special character
    return passwordPattern.test(password);
};

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form refresh

    const email = emailInput.value;
    const passwordValue = password.value;
    const {deviceId, deviceName} = await getDeviceInfo()

    // Clear previous error messages
    errorMessageEmail.textContent = '';
    errorMessagePassword.textContent = '';

    // Validate email and password
    let isValid = true;

    // if (!isValidEmail(email)) {
    //     console.log('test')
    //     errorMessageEmail.textContent = 'Please enter a valid email address.';
    //     isValid = false;
    // }

    // if (!isValidPassword(passwordValue)) {
    //     errorMessagePassword.textContent = 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.';
    //     isValid = false;
    // }

    // If validation fails, do not proceed
    if (!isValid) {
        errorMessageEmail.style.display = 'block'
        errorMessagePassword.style.display = 'block'
        return;
    }

    // Show loading animation
    // loadingIndicator.style.display = 'block'
    submitButton.textContent = 'Loading...'

    try {
        const response = await fetch("https://adeola-car-rental-server.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: passwordValue, deviceId })
        });

        // Hide loading animation
        // loadingIndicator.style.display = 'none'
        submitButton.textContent = 'Login'
        const data = await response.json();


        if (response.ok) {
            // document.getElementById("message").textContent = "✅ Login Successful!";
            alert('Logged in')

            const { accessToken, ...others } = data
            if (!accessToken) {
            localStorage.setItem('userDetails', JSON.stringify({...others}));
                window.location.href = '/twoFA'
            } else {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userDetails', JSON.stringify({...others}));
        const checkingout = localStorage.getItem('checkingout')
            if (checkingout== true) {
                localStorage.setItem('checkingout', false)
                window.location.href = '/checkout'
            } else {
                localStorage.setItem('checkingout', false)
                window.location.href = '/'
            }
            }
        } else {
            alert(data.error)
            // document.getElementById("message").textContent = "❌ " + data.error;
        }

    } catch (error) {
        // document.getElementById("message").textContent = "❌ Error connecting to server.";
        
        // Hide loading animation
        // loadingIndicator.style.display = 'none'
        submitButton.textContent = 'Login'
        console.error("Login Error:", error);
    }
});