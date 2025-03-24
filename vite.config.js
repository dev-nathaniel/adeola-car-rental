import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        cars: '/cars.html',
        login: '/login.html',
        signup: '/signup.html',
        extras: '/extras.html',
        checkout: '/checkout.html',
        upgrade: '/upgrade.html',
        verify: '/verify.html',
        mfa: '/twoFA.html',
        bookings: '/manageBookings.html',
        resetpassword: '/resetPassword.html',
        forgotpassword: '/forgotPassword.html'
      }
    }
  },
  plugins: [
    tailwindcss(),
  ],
})