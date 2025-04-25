import React from "react";
import "../../css/coursecard.css";
import CourseCard from "../../components/CourseCard"; 
import { Link } from 'react-router-dom';
import dscourse from '../../assets/Courses/datascicourse.jpg';
import jscourse from '../../assets/Courses/jscourse.jpeg';
import reactcourse from '../../assets/Courses/reactdev.jpeg';
import uiuxcourse from '../../assets/Courses/uiuxcourse.png';

const FeaturedCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Complete JavaScript Bootcamp",
      instructor: "Tajwar Mehmood",
      rating: 5,
      reviewCount: "2,345",
      price: "59.99",
      image: jscourse,
      level: "Beginner",
      duration: "20 hours",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Aoun Jee",
      rating: 4,
      reviewCount: "1,829",
      price: "0.00",
      image: dscourse,
      level: "Intermediate",
      duration: "30 hours",
    },
    {
      id: 3,
      title: "UX/UI Design Principles",
      instructor: "Fatimah Rehman",
      rating: 5,
      reviewCount: "956",
      price: "49.99",
      image: uiuxcourse,
      level: "All Levels",
      duration: "15 hours",
    },
    {
      id: 4,
      title: "Advanced React Development",
      instructor: "Areen Zainab",
      rating: 5,
      reviewCount: "1,245",
      price: "79.99",
      image: reactcourse,
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
