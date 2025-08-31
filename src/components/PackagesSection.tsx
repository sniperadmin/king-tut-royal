import React, { useState } from 'react';
import MinimalPackageCard from './MinimalPackageCard';
import PackageDetailsModal from './PackageDetailsModal';
import { Crown, Star, Calendar, MapPin, Gift, Users, Clock, Camera } from "lucide-react";

const PackagesSection: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewDetails = (packageId: number) => {
    setSelectedPackage(packageId);
    setIsModalOpen(true);
  };

  const packages = [
    {
      id: 1,
      title: "King Tut Royal VIP Package",
      price: "€2,900 (per person)",
      duration: "5 Days / 4 Nights (Thursday - Monday)",
      image: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756565393717_648cbeb3.jpeg",
      shortDescription: "The Ultimate VIP Corporate & HNWI Experience – The King Tut Royal Package. A once-in-a-lifetime journey, limited to 50 VIP travelers per week, launching Thursday, November 6th, 2025.",
      icon: Crown,
      features: ["The Ultimate VIP Corporate & HNWI Experience – The King Tut Royal Package", "A once-in-a-lifetime journey, limited to 50 VIP travelers per week, launching Thursday, November 6th, 2025", "5 Days / 4 Nights of pure elegance", "Luxury 5-Star Hotel Stay in Cairo", "Private VIP tour of the Grand Egyptian Museum & King Tut chamber with expert archaeologist", "Exclusive Royal Dinner on the Nile with live entertainment", "Private chauffeur & luxury transfers throughout", "Special limited-edition King Tut Authentic Perfume gift", "Curated leisure & lifestyle experiences designed for HNWIs & corporate elites", "Powered by SY Consulting – Egypt in Style", "Backed by over 30 years of global expertise in Luxury, Hospitality & Iconic Events", "Exclusively Limited to 50 VIP Guests per week"],
      highlights: ["Meet & Greet at Cairo International Airport", "Full day at Grand Egyptian Museum", "Gourmet dinner cruise with live entertainment", "Special guided tour of Giza Plateau", "24/7 concierge assistance"],
      included: ["5-star hotel accommodation", "All meals and beverages", "Private transportation", "Expert guide services", "Museum entrance fees", "Authentic souvenirs"],
      itinerary: [
        { day: "Day 1", activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"] },
        { day: "Day 2", activities: ["Grand Egyptian Museum", "King Tut chamber tour", "Luxury lunch"] }
      ],
      isPopular: true
    },
    {
      id: 2,
      title: "King Tut VIP One Day Package",
      price: "€900 (per person)",
      duration: "1 Day Experience",
      image: "https://d64gsuwffb70l.cloudfront.net/68b1c96bae343289de113d06_1756552631652_a8ade16f.jpeg",
      shortDescription: "Perfect day trip with private museum access, expert guide, and authentic Egyptian dining experience.",
      icon: Star,
      features: ["Chauffeured VIP transport from hotel", "Private Tutankhamun Chamber Tour", "Expert archaeologist-led experience", "Luxury lunch at Grand Museum Restaurant", "Limited Edition King Tut Authentic Perfume", "Dedicated personal guide throughout", "Seamless door-to-door service"],
      highlights: ["One-of-a-kind guided museum experience", "Insights not available to general public", "Gourmet lunch at prestigious venue", "Authentic perfume keepsake", "Perfect for limited time travelers"],
      included: ["Private transportation", "Museum entrance fees", "Expert guide", "Luxury lunch", "Authentic souvenirs"],
      itinerary: [
        { day: "Morning", activities: ["Hotel pickup", "Grand Egyptian Museum arrival", "Private King Tut tour"] },
        { day: "Afternoon", activities: ["Luxury lunch", "Additional museum exploration", "Hotel return"] }
      ]
    }
  ];

  const selectedPackageData = selectedPackage ? packages.find(pkg => pkg.id === selectedPackage) : null;

  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">
            Our Signature Experiences
          </h2>
          <div className="w-24 h-px bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Carefully curated journeys that blend ancient wonders with modern luxury, 
            each designed to create unforgettable memories.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {packages.map((pkg) => (
              <MinimalPackageCard
                key={pkg.id}
                {...pkg}
                onViewDetails={handleViewDetails}
                onBookNow={scrollToBooking}
              />
            ))}
          </div>
        </div>
      </div>

      <PackageDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageData={selectedPackageData}
        onBookNow={scrollToBooking}
      />
    </section>
  );
};

export default PackagesSection;