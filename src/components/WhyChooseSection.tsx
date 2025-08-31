import React from 'react';

const WhyChooseSection: React.FC = () => {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
        </svg>
      ),
      title: "Exclusive Access",
      description: "Private tours of museums and heritage sites reserved for VIP guests"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"/>
        </svg>
      ),
      title: "Luxury Hospitality",
      description: "Handpicked five star hotels, offering world-class service"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V4C15 2.9 14.1 2 13 2H11C9.9 2 9 2.9 9 4V5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V12L18.92 6.01Z"/>
        </svg>
      ),
      title: "Seamless Experience",
      description: "Private transfers, VIP concierge and custom itineraries"
    }
  ];

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-8 tracking-wide">
            Why Choose Us?
          </h2>
          <div className="w-24 h-px bg-yellow-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="text-yellow-400 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-serif text-2xl font-light text-white mb-4 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-300 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;