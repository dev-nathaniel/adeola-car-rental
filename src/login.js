import { createIcons, icons } from 'lucide';

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

eyeButton.addEventListener('click', ()=>{
    showPassword = !showPassword;
    changePasswordState()
})