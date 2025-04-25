import React, { useState } from 'react';
import { MoreHorizontal, Users, Star } from 'lucide-react';
import '../../../css/teacher/Dashboard/CourseSummaryCard.css';

const CourseSummaryCard = ({ course }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <div className="course-card">
      <div className="course-image-container">
        <img src={course.image} alt={course.title} className="course-image" />
        <div className="last-updated">Updated {course.lastUpdated}</div>
      </div>
      <div className="course-content">
        <div className="course-header">
          <h3 className="course-title">{course.title}</h3>
          <div className="menu-container">
            <button 
              className="menu-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreHorizontal size={18} />
            </button>
            {showMenu && (
              <div className="card-dropdown-menu">
                <a href="#">Edit Course</a>
                <a href="#">View Course</a>
                <a href="#">Manage Students</a>
                <a href="#">Course Settings</a>
                <a href="#" className="delete-option">Delete</a>
              </div>
            )}
          </div>
        </div>
        
        <div className="course-stats">
          <div className="stat">
            <Users size={16} />
            <span>{course.enrolled} Students</span>
          </div>
          <div className="stat">
            <Star size={16} className="filled-star" />
            <span>{course.rating}</span>
          </div>
        </div>
        
        <div className="course-actions">
          <button className="primary-button">Edit Content</button>
          <button className="secondary-button">View Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default CourseSummaryCard;