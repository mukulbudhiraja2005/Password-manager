
// import React from 'react';

// export const Navbar = () => {
//   return (
//     <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
//         {/* Logo/Brand */}
//         <div className="text-white font-bold text-xl tracking-wide">
//           PassOp
//         </div>

//         {/* Centered Links */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-8">
//           <a 
//             href="#home" 
//             className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
//           >
//             Home
//           </a>
//           <a 
//             href="#contact" 
//             className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
//           >
//             Contact
//           </a>
//           <a 
//             href="#about" 
//             className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
//           >
//             About
//           </a>
//         </div>

//         {/* Right Side: GitHub Button */}
//         <div className="flex items-center gap-4">
//           {/* GitHub Button */}
//           <a
//             href="https://github.com/your-github-username"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 bg-white text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
//           >
//               <i className="fab fa-github text-lg"></i>
            
              
           
//             GitHub
//           </a>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden text-white">
//             <button>
//               <svg 
//                 className="w-6 h-6" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24" 
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-800 to-indigo-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo/Brand */}
        <div className="text-white font-bold text-xl tracking-wide">
          PassOp
        </div>

       

        {/* Right Side: GitHub Button */}
        <div className="flex items-center gap-4">
         

          {/* Mobile Hamburger */}
          <div className="md:hidden text-white">
            <button>
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
