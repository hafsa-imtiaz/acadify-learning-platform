
import React from "react";
import "../../css/Home/herosection.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-grid">
          <div>
            <h1 className="hero-title">
              Unlock Your Potential With Expert-Led Online Courses
            </h1>
            <p className="hero-subtitle">
              Learn at your own pace from top instructors in programming, design, business, and more. Start your learning journey today.
            </p>
            <div className="hero-actions">
              <button className="hero-btn-primary" onClick={() => navigate("/courses")}>
                Browse Courses
              </button>
              <button className="hero-btn-secondary" onClick={() => navigate("/about")}>
                Learn More
              </button>
            </div>
            <div className="hero-trusted">
              <span className="hero-trusted-text">
                Trusted by over 10,000+ students
              </span>
              <div className="hero-avatars">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="hero-avatar" />
                ))}
              </div>
            </div>
          </div>
          <div className="hero-demo-wrapper">
            <div className="hero-demo-bg-yellow"></div>
            <div className="hero-demo-bg-blue"></div>
            <div className="hero-demo">
              <div className="hero-demo-video">
                <div className="hero-demo-play">
                  <svg className="hero-demo-play-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8.0001 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="hero-demo-details">
                <h3 className="hero-demo-title">Introduction to Web Development</h3>
                <div className="hero-demo-rating">
                  <div className="hero-demo-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="hero-demo-star" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="hero-demo-rating-text">4.9 (2.5k reviews)</span>
                </div>
                <div className="hero-demo-meta">
                  <span className="hero-demo-price">$49.99</span>
                  <span className="hero-demo-length">8 hours of content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
