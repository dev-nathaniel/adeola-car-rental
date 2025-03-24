import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

let showConfirm = false;
let showPassword = false;

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const id = urlParams.get('id');
const errorMessageConfirmPassword = document.getElementById("confirmPasswordError");
const errorMessagePassword = document.getElementById("passwordError");
const submitButton = document.getElementById('submit-button')

// Check if token exists in localStorage
const localtoken = localStorage.getItem('accessToken');
if (localtoken) {
    console.log('Token found:', localtoken);
    
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

const confirmEyeButton = document.getElementById('confirm-eye-button')
const eyeButton = document.getElementById('eye-button')
const confirmEye = document.getElementById('confirm-eye')
const eye = document.getElementById('eye')
const confirmEyeOff = document.getElementById('confirm-eye-off')
const eyeOff = document.getElementById('eye-off')
const confirmPassword = document.getElementById('confirmPassword')
const password = document.getElementById('password')

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

// Function to validate password
const isValidPassword = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/; // At least 8 characters, 1 letter, 1 number, 1 special character
  return passwordPattern.test(password);
};

document.getElementById("resetForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form refresh

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Clear previous error messages
  errorMessagePassword.textContent = '';
  errorMessageConfirmPassword.textContent = '';

  // Validate email and password
  let isValid = true;

  if (!isValidPassword(password)) {
      errorMessagePassword.textContent = 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.';
      isValid = false;
  }

  if (password !== confirmPassword) {
      errorMessageConfirmPassword.textContent = 'Passwords do not match'
      isValid = false;
  }

  // If validation fails, do not proceed
  if (!isValid) {
      errorMessagePassword.style.display = 'block'
      errorMessageConfirmPassword.style.display = 'block'
      return;
  }



  submitButton.textContent = 'Loading...'
  try {
      const response = await fetch("https://adeola-car-rental-server.onrender.com/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: password, id })
      });
      submitButton.textContent = 'Reset Password'

      const data = await response.json();

      if (response.ok) {
          // document.getElementById("message").textContent = "✅ Login Successful!";
          alert('Password has been reset')
          // console.log("User Data:", data);
          window.location.href = `/login`
      } else {
          alert(data.error)
          // document.getElementById("message").textContent = "❌ " + data.error;
      }

  } catch (error) {
      // document.getElementById("message").textContent = "❌ Error connecting to server.";
      submitButton.textContent = 'Reset Password'
      console.error("Password reset Error:", error);
  }
});