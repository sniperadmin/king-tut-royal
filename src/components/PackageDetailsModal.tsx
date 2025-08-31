import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { X, Star, Gift, Clock, Users, MapPin } from "lucide-react";

interface PackageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    id: number;
    title: string;
    price: string;
    duration: string;
    image: string;
    description: string;
    features: string[];
    highlights: string[];
    included: string[];
    itinerary: { day: string; activities: string[] }[];
  } | null;
  onBookNow: () => void;
}

const PackageDetailsModal: React.FC<PackageDetailsModalProps> = ({
  isOpen,
  onClose,
  packageData,
  onBookNow
}) => {
  if (!packageData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-4">
            {packageData.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden rounded-lg">
            <img 
              src={packageData.image} 
              alt={packageData.title}
              className="w-full h-full object-contain bg-gray-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-400 mb-2 sm:mb-3 flex items-center">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Package Features
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                {packageData.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-start text-xs sm:text-sm lg:text-base">
                    <span className="text-yellow-400 mr-2 text-sm sm:text-base">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-400 mb-2 sm:mb-3 flex items-center">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                What's Included
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                {packageData.included.map((item, index) => (
                  <li key={index} className="text-gray-300 flex items-start text-xs sm:text-sm lg:text-base">
                    <span className="text-yellow-400 mr-2 text-sm sm:text-base">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4 sm:pt-6 lg:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400">{packageData.price}</div>
                <div className="text-gray-400 text-sm sm:text-base font-medium mt-1">{packageData.duration}</div>
              </div>
              <Button 
                onClick={() => {
                  onClose();
                  setTimeout(() => onBookNow(), 300);
                }}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
              >
                Book This Experience
              </Button>

            </div>
          </div>
        </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default PackageDetailsModal;