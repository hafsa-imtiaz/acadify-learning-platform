import React, { useState } from 'react';
import '../../css/Home/testimonials.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      content:
        "LearnHub completely transformed my career. I went from knowing nothing about programming to landing a job as a full-stack developer in just 6 months. The courses are well-structured and the instructors are amazing!",
      author: "Alex Morgan",
      role: "Software Developer",
      company: "TechCorp",
      avatar: "https://i.pravatar.cc/64?u=1",
    },
    {
      id: 2,
      content:
        "As someone running a small business, the marketing courses on LearnHub have been invaluable. I've been able to implement strategies that have doubled our online presence and increased sales by 40%.",
      author: "Samantha Lee",
      role: "Business Owner",
      company: "Bloom Boutique",
      avatar: "https://i.pravatar.cc/64?u=2",
    },
    {
      id: 3,
      content:
        "The quality of instruction on LearnHub is unmatched. I've tried many online learning platforms, but the depth of content and the engagement from instructors here make it stand out. Worth every penny!",
      author: "James Wilson",
      role: "Project Manager",
      company: "InnovateTech",
      avatar: "https://i.pravatar.cc/64?u=3",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="testimonials-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <h2>What Our Students Say</h2>
          <p>
            Hear from learners who achieved their goals through our platform.
          </p>
        </div>

        <div className="testimonial-card-wrapper">
          <div className="testimonial-card">
            <svg
              className="quote-icon"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            <p className="testimonial-text">
              {testimonials[currentIndex].content}
            </p>

            <div className="testimonial-author">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].author}
                className="avatar"
              />
              <div>
                <h4>{testimonials[currentIndex].author}</h4>
                <p>
                  {testimonials[currentIndex].role} at{" "}
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          <button className="nav-button left" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <button className="nav-button right" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="dot-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
