import React from 'react';

import { smoothScroll } from '../utils/smoothScroll';

const HeroSection: React.FC = () => {
  const scrollToPackages = () => {
    smoothScroll('packages');
  };

  return (
    <section className="relative w-full pt-16">
      {/* Background Image - Full Width, Contained */}
      <div className="w-full">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756568030709_0f9cfae8.jpeg"
          alt="Egyptian Pharaoh"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;