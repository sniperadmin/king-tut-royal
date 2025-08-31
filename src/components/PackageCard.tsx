import React from 'react';

interface PackageCardProps {
  title: string;
  price: string;
  duration: string;
  image: string;
  highlights: string[];
  isPopular?: boolean;
  onBookNow: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  duration,
  image,
  highlights,
  isPopular = false,
  onBookNow
}) => {
  return (
    <div className={`bg-gray-900 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 group ${isPopular ? 'border-yellow-400' : ''}`}>
      {isPopular && (
        <div className="bg-yellow-400 text-black px-4 py-1 text-sm font-medium text-center">
          MOST POPULAR
        </div>
      )}
      
      <div className="relative h-80 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
            </svg>
          </div>
          <h3 className="text-3xl font-semibold text-white mb-3">{title}</h3>
          <p className="text-gray-300 text-lg tracking-wide font-medium">{duration}</p>
        </div>

        <div className="text-center mb-8">
          <div className="text-4xl font-semibold text-yellow-400 mb-2">{price}</div>
          <div className="text-gray-300 text-base font-medium">per person</div>
        </div>

        <div className="mb-8">
          <ul className="space-y-4">
            {highlights.slice(0, 4).map((highlight, index) => (
              <li key={index} className="flex items-start text-base">
                <span className="text-yellow-400 mr-3 mt-1 text-lg">•</span>
                <span className="text-gray-200 font-medium leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <button 
          onClick={onBookNow}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 font-semibold tracking-wider transition-all duration-300 uppercase text-base"
        >
          Book Now
        </button>
      </div>
  );
};

export default PackageCard;