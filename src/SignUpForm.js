import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

export const SignUpForm =
  `
    <div class="w-full max-w-6xl mx-auto px-6 py-8">
      <h1 class="text-3xl font-bold mb-10">Create an account</h1>
      
      <form class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div class="space-y-2">
          <label htmlFor="firstName" class="block font-medium">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            class="w-full h-12 px-4 border border-[#E2E8F0]"
          />
        </div>
        
        <div class="space-y-2">
          <label htmlFor="lastName" class="block font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            class="w-full h-12 px-4 border border-[#E2E8F0]"
          />
        </div>
        
        <div class="space-y-2">
          <label htmlFor="email" class="block font-medium">
            Email address
          </label>
          <input
            id="email"
            type="email"
            class="w-full h-12 px-4 border border-[#E2E8F0]"
          />
        </div>
        
        <div class="space-y-2">
          <label htmlFor="password" class="block font-medium">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              class="w-full h-12 px-4 border border-[#E2E8F0] pr-12"
            />
            <button
              type="button"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-rental-muted"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div class="space-y-2">
          <label htmlFor="confirmEmail" class="block font-medium">
            Confirm email address
          </label>
          <input
            id="confirmEmail"
            type="email"
            class="w-full h-12 px-4 border border-[#E2E8F0]"
          />
        </div>
        
        <div class="space-y-2">
          <label htmlFor="confirmPassword" class="block font-medium">
            Confirm password
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              class="w-full h-12 px-4 border border-[#E2E8F0] pr-12"
            />
            <button
              type="button"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-rental-muted"
            >
              <i data-lucide="eye-off"></i>
            </button>
          </div>
        </div>
        
        <div class="md:col-span-2 flex items-start space-x-2 mt-2">
          <input
            type="checkbox"
            id="terms"
            class="mt-1"
          />
          <label htmlFor="terms" class="text-sm">
            I agree to the{" "}
            <a to="/terms" class="text-rental-accent hover:underline">
              Terms of Use
            </a>
            {" "}&{" "}
            <a to="/privacy" class="text-rental-accent hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <div class="md:col-span-2 flex justify-between items-center mt-4">
          <button
            type="submit"
            class="bg-[#F6F6F7] hover:bg-[#E2E8F0] text-[#1A1F2C] font-medium py-3 px-6 rounded w-full md:w-auto md:min-w-[200px]"
          >
            Sign Up
          </button>
          
          <div class="hidden md:block text-sm">
            Already have an account?{" "}
            <a to="/login" class="text-rental-accent hover:underline">
              Login
            </a>
          </div>
        </div>
      </form>
      
      <div class="md:hidden text-sm text-center mt-6">
        Already have an account?{" "}
        <a to="/login" class="text-rental-accent hover:underline">
          Login
        </a>
      </div>
      
      <div class="divider my-12">
        <span class="px-4 text-rental-muted">or sign up with</span>
      </div>
      
      <div class="flex justify-center space-x-4">
        <button class="social-button">
          <span class="text-lg font-medium">G</span>
        </button>
        <button class="social-button">
          Apple
        </button>
        <button class="social-button">
          <i data-lucide='facebook' />
        </button>
      </div>
      
      <footer class="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-rental-muted">
        <div>Copyright 2025 Adeola</div>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a to="/terms" class="hover:text-[#1A1F2C]">
            Terms & Conditions
          </a>
          <span>|</span>
          <a to="/privacy" class="hover:text-[#1A1F2C]">
            Privacy
          </a>
          <span>|</span>
          <a to="/faqs" class="hover:text-[#1A1F2C]">
            FAQs
          </a>
        </div>
      </footer>
    </div>
    `
