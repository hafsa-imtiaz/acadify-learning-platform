import React from 'react';
import '../../css/Home/CallToAction.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Learning Journey?</h2>
          <p className="cta-description">
            Join thousands of students who are already learning and growing with our platform. 
            Get unlimited access to all courses, resources, and community support.
          </p>
          <div className="cta-buttons">
          <button className="cta-button primary" onClick={() => navigate("/register")}>
            Sign Up For Free
          </button>
          <button className="cta-button secondary" onClick={() => navigate("/courses")}>Browse All Courses</button>
          </div>
          <p className="cta-login">
            Already have an account? <a href="/login" className="cta-link">Log in</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
