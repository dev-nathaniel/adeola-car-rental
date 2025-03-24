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
const emailInput = document.getElementById("email");
const errorMessageEmail = document.getElementById("emailError");
const submitButton = document.getElementById('submit-button')

document.getElementById("forgotForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form refresh

    const email = emailInput.value;

    // Clear previous error messages
    errorMessageEmail.textContent = '';

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
        return;
    }

    // Show loading animation
    // loadingIndicator.style.display = 'block'
    submitButton.textContent = 'Loading...'

    try {
        const response = await fetch("https://adeola-car-rental-server.onrender.com/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        // Hide loading animation
        // loadingIndicator.style.display = 'none'
        submitButton.textContent = 'Send Reset Email'
        const data = await response.json();


        if (response.ok) {
            // document.getElementById("message").textContent = "✅ Login Successful!";
            alert('Reset Password link sent')

            // const { accessToken, ...others } = data
            // if (!accessToken) {
            // localStorage.setItem('userDetails', JSON.stringify({...others}));
            //     window.location.href = '/twoFA.html'
            // } else {
            // localStorage.setItem('accessToken', accessToken);
            // localStorage.setItem('userDetails', JSON.stringify({...others}));
        // const checkingout = localStorage.getItem('checkingout')
        //     if (checkingout== true) {
        //         localStorage.setItem('checkingout', false)
        //         window.location.href = '/checkout'
        //     } else {
        //         localStorage.setItem('checkingout', false)
        //         window.location.href = '/'
        //     }
        //     }
        } else {
            alert(data.error)
            // document.getElementById("message").textContent = "❌ " + data.error;
        }

    } catch (error) {
        // document.getElementById("message").textContent = "❌ Error connecting to server.";
        
        // Hide loading animation
        // loadingIndicator.style.display = 'none'
        submitButton.textContent = 'Send Reset Email'
        console.error("forgot password Error:", error);
    }
});