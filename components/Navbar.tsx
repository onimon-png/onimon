import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-8 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 flex justify-center md:justify-start items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center bg-oni-red text-oni-dark font-black text-2xl rounded-sm group-hover:bg-white transition-colors duration-300">
            鬼
          </div>
          <span className="text-3xl font-serif font-bold tracking-[0.2em] text-white group-hover:text-oni-red transition-colors duration-300">
            ONIMON
          </span>
        </a>
      </div>
    </nav>
  );
};