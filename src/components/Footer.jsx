import React from 'react';

export const Footer = () => {
  return (
    /* ✅ Remove fixed class, use margin-top */
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-inner mt-10  fixed bottom-0 left-0 w-full">
  <div className="max-w-6xl mx-auto px-4 flex flex-col justify-between items-center text-center gap-1">
    <h1 className="text-sm md:text-base font-semibold tracking-wide">
      Manage your digital life with ease 
    </h1>
    <p className="text-xs md:text-sm font-light">
      Created with <i className="fa-solid fa-heart text-red-500 mx-1"></i> by <span className="font-medium">Mukul</span>
    </p>
  </div>
</footer>


  );
};
