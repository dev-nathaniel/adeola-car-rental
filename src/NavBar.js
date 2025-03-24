export const NavBar =
     `
        <header class="w-full py-4 px-6 md:px-12">
      <nav class="relative">
        <div class="flex justify-between items-center">
          <a to="/" class="font-medium">
            <div class="flex flex-col">
              <span class="text-lg font-bold">ADEOLA'S</span>
              <span class="text-sm">CAR RENTAL</span>
            </div>
          </a>
          
          
          <label htmlFor="menu-toggle" class="cursor-pointer lg:hidden">
            <i data-lucide='menu' class="h-6 w-6" />
          </label>
          <input type="checkbox" id="menu-toggle" class="hidden" />
          
          
          <div class="nav-links absolute left-0 right-0 top-full bg-white shadow-md lg:shadow-none lg:relative lg:top-auto lg:bg-transparent lg:flex lg:space-x-8">
            <a href="/manageBookings" class="block py-3 px-6 lg:px-0 hover:text-rental-accent border-b lg:border-b-0 transition-colors">
              Manage Bookings
            </a>
            <a href="/about" class="block py-3 px-6 lg:px-0 hover:text-rental-accent border-b lg:border-b-0 transition-colors">
              About
            </a>
            <a href="/contact" class="block py-3 px-6 lg:px-0 hover:text-rental-accent border-b lg:border-b-0 transition-colors">
              Contact
            </a>
            <a href="/login" class="block py-3 px-6 lg:px-0 hover:text-rental-accent border-b lg:border-b-0 transition-colors">
              Login
            </a>
            <a href="/signup" class="block py-3 px-6 lg:px-0 hover:text-rental-accent font-medium border-b lg:border-b-0 transition-colors">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </header>
    `
