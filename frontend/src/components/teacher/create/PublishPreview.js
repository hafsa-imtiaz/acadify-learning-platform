import React, { useState } from 'react';
import { Eye, Save, Send, CheckCircle, AlertCircle, Info, Book, Clock, Award, Play, FileText, Download, User, Users } from 'lucide-react';
import '../../../css/teacher/create/publish-preview.css';

export default function PublishPreview() {
  const [publishStatus, setPublishStatus] = useState('draft'); // 'draft', 'published', 'publishing'
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [validationIssues, setValidationIssues] = useState([
    { id: 1, type: 'warning', message: 'Course description could be more detailed' },
    { id: 2, type: 'error', message: 'At least one lesson content is empty' }
  ]);
  
  // Sample course data
  const courseData = {
    title: "React Fundamentals",
    instructor: "Alex Johnson",
    description: "Master the basics of React and learn how to build dynamic user interfaces. This comprehensive course takes you from the fundamentals to advanced concepts with practical projects.",
    level: "Intermediate",
    duration: "6 weeks",
    enrolledStudents: 0,
    lastUpdated: "April 25, 2025",
    language: "English",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    modules: [
      {
        id: 1,
        title: "Getting Started with React",
        description: "Learn the core concepts of React and set up your development environment",
        lessons: [
          {
            id: 101,
            title: "Introduction to React",
            duration: "15 min",
            type: "video",
            completed: false,
            description: "Understand what React is and why it's popular for modern web development"
          },
          {
            id: 102,
            title: "Setting Up Your Environment",
            duration: "20 min",
            type: "tutorial",
            completed: false,
            description: "Install and configure all the tools you need for React development"
          },
          {
            id: 103,
            title: "Your First React Component",
            duration: "25 min",
            type: "exercise",
            completed: false,
            description: "Build and understand the structure of React components"
          }
        ]
      },
      {
        id: 2,
        title: "React Basics",
        description: "Explore fundamental React concepts that form the foundation of any React application",
        lessons: [
          {
            id: 201,
            title: "Components and Props",
            duration: "30 min",
            type: "video",
            completed: false,
            description: "Learn how to create reusable components and pass data between them"
          },
          {
            id: 202,
            title: "State and Lifecycle",
            duration: "40 min",
            type: "tutorial",
            completed: false,
            description: "Understand how to manage component state and lifecycle methods"
          },
          {
            id: 203,
            title: "Handling Events",
            duration: "25 min",
            type: "exercise",
            completed: false,
            description: "Master event handling in React applications"
          }
        ]
      },
      {
        id: 3,
        title: "Advanced React Patterns",
        description: "Take your React skills to the next level with advanced patterns and techniques",
        lessons: [
          {
            id: 301,
            title: "React Hooks",
            duration: "45 min",
            type: "video",
            completed: false,
            description: "Learn how to use React Hooks to manage state and side effects in functional components"
          },
          {
            id: 302,
            title: "Context API",
            duration: "35 min",
            type: "tutorial",
            completed: false,
            description: "Discover how to share state across components without prop drilling"
          }
        ]
      }
    ]
  };

  const handleSaveAsDraft = () => {
    setPublishStatus('draft');
    // Here you would save course data to the backend
    alert('Course saved as draft');
  };

  const handlePublishClick = () => {
    // Check if there are any error-type validation issues
    const hasErrors = validationIssues.some(issue => issue.type === 'error');
    
    if (hasErrors) {
      // If there are errors, we can't publish yet
      alert('Please fix all errors before publishing');
    } else {
      // If no errors, show confirmation modal
      setShowConfirmModal(true);
    }
  };

  const handleConfirmPublish = () => {
    setPublishStatus('publishing');
    setShowConfirmModal(false);
    
    // Simulate publishing process
    setTimeout(() => {
      setPublishStatus('published');
      // Here you would send the publish request to your backend
    }, 2000);
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
    
    if (!previewMode) {
      // If entering preview mode, you might want to save current state first
      // Here you would typically save the current state to the backend
      alert('Entering student preview mode');
    } else {
      alert('Exiting student preview mode');
    }
  };

  const getLessonTypeIcon = (type) => {
    switch(type) {
      case 'video': 
        return <Play size={16} className="lesson-type-icon" />;
      case 'tutorial': 
        return <FileText size={16} className="lesson-type-icon" />;
      case 'exercise': 
        return <Award size={16} className="lesson-type-icon" />;
      default: 
        return <FileText size={16} className="lesson-type-icon" />;
    }
  };

  const renderPreviewContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="course-overview">
            <div className="course-header">
              <div className="course-cover">
                <div className="course-cover-placeholder">
                  <Book size={48} />
                </div>
              </div>
              <div className="course-meta">
                <h2>{courseData.title}</h2>
                <div className="course-instructor">
                  <User size={16} />
                  <span>Instructor: {courseData.instructor}</span>
                </div>
                <div className="course-stats">
                  <div className="stat-item">
                    <Clock size={16} />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="stat-item">
                    <Users size={16} />
                    <span>{courseData.enrolledStudents} students</span>
                  </div>
                  <div className="stat-item">
                    <Award size={16} />
                    <span>{courseData.level}</span>
                  </div>
                </div>
                <div className="course-tags">
                  {courseData.tags.map((tag, index) => (
                    <span key={index} className="course-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="course-description">
              <h3>About This Course</h3>
              <p>{courseData.description}</p>
            </div>
            
            <div className="course-summary">
              <div className="summary-item">
                <h4>Last Updated</h4>
                <p>{courseData.lastUpdated}</p>
              </div>
              <div className="summary-item">
                <h4>Language</h4>
                <p>{courseData.language}</p>
              </div>
              <div className="summary-item">
                <h4>Total Modules</h4>
                <p>{courseData.modules.length}</p>
              </div>
              <div className="summary-item">
                <h4>Total Lessons</h4>
                <p>{courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0)}</p>
              </div>
            </div>
          </div>
        );
      case 'curriculum':
        return (
          <div className="course-curriculum">
            <h3>Course Curriculum</h3>
            
            {courseData.modules.map(module => (
              <div key={module.id} className="curriculum-module">
                <div className="module-header">
                  <h4>{module.title}</h4>
                  <span className="module-lesson-count">{module.lessons.length} lessons</span>
                </div>
                <p className="module-description">{module.description}</p>
                
                <ul className="module-lessons">
                  {module.lessons.map(lesson => (
                    <li key={lesson.id} className="lesson-item">
                      <div className="lesson-info">
                        {getLessonTypeIcon(lesson.type)}
                        <span className="lesson-title">{lesson.title}</span>
                      </div>
                      <div className="lesson-meta">
                        <span className="lesson-type">{lesson.type}</span>
                        <span className="lesson-duration">
                          <Clock size={14} />
                          {lesson.duration}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'resources':
        return (
          <div className="course-resources">
            <h3>Course Resources</h3>
            <div className="resources-list">
              <div className="resource-item">
                <FileText size={18} />
                <div className="resource-details">
                  <h4>React Cheat Sheet</h4>
                  <p>A quick reference guide for React syntax and patterns</p>
                </div>
                <button className="resource-download">
                  <Download size={16} />
                  Download
                </button>
              </div>
              <div className="resource-item">
                <FileText size={18} />
                <div className="resource-details">
                  <h4>Project Starter Files</h4>
                  <p>Initial code for the course projects</p>
                </div>
                <button className="resource-download">
                  <Download size={16} />
                  Download
                </button>
              </div>
              <div className="resource-item">
                <FileText size={18} />
                <div className="resource-details">
                  <h4>Additional Reading List</h4>
                  <p>Supplementary articles and documentation</p>
                </div>
                <button className="resource-download">
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="publish-preview-container">
      {/* Main content */}
      <div className={`main-content ${previewMode ? 'preview-active' : ''}`}>
        {previewMode && (
          <div className="preview-banner">
            <Info size={20} />
            <span>Preview Mode: You're viewing the course as a student would see it</span>
            <button className="exit-preview-button" onClick={togglePreviewMode}>
              Exit Preview
            </button>
          </div>
        )}

        <div className="publish-header">
          <h2 className="publish-title">
            {previewMode ? 'Course Preview' : 'Publish Your Course'}
          </h2>
          
          {!previewMode && (
            <div className="status-badge" data-status={publishStatus}>
              {publishStatus === 'draft' && 'Draft'}
              {publishStatus === 'published' && 'Published'}
              {publishStatus === 'publishing' && 'Publishing...'}
            </div>
          )}
        </div>

        {!previewMode && (
          <>
            <div className="validation-section">
              <h3 className="validation-title">Pre-publish Validation</h3>
              
              {validationIssues.length > 0 ? (
                <ul className="validation-list">
                  {validationIssues.map(issue => (
                    <li 
                      key={issue.id} 
                      className={`validation-item ${issue.type}`}
                    >
                      {issue.type === 'error' ? (
                        <AlertCircle size={18} />
                      ) : (
                        <Info size={18} />
                      )}
                      <span>{issue.message}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="validation-success">
                  <CheckCircle size={20} />
                  <span>Your course is ready to publish!</span>
                </div>
              )}
            </div>

            <div className="publish-description">
              <h3>Ready to share your knowledge?</h3>
              <p>
                Publishing your course will make it available to students based on your enrollment settings. 
                You can still make changes after publishing.
              </p>
            </div>
          </>
        )}

        {previewMode && (
          <div className="course-preview">
            <div className="preview-tabs">
              <button 
                className={`preview-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`preview-tab ${activeTab === 'curriculum' ? 'active' : ''}`}
                onClick={() => setActiveTab('curriculum')}
              >
                Curriculum
              </button>
              <button 
                className={`preview-tab ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
            </div>
            
            <div className="preview-content">
              {renderPreviewContent()}
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="action-bar">
        <button 
          className="preview-button"
          onClick={togglePreviewMode}
        >
          <Eye size={18} />
          {previewMode ? 'Exit Preview' : 'Preview as Student'}
        </button>

        {!previewMode && (
          <>
            <button 
              className="draft-button"
              onClick={handleSaveAsDraft}
              disabled={publishStatus === 'publishing'}
            >
              <Save size={18} />
              Save as Draft
            </button>
            
            <button 
              className="publish-button"
              onClick={handlePublishClick}
              disabled={publishStatus === 'publishing'}
            >
              <Send size={18} />
              {publishStatus === 'published' ? 'Update Course' : 'Publish Course'}
            </button>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="confirmation-modal">
            <h3>Publish Course</h3>
            <p>
              Are you sure you want to publish this course? 
              Once published, it will be visible to students based on your enrollment settings.
            </p>
            
            {validationIssues.some(issue => issue.type === 'warning') && (
              <div className="modal-warnings">
                <h4>Warnings:</h4>
                <ul>
                  {validationIssues
                    .filter(issue => issue.type === 'warning')
                    .map(issue => (
                      <li key={issue.id}>{issue.message}</li>
                    ))
                  }
                </ul>
              </div>
            )}
            
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-button"
                onClick={handleConfirmPublish}
              >
                Yes, Publish Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}