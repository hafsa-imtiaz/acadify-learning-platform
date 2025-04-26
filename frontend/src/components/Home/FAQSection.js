// FAQSection.js
import React, { useState } from 'react';
import '../../css/Home/FAQSection.css';
import { Link } from 'react-router-dom';

const FAQSection = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  
  const toggleQuestion = (index) => {
    if (activeQuestion === index) {
      setActiveQuestion(null); // Close the active question if clicked again
    } else {
      setActiveQuestion(index); // Open clicked question
    }
  };
  
  const faqs = [{ question: 'How do I enroll in a course?', answer: 'Simply click on a course and follow the enrollment instructions. After selecting a course, click the "Enroll Now" button and complete the registration process. You will receive an email confirmation once enrollment is successful.' },
    { question: 'Do I need to log in to browse?', answer: 'No, you can browse courses without logging in. However, you need to create an account and log in to enroll in courses, track your progress, and access course materials.' },
    { question: 'Are the courses free?', answer: 'Some courses are free, while others require a purchase or subscription. Free courses are clearly marked, and paid courses display pricing information on their respective pages. We also offer subscription plans for unlimited access to premium content.' },
    { question: 'How do I become an instructor?', answer: 'You can apply to become an instructor through our "Become an Instructor" page. We review applications based on expertise, teaching experience, and content quality. Approved instructors gain access to our course creation tools and support resources.' },
    { question: 'Will I receive a certificate?', answer: 'Yes, you will receive a digital certificate after completing a course and passing all required assessments. These certificates can be downloaded, printed, and shared on professional networks like LinkedIn to showcase your achievements.' },
  ];
  
  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-underline"></div>
          <p>Find answers to common questions about our platform, courses, and learning experience.</p>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                onClick={() => toggleQuestion(index)} 
                className={`faq-question ${activeQuestion === index ? 'active' : ''}`}
              >
                {faq.question}
              </button>
              <div className={`faq-answer ${activeQuestion === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faq-footer">
          <a href="#contact-section" className="faq-cta">Still Have Questions? Contact Us</a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;