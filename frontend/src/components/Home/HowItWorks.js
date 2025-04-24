import React from 'react';
import { Search, BookOpen, Award, PlayCircle } from 'lucide-react';
import '../../css/Home/HowItWorks.css'; // Import your external CSS file
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <Search className="step-icon" />,
      title: "Find Your Course",
      description: "Browse our extensive library of courses in various categories and skill levels."
    },
    {
      id: 2,
      icon: <PlayCircle className="step-icon" />,
      title: "Learn at Your Pace",
      description: "Access high-quality video lectures, quizzes, and assignments anytime, anywhere."
    },
    {
      id: 3,
      icon: <BookOpen className="step-icon" />,
      title: "Practice with Projects",
      description: "Apply your knowledge with hands-on projects and get feedback from instructors."
    },
    {
      id: 4,
      icon: <Award className="step-icon" />,
      title: "Earn Certificates",
      description: "Complete courses to earn certificates that showcase your skills to employers."
    }
  ];
  const navigate = useNavigate();
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">
            Our platform is designed to make learning accessible, engaging, and effective. Follow these simple steps to begin your learning journey.
          </p>
        </div>

        <div className="how-it-works-grid">
          {steps.map((step) => (
            <div key={step.id} className="step-card-wrapper">
              <div className="step-card">
                <div className="step-badge">{step.id}</div>
                <div className="step-icon-wrapper">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>

              {step.id !== steps.length && (
                <div className="step-connector">
                  <div className="step-connector-dot"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="how-it-works-footer">
          <button className="start-learning-button" onClick={() => navigate("/register")}>Start Learning Now</button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
