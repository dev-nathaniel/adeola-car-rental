import { createIcons, icons } from 'lucide';

//loading animation, proper error messages

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

let showPassword = false;

const password = document.getElementById('password')
const eyeButton = document.getElementById('eye-button')
const eye = document.getElementById('eye')
const eyeOff = document.getElementById('eye-off')

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

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form refresh

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // console.log(email, password)

    try {
        const response = await fetch("https://adeola-car-rental-server.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // document.getElementById("message").textContent = "✅ Login Successful!";
            alert('Logged in')

            const { accessToken, ...others } = data
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userDetails', JSON.stringify({...others}));
            window.location.href = '/twoFA.html'
        } else {
            alert(data.error)
            // document.getElementById("message").textContent = "❌ " + data.error;
        }

    } catch (error) {
        // document.getElementById("message").textContent = "❌ Error connecting to server.";
        console.error("Login Error:", error);
    }
});