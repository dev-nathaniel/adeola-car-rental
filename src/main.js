import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

// document.querySelector('#app').innerHTML = `
//   <div className="min-h-screen flex flex-col">
//       ${NavBar}
//       <main className="flex-1 flex flex-col items-center justify-start">
//         ${SignUpForm}
//       </main>
//     </div>
// `

// setupCounter(document.querySelector('#counter'))
