import React, { useState } from 'react';
import { smoothScroll } from '../utils/smoothScroll';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    smoothScroll(id);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-400/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-royal font-bold text-yellow-400">EGYPT IN STYLE</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0">Home</button>
            <button onClick={() => scrollToSection('packages')} className="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0">Packages</button>
            <button onClick={() => scrollToSection('why-us')} className="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0">Why Us</button>
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Book Now
            </button>
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-yellow-400 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-400/20">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Home</button>
              <button onClick={() => scrollToSection('packages')} className="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Packages</button>
              <button onClick={() => scrollToSection('experiences')} className="text-white hover:text-yellow-400 transition-colors duration-200 bg-transparent border-none p-0 w-full text-left">Experiences</button>
              <button 
                onClick={() => scrollToSection('booking')}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-semibold w-full"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;