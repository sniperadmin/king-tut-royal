import React from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import MediaSliderSection from './MediaSliderSection';
import PackagesSection from './PackagesSection';
import WhyChooseSection from './WhyChooseSection';
import BookingSection from './BookingSection';
import Footer from './Footer';
const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <MediaSliderSection />
        <section id="packages">
          <PackagesSection />
        </section>
        <WhyChooseSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
};
export default AppLayout;