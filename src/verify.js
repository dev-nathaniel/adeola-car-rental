import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const email = urlParams.get('email');

// Check if token exists in localStorage
const localtoken = localStorage.getItem('token');
if (localtoken) {
    console.log('Token found:', localtoken);
    
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'none'
  document.getElementById('profile').style.display = 'block'
    // Redirect to a protected route or perform actions that require authentication
} else {
    // console.log('No token found. Redirecting to login...');
    // Redirect to login page
}

if (token) {
    document.getElementById('verifyText').textContent = `Congratulations! Your email has been verified.`;
    fetch(`https://adeola-car-rental-server.onrender.com/verifyemail`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationToken: token })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Invalid token');
        }
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userDetails', JSON.stringify(data.userDetails));
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Error verifying and validating token:', error);
    });
} else {
    console.log(email)
    document.getElementById('verifyText').textContent = `An email was sent to ${email}. Please confirm your email address to get started.`
}
