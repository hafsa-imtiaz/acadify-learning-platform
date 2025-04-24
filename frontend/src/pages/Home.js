import React from 'react';
import Navbar from '../components/Home/Navbar';
import HeroSection from '../components/Home/HeroSection';
import FeaturedCourses from '../components/Home/FeaturedCourses';
import HowItWorks from '../components/Home/HowItWorks';
import TopCategories from '../components/Home/TopCategories';
import Testimonials from '../components/Home/Testimonials';
import CallToAction from '../components/Home/CallToAction';
import Footer from '../components/Home/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />  
        <FeaturedCourses />
        <TopCategories />
        <HowItWorks /> 
        <Testimonials />         
        <CallToAction />  
      </main>
      <Footer />
    </div>
  );
};

export default Home;