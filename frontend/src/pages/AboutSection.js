// AboutSection.js
import React from 'react';
import '../css/AboutSection.css';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import ContactSection from '../components/ContactSection';
import { Link } from 'react-router-dom';
import FAQSection from '../components/FAQSection';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();
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