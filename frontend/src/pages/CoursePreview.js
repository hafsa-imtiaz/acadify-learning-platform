import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/CoursePreview.css";
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import { Star, Clock, Book, Award, User, DollarSign, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from 'react-router-dom';


const mockCourse = {
  id: 1,
  title: "Introduction to Python Programming",
  subtitle: "Learn Python from scratch and build your first applications",
  instructor: "Aoun Jee",
  instructorTitle: "Senior Software Engineer at Tech Company",
  instructorBio: "Dr. Jee has over 10 years of experience in software development and has taught programming to thousands of students worldwide.",
  duration: "4 weeks",
  level: "Beginner",
  price: 49.99,
  discount: 39.99,
  enrollmentDeadline: "May 30, 2025",
  startDate: "June 1, 2025",
  image: "/api/placeholder/800/450",
  topics: [
    "Variables and Data Types",
    "Control Structures",
    "Functions and Methods",
    "Data Structures",
    "File Handling",
    "Object-Oriented Programming",
    "Modules and Packages",
    "Error Handling"
  ],
  lessons: [
    { title: "Getting Started with Python", duration: "45 minutes" },
    { title: "Variables and Basic Data Types", duration: "60 minutes" },
    { title: "Control Flow: If Statements and Loops", duration: "75 minutes" },
    { title: "Functions and Scopes", duration: "60 minutes" },
    { title: "Lists, Tuples and Dictionaries", duration: "90 minutes" },
    { title: "Working with Files", duration: "45 minutes" },
    { title: "Introduction to OOP in Python", duration: "90 minutes" },
    { title: "Building Your First Application", duration: "120 minutes" }
  ],
  prerequisites: "No prior programming knowledge required. Basic computer skills helpful.",
  skills: ["Python Programming", "Problem Solving", "Algorithm Design", "Data Analysis Basics"],
  certificate: true,
  rating: 4.7,
  reviews: 342,
  studentsEnrolled: 5840
};

const CoursePreview = () => {
  const { courseId } = useParams(); 
  const [openSections, setOpenSections] = useState({
    overview: true,
    instructor: false,
    curriculum: false
  });
  
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigate = useNavigate();
  return (
    <div className="main-container">
      <Navbar />
      
      <div className="course-banner">
        <img src={mockCourse.image} alt={mockCourse.title} className="course-image" />
        <div className="banner-overlay">
          <div className="banner-content">
            <h1>{mockCourse.title}</h1>
            <p className="course-subtitle">{mockCourse.subtitle}</p>
            <div className="banner-meta">
              <span><Star className="icon" size={16} fill="gold" stroke="gold" /> {mockCourse.rating} ({mockCourse.reviews} reviews)</span>
              <span><User className="icon" size={16} /> {mockCourse.studentsEnrolled.toLocaleString()} students enrolled</span>
              <span><Clock className="icon" size={16} /> {mockCourse.duration}</span>
              <span><Book className="icon" size={16} /> {mockCourse.level}</span>
              {mockCourse.certificate && <span><Award className="icon" size={16} /> Certificate Included</span>}
            </div>
          </div>
        </div>
      </div>
      
      <div className="course-content-container">
        <div className="course-details">
          <div className="course-section">
            <div className="section-header" onClick={() => toggleSection('overview')}>
              <h2>Course Overview</h2>
              {openSections.overview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {openSections.overview && (
              <div className="section-content">
                <p className="course-description">
                  This comprehensive Python course is designed for beginners who want to learn programming from scratch.
                  You'll start with Python basics and gradually build up to creating your own applications.
                  By the end of this course, you'll have a solid foundation in Python programming and be ready
                  to pursue more advanced topics or start building your own projects.
                </p>
                
                <div className="skills-section">
                  <h3>Skills You'll Gain</h3>
                  <div className="skills-list">
                    {mockCourse.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="prerequisites-section">
                  <h3>Prerequisites</h3>
                  <p>{mockCourse.prerequisites}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="course-section">
            <div className="section-header" onClick={() => toggleSection('instructor')}>
              <h2>Your Instructor</h2>
              {openSections.instructor ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {openSections.instructor && (
              <div className="section-content instructor-section">
                <div className="instructor-profile">
                  <div className="instructor-avatar">
                    <img src="/api/placeholder/120/120" alt={mockCourse.instructor} />
                  </div>
                  <div className="instructor-info">
                    <h3>{mockCourse.instructor}</h3>
                    <p className="instructor-title">{mockCourse.instructorTitle}</p>
                    <p className="instructor-bio">{mockCourse.instructorBio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="course-section">
            <div className="section-header" onClick={() => toggleSection('curriculum')}>
              <h2>Course Curriculum</h2>
              {openSections.curriculum ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {openSections.curriculum && (
              <div className="section-content">
                <div className="topics-section">
                  <h3>Topics Covered</h3>
                  <ul className="topics-list">
                    {mockCourse.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="lessons-section">
                  <h3>Course Lessons</h3>
                  <div className="lessons-list">
                    {mockCourse.lessons.map((lesson, index) => (
                      <div key={index} className="lesson-item">
                        <div className="lesson-number">{index + 1}</div>
                        <div className="lesson-details">
                          <h4>{lesson.title}</h4>
                          <span className="lesson-duration"><Clock size={14} /> {lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="course-sidebar">
          <div className="enrollment-card">
            <div className="price-section">
              {mockCourse.discount ? (
                <>
                  <span className="current-price">${mockCourse.discount}</span>
                  <span className="original-price">${mockCourse.price}</span>
                  <span className="discount-badge">
                    {Math.round((1 - mockCourse.discount / mockCourse.price) * 100)}% off
                  </span>
                </>
              ) : (
                <span className="current-price">${mockCourse.price}</span>
              )}
            </div>
            
            <div className="enrollment-deadline">
              <Calendar size={16} className="icon" />
              <span>Enrollment Deadline: {mockCourse.enrollmentDeadline}</span>
            </div>
            
            <div className="course-starts">
              <Calendar size={16} className="icon" />
              <span>Course Starts: {mockCourse.startDate}</span>
            </div>
            
            <div className="cta-buttons">
              <button className="btn primary" onClick={() => navigate("/login")}>Enroll Now</button>
              <button className="btn secondary" onClick={() => navigate("/login")}>Add to Wishlist</button>
            </div>
            
            <div className="guarantee-note">
              <p>30-day money-back guarantee</p>
            </div>
            
            <div className="includes-section">
              <h4>This Course Includes:</h4>
              <ul>
                <li><Clock size={16} className="icon" /> {mockCourse.duration} of content</li>
                <li><Book size={16} className="icon" /> {mockCourse.lessons.length} lessons</li>
                <li><User size={16} className="icon" /> Full access to community forum</li>
                {mockCourse.certificate && <li><Award size={16} className="icon" /> Certificate of completion</li>}
                <li><DollarSign size={16} className="icon" /> Lifetime access</li>
              </ul>
            </div>
          </div>
          
          <div className="share-card">
            <p>Share this course:</p>
            <div className="share-buttons">
              <button className="share-btn facebook" href="/login">Facebook</button>
              <button className="share-btn twitter" href="/login">Twitter</button>
              <button className="share-btn linkedin" href="/login">LinkedIn</button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CoursePreview;