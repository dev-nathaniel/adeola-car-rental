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

confirmEyeButton.addEventListener('click', ()=>{
    showConfirm = !showConfirm;
    changeConfirmState()
})

eyeButton.addEventListener('click', ()=>{
    showPassword = !showPassword;
    changePasswordState()
})

document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form refresh

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmEmail = document.getElementById("confirmEmail").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (email !== confirmEmail) {
        alert('Emails do not match')
        return
    }

    if (password !== confirmPassword) {
        alert('passwords do not match')
        return
    }

    try {
        const response = await fetch("https://adeola-car-rental-server.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

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
        console.error("Sign up Error:", error);
    }
});