import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const id = urlParams.get('id');
const email = urlParams.get('email');

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

if (token) {
    document.getElementById('verifyText').textContent = `Verifying Your email......`;
    fetch(`https://adeola-car-rental-server.onrender.com/verifyemail`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, verificationToken: token })
    })
    .then(async response => {
        if (response.ok) {
            return response.json();
        } else {
            const res = await response.json()
            if (res.error == "User already verified!") {
            alert(res.error)
            document.getElementById('verifyText').textContent = `Congratulations! Your email has been verified.`;
                window.location.href = '/'
            }
            alert(res.error)
            console.error('Invalid token');
        }
    })
    .then(data => {
        document.getElementById('verifyText').textContent = `Congratulations! Your email has been verified.`;
        const {accessToken, ...others} = data
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userDetails', JSON.stringify({...others}));
            alert("Your email has been verified")
            window.location.href = '/';
    })
    .catch(error => {
        console.error('Error verifying and validating token:', error);
    });
} else {
    console.log(email)
    document.getElementById('verifyText').textContent = `An email was sent to ${email}. Please confirm your email address to get started.`
}


// Function to handle logout
function handleLogout() {
    // Remove token and user details from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails'); // Assuming userDetails is stored under this key
    // window.location.href = '/login'; // Redirect to login page
}

// Add event listener for logout button
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    handleLogout(); // Call the logout function
    window.location.href = '/verify';
});