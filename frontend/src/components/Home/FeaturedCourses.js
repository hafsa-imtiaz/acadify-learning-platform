import React from "react";
import "../../css/coursecard.css";
import CourseCard from "../../components/CourseCard"; 
import { Link } from 'react-router-dom';

const FeaturedCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Complete JavaScript Bootcamp",
      instructor: "Sarah Johnson",
      rating: 5,
      reviewCount: "2,345",
      price: "59.99",
      image: "javascript-course.jpg",
      level: "Beginner",
      duration: "20 hours",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Michael Chen",
      rating: 4,
      reviewCount: "1,829",
      price: "69.99",
      image: "data-science.jpg",
      level: "Intermediate",
      duration: "30 hours",
    },
    {
      id: 3,
      title: "UX/UI Design Principles",
      instructor: "Emma Rodriguez",
      rating: 5,
      reviewCount: "956",
      price: "49.99",
      image: "ux-design.jpg",
      level: "All Levels",
      duration: "15 hours",
    },
    {
      id: 4,
      title: "Advanced React Development",
      instructor: "David Wilson",
      rating: 5,
      reviewCount: "1,245",
      price: "79.99",
      image: "react-dev.jpg",
      level: "Advanced",
      duration: "25 hours",
    },
  ];

  return (
    <section className="featured-courses-section">
      <div className="featured-courses-container">
        <div className="featured-courses-header">
          <div>
            <h2 className="featured-courses-title">Featured Courses</h2>
            <p className="featured-courses-subtitle">
              Expand your skills with our top-rated courses
            </p>
          </div>
          <a href="#" className="featured-courses-link">
            View all courses
            <svg className="featured-courses-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
