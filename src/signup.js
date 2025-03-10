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