import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/Home/Navbar';
import HeroSection from '../components/Home/HeroSection';
import FeaturedCourses from '../components/Home/FeaturedCourses';
import HowItWorks from '../components/Home/HowItWorks';
import TopCategories from '../components/Home/TopCategories';
import Testimonials from '../components/Home/Testimonials';
import CallToAction from '../components/Home/CallToAction';
import Footer from '../components/Home/Footer';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token expired, clear storage
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          setIsLoggedIn(false);
        } else {
          // Token is valid, check the role and redirect
          const storedUser = JSON.parse(localStorage.getItem('user'));
          setIsLoggedIn(true); // User is logged in
          if (storedUser.role === 'Teacher') {
            navigate('/teacher/dashboard'); // Redirect to Teacher dashboard
          } else if (storedUser.role === 'Student') {
            navigate('/student/dashboard'); // Redirect to Student dashboard
          }
        }
      } catch (error) {
        console.error("Invalid token or error decoding", error);
        // Clear invalid token from storage
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }
  }, [navigate]);

  if (isLoggedIn) {
    return null;
  }

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
