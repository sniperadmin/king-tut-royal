import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Crown, Star, Clock, Users, MapPin, Gift } from "lucide-react";

interface MinimalPackageCardProps {
  id: number;
  title: string;
  price: string;
  duration: string;
  image: string;
  shortDescription: string;
  highlights: string[];
  icon: React.ComponentType<any>;
  isPopular?: boolean;
  onViewDetails: (id: number) => void;
  onBookNow: () => void;
}

const MinimalPackageCard: React.FC<MinimalPackageCardProps> = ({
  id,
  title,
  price,
  duration,
  image,
  shortDescription,
  highlights,
  icon: IconComponent,
  isPopular = false,
  onViewDetails,
  onBookNow
}) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-yellow-400 transition-all duration-300 group overflow-hidden relative h-full flex flex-col">
      {isPopular && (
        <div className="absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-medium z-10">
          Popular
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-contain bg-gray-800 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-yellow-400 rounded-full mr-3">
            <IconComponent className="h-5 w-5 text-black" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white leading-tight mb-1">{title}</h3>
            <p className="text-gray-300 text-base font-medium">{duration}</p>
          </div>
        </div>

        <p className="text-gray-200 text-base mb-5 font-medium leading-relaxed flex-1">{shortDescription}</p>

        <div className="mb-5">
          <ul className="space-y-2">
            {highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="text-gray-200 text-sm flex items-start font-medium">
                <span className="text-yellow-400 mr-3 text-base">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="text-3xl font-bold text-yellow-400">{price}</div>
          <button 
            onClick={() => onViewDetails(id)}
            className="text-yellow-400 hover:text-yellow-300 text-base font-semibold"
          >
            View Details →
          </button>
        </div>

        <Button 
          onClick={onBookNow}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 text-base transition-colors"
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default MinimalPackageCard;