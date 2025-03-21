import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

let showConfirm = false;
let showPassword = false;

const confirmPassword = document.getElementById('confirmPassword')
const password = document.getElementById('password')
const confirmEyeButton = document.getElementById('confirm-eye-button')
const eyeButton = document.getElementById('eye-button')
const confirmEye = document.getElementById('confirm-eye')
const eye = document.getElementById('eye')
const confirmEyeOff = document.getElementById('confirm-eye-off')
const eyeOff = document.getElementById('eye-off')
const submitButton = document.getElementById('submit-button')
const errorMessageEmail = document.getElementById("emailError");
const errorMessagePassword = document.getElementById("passwordError");
const errorMessageLastName = document.getElementById("lastNameError");
const errorMessageFirstName = document.getElementById("firstNameError");
const errorMessageConfirmEmail = document.getElementById("confirmEmailError");
const errorMessageConfirmPassword = document.getElementById("confirmPasswordError");

errorMessageEmail.style.display = 'none';
errorMessagePassword.style.display = 'none';
errorMessageConfirmEmail.style.display = 'none';
errorMessageConfirmPassword.style.display = 'none';
errorMessageFirstName.style.display = 'none';
errorMessageLastName.style.display = 'none';

const changeConfirmState = () => {
    if (showConfirm) {
        confirmPassword.type = 'text'
        confirmEye.classList.remove('hidden')
        confirmEyeOff.classList.add('hidden')
    } else {
        confirmPassword.type = 'password'
        confirmEyeOff.classList.remove('hidden')
        confirmEye.classList.add('hidden')
    }
}

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

confirmEyeButton.addEventListener('click', () => {
    showConfirm = !showConfirm;
    changeConfirmState()
})

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

    return { deviceId, deviceName };
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

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form refresh

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmEmail = document.getElementById("confirmEmail").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    // Generate a unique device ID using a simple method (FingerprintJS is better)
    const { deviceId, deviceName } = await getDeviceInfo()

    // Clear previous error messages
    errorMessageEmail.textContent = '';
    errorMessagePassword.textContent = '';
    errorMessageConfirmEmail.textContent = '';
    errorMessageConfirmPassword.textContent = '';
    errorMessageFirstName.textContent = '';
    errorMessageLastName.textContent = '';

    // Validate email and password
    let isValid = true;

    if (firstName == '') {
        console.log('test')
        errorMessageFirstName.textContent = 'Please fill in you name'
        isValid = false;
    }

    if (lastName == '') {
        errorMessageLastName.textContent = 'Please fill in you name'
        isValid = false;
    }

    if (!isValidEmail(email)) {
        // console.log('test')
        errorMessageEmail.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (!isValidPassword(password)) {
        errorMessagePassword.textContent = 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.';
        isValid = false;
    }

    if (email !== confirmEmail) {
        errorMessageConfirmEmail.textContent = 'Emails do not match'
        isValid = false;
    }

    if (password !== confirmPassword) {
        errorMessageConfirmPassword.textContent = 'Passwords do not match'
        isValid = false;
    }

    // If validation fails, do not proceed
    if (!isValid) {
        errorMessageEmail.style.display = 'block'
        errorMessagePassword.style.display = 'block'
        errorMessageConfirmEmail.style.display = 'block'
        errorMessageConfirmPassword.style.display = 'block'
        errorMessageFirstName.style.display = 'block'
        errorMessageLastName.style.display = 'block'
        return;
    }



    submitButton.textContent = 'Loading...'
    try {
        const response = await fetch("https://adeola-car-rental-server.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password, deviceId, deviceName })
        });
        submitButton.textContent = 'Sign Up'

        const data = await response.json();

        if (response.ok) {
            // document.getElementById("message").textContent = "✅ Login Successful!";
            alert('Signed up')
            // console.log("User Data:", data);
            window.location.href = `/verify?email=${email}`
        } else {
            alert(data.error)
            // document.getElementById("message").textContent = "❌ " + data.error;
        }

    } catch (error) {
        // document.getElementById("message").textContent = "❌ Error connecting to server.";
        submitButton.textContent = 'Sign Up'
        console.error("Sign up Error:", error);
    }
});