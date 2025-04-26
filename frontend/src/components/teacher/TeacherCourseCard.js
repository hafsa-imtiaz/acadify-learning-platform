import React from 'react';
import { Eye, Edit, Trash2, BarChart } from 'lucide-react';
import '../../css/teacher/teacher-course-card.css';

function CourseCardTeacher({ course, onView, onEdit, onDelete, onGoToDashboard }) {
  return (
    <div className="course-card-teacher">
      <div className="course-card-image">
        <img src={course.image} alt={course.title} />
        <div className={`status-badge ${course.status.toLowerCase()}`}>
          {course.status}
        </div>
        {course.level && <div className="course-level">{course.level}</div>}
      </div>
      
      <div className="course-card-content">
        <h3 className="course-title">{course.title}</h3>
        {course.instructor && <p className="course-instructor">{course.instructor}</p>}
        
        <div className="course-stats">
          <div className="stat">
            <span className="stat-label">Students</span>
            <span className="stat-value">{course.enrolled}</span>
          </div>
          
          {course.status.toLowerCase() === 'published' && (
            <div className="stat">
              <span className="stat-label">Rating</span>
              <span className="stat-value">
                {course.rating > 0 ? (
                  <div className="rating-container">
                    <div className="stars-container">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`star${i < course.rating ? " star-filled" : ""}`}
                          fill={i < course.rating ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                    {course.reviewCount && <span className="review-count">({course.reviewCount})</span>}
                  </div>
                ) : (
                  'N/A'
                )}
              </span>
            </div>
          )}
          
          {course.duration && (
            <div className="stat">
              <span className="stat-label">Duration</span>
              <span className="stat-value">{course.duration}</span>
            </div>
          )}
        </div>
        
        {course.price !== undefined && (
          <div className="course-price">${course.price}</div>
        )}
        
        <div className="course-actions-card">
          <button className="action-btn-teacard view" onClick={onView} title="View Course">
            <Eye size={18} />
          </button>
          <button className="action-btn-teacard edit" onClick={onEdit} title="Edit Course">
            <Edit size={18} />
          </button>
          <button className="action-btn-teacard delete" onClick={onDelete} title="Delete Course">
            <Trash2 size={18} />
          </button>
          {course.status.toLowerCase() === 'published' && (
            <button className="action-btn-teacard dashboard" onClick={onGoToDashboard} title="Course Dashboard">
              <BarChart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardTeacher;