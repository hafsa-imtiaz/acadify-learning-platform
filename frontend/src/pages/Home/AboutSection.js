// AboutSection.js
import React, { useEffect, useState } from 'react';
import '../../css/Home/AboutSection.css';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import ContactSection from '../../components/Home/ContactSection';
import { Link } from 'react-router-dom';
import FAQSection from '../../components/Home/FAQSection';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AboutSection = () => {
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
    <div className="main-container">
    <Navbar />
    <section className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2>About Us</h2>
          <div className="underline"></div>
        </div>
        
        <div className="about-content">
          <p>
            Welcome to our platform! We are dedicated to providing accessible, high-quality courses to help
            you learn at your own pace. Whether you're a beginner or an expert, you'll find the resources you need
            to achieve your goals.
          </p>
          
          <p>
            Our platform offers a wide variety of courses in various fields. From technology to business, we've got
            something for everyone.
          </p>
          
          <div className="about-features">
            <div className="feature">
              <div className="feature-icon">📚</div>
              <h3>Diverse Courses</h3>
              <p>Access hundreds of courses across multiple disciplines</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">⏱️</div>
              <h3>Learn at Your Pace</h3>
              <p>Flexible learning schedule that fits your lifestyle</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">🏆</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals and educators</p>
            </div>
          </div>
          
          <button className="about-cta" onClick={() => navigate("/courses")}>Explore Our Courses</button>
        </div>
      </div>
    </section>
    <FAQSection />
    <ContactSection />
    <Footer />
    </div>
  );
};

export default AboutSection;