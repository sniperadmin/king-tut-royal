import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

const MediaSliderSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  const mediaItems = [
    {
      id: 1,
      src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756563688699_c9cc1e54.jpeg",
      title: "Egypt in Style",
      description: "Private access, curated itineraries, 24/7 concierge"
    },
    {
      id: 2,
      src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756563690287_c291debe.jpeg",
      title: "Core Services",
      description: "Luxury accommodations and premium experiences"
    },
    {
      id: 3,
      src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756563690822_f6641d5a.jpeg",
      title: "Digital Experience",
      description: "AR-enhanced tours and mobile concierge"
    },
    {
      id: 4,
      src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756569116369_624ffd5b.jpeg",
      title: "Royal Dinner on the Nile",
      description: "Exclusive dining experiences with ancient Egyptian ambiance"
    },
    {
      id: 5,
      src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756569118036_1d19752f.jpeg",
      title: "King Tut Royal Collection",
      description: "Limited edition luxury items inspired by pharaonic treasures"
    },
    {
      id: 6,
      src: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756569118786_e66e165b.jpeg",
      title: "VIP Experience Package",
      description: "Premium access and personalized Egyptian adventure"
    }
  ];

  // Auto-switch functionality
  useEffect(() => {
    if (!isModalOpen) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
      }, 4000); // Switch every 4 seconds

      return () => clearInterval(interval);
    }
  }, [mediaItems.length, isModalOpen]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <>
      <section className="py-12 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h4 className="text-lg text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Immerse yourself in luxury Egyptian experiences
            </h4>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden rounded-2xl group cursor-pointer"
                 onClick={() => openModal(currentSlide)}>
              <img
                src={mediaItems[currentSlide].src}
                alt={mediaItems[currentSlide].title}
                className="w-full h-full object-contain transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Maximize button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white border-0 h-10 w-10 rounded-full"
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Button
              onClick={prevSlide}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              onClick={nextSlide}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="flex justify-center mt-8 space-x-3">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-yellow-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <img
              src={mediaItems[modalImageIndex].src}
              alt={mediaItems[modalImageIndex].title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            <Button
              onClick={closeModal}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              onClick={prevModalImage}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              onClick={nextModalImage}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 h-12 w-12 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaSliderSection;