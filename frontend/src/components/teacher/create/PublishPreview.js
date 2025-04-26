import React, { useState, useEffect } from 'react';
import { Eye, Save, Send, CheckCircle, AlertCircle, Info, Book, Clock, Award, Play, FileText, Download, User, Users, Archive, Trash2 } from 'lucide-react';
import '../../../css/teacher/create/publish-preview.css';
import { useNavigate } from 'react-router-dom';

export default function PublishPreview({ courseData = {}, onPublish = () => {}, isEditMode = false }) {
  const navigate = useNavigate();
  const [publishStatus, setPublishStatus] = useState('draft'); // 'draft', 'published', 'publishing', 'archived'
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [validationIssues, setValidationIssues] = useState([]);
  const [modalAction, setModalAction] = useState(''); // 'publish', 'delete', 'archive'
  
  useEffect(() => {
    // Check if courseData exists and has required properties
    if (!courseData) return;
    
    // Set initial status from courseData if available
    if (courseData.status) {
      setPublishStatus(courseData.status);
    }
    
    // Perform validation checks on courseData
    const issues = [];
    
    // Check description
    if (!courseData.description || courseData.description.length < 50) {
      issues.push({ id: 1, type: 'warning', message: 'Course description could be more detailed' });
    }
    
    // Check if any lesson content is empty
    let hasEmptyLesson = false;
    if (courseData.modules && Array.isArray(courseData.modules)) {
      courseData.modules.forEach(module => {
        if (module.lessons && Array.isArray(module.lessons)) {
          module.lessons.forEach(lesson => {
            if (!lesson.content || lesson.content.trim() === '') {
              hasEmptyLesson = true;
            }
          });
        }
      });
    }
    
    if (hasEmptyLesson) {
      issues.push({ id: 2, type: 'error', message: 'At least one lesson content is empty' });
    }
    
    setValidationIssues(issues);
  }, [courseData]);

  const handleSaveAsDraft = () => {
    // Only allow saving as draft if not already published
    if (publishStatus !== 'published') {
      const updatedCourse = { ...courseData, status: 'draft' };
      onPublish(updatedCourse);
      navigate('/teacher/courses');
    }
  };

  const handlePublishClick = () => {
    // Check if there are any error-type validation issues
    const hasErrors = validationIssues.some(issue => issue.type === 'error');
    
    if (hasErrors) {
      // If there are errors, we can't publish yet
      alert('Please fix all errors before publishing');
    } else {
      // If no errors, show confirmation modal
      setModalAction('publish');
      setShowConfirmModal(true);
    }
  };

  const handleConfirmPublish = () => {
    setPublishStatus('publishing');
    setShowConfirmModal(false);
    
    // Simulate publishing process
    setTimeout(() => {
      const updatedCourse = { ...courseData, status: 'published' };
      onPublish(updatedCourse);
      setPublishStatus('published');
      navigate('/teacher/courses');
    }, 2000);
  };

  const handleDeleteClick = () => {
    setModalAction('delete');
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Pass null or a delete flag to the parent component
    onPublish({ ...courseData, _delete: true });
    setShowDeleteModal(false);
    navigate('/teacher/courses');
  };

  const handleArchiveClick = () => {
    setModalAction('archive');
    setShowArchiveModal(true);
  };

  const handleConfirmArchive = () => {
    const updatedCourse = { ...courseData, status: 'archived' };
    onPublish(updatedCourse);
    setShowArchiveModal(false);
    setPublishStatus('archived');
    navigate('/teacher/courses');
  };

  const handleUpdateCourse = () => {
    // For published or archived courses, we update them without changing status
    const updatedCourse = { ...courseData };
    onPublish(updatedCourse);
    navigate('/teacher/courses');
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
    
    if (!previewMode) {
      // If entering preview mode, you might want to save current state first
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
    // Safety check for courseData
    if (!courseData) {
      return <div>No course data available</div>;
    }
    
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
                <h2>{courseData.title || 'Untitled Course'}</h2>
                <div className="course-instructor">
                  <User size={16} />
                  <span>Instructor: {courseData.instructor || 'Unknown'}</span>
                </div>
                <div className="course-stats">
                  <div className="stat-item">
                    <Clock size={16} />
                    <span>{courseData.duration || 'Not specified'}</span>
                  </div>
                  <div className="stat-item">
                    <Users size={16} />
                    <span>{courseData.enrolledStudents || 0} students</span>
                  </div>
                  <div className="stat-item">
                    <Award size={16} />
                    <span>{courseData.level || 'Not specified'}</span>
                  </div>
                </div>
                <div className="course-tags">
                  {courseData.tags && Array.isArray(courseData.tags) ? 
                    courseData.tags.map((tag, index) => (
                      <span key={index} className="course-tag">{tag}</span>
                    )) : 
                    <span className="course-tag">No tags</span>
                  }
                </div>
              </div>
            </div>
            
            <div className="course-description">
              <h3>About This Course</h3>
              <p>{courseData.description || 'No description available'}</p>
            </div>
            
            <div className="course-summary">
              <div className="summary-item">
                <h4>Last Updated</h4>
                <p>{courseData.lastUpdated || 'Not available'}</p>
              </div>
              <div className="summary-item">
                <h4>Language</h4>
                <p>{courseData.language || 'Not specified'}</p>
              </div>
              <div className="summary-item">
                <h4>Total Modules</h4>
                <p>{courseData.modules && Array.isArray(courseData.modules) ? courseData.modules.length : 0}</p>
              </div>
              <div className="summary-item">
                <h4>Total Lessons</h4>
                <p>{courseData.modules && Array.isArray(courseData.modules) ? 
                  courseData.modules.reduce((acc, module) => 
                    acc + (module.lessons && Array.isArray(module.lessons) ? module.lessons.length : 0), 0) : 0}
                </p>
              </div>
            </div>
          </div>
        );
      case 'curriculum':
        return (
          <div className="course-curriculum">
            <h3>Course Curriculum</h3>
            
            {courseData.modules && Array.isArray(courseData.modules) ? 
              courseData.modules.map(module => (
                <div key={module.id} className="curriculum-module">
                  <div className="module-header">
                    <h4>{module.title || 'Untitled Module'}</h4>
                    <span className="module-lesson-count">
                      {module.lessons && Array.isArray(module.lessons) ? module.lessons.length : 0} lessons
                    </span>
                  </div>
                  <p className="module-description">{module.description || 'No description available'}</p>
                  
                  <ul className="module-lessons">
                    {module.lessons && Array.isArray(module.lessons) ? 
                      module.lessons.map(lesson => (
                        <li key={lesson.id} className="lesson-item">
                          <div className="lesson-info">
                            {getLessonTypeIcon(lesson.type)}
                            <span className="lesson-title">{lesson.title || 'Untitled Lesson'}</span>
                          </div>
                          <div className="lesson-meta">
                            <span className="lesson-type">{lesson.type || 'unknown'}</span>
                            <span className="lesson-duration">
                              <Clock size={14} />
                              {lesson.duration || 'N/A'}
                            </span>
                          </div>
                        </li>
                      )) : 
                      <li className="lesson-item">No lessons available</li>
                    }
                  </ul>
                </div>
              )) : 
              <div>No modules available</div>
            }
          </div>
        );
      case 'resources':
        return (
          <div className="course-resources">
            <h3>Course Resources</h3>
            <div className="resources-list">
              {courseData.resources && Array.isArray(courseData.resources) && courseData.resources.length > 0 ? 
                courseData.resources.map((resource, index) => (
                  <div key={index} className="resource-item">
                    <FileText size={18} />
                    <div className="resource-details">
                      <h4>{resource.title || 'Untitled Resource'}</h4>
                      <p>{resource.description || 'No description available'}</p>
                    </div>
                    <button className="resource-download">
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                )) : 
                <>
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
                </>
              }
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStatusBadge = () => {
    let statusText = '';
    
    switch(publishStatus) {
      case 'draft':
        statusText = 'Draft';
        break;
      case 'published':
        statusText = 'Published';
        break;
      case 'publishing':
        statusText = 'Publishing...';
        break;
      case 'archived':
        statusText = 'Archived';
        break;
      default:
        statusText = 'Draft';
    }
    
    return (
      <div className="status-badge" data-status={publishStatus}>
        {statusText}
      </div>
    );
  };

  const renderActionButtons = () => {
    if (previewMode) {
      return (
        <button 
          className="preview-button"
          onClick={togglePreviewMode}
        >
          <Eye size={18} />
          Exit Preview
        </button>
      );
    }
    
    // Determine which buttons to show based on publish status and edit mode
    return (
      <>
        <button 
          className="preview-button"
          onClick={togglePreviewMode}
        >
          <Eye size={18} />
          Preview as Student
        </button>
        
        {/* Show draft button only if course is not published */}
        {publishStatus !== 'published' && publishStatus !== 'archived' && (
          <button 
            className="draft-button"
            onClick={handleSaveAsDraft}
            disabled={publishStatus === 'publishing'}
          >
            <Save size={18} />
            Save as Draft
          </button>
        )}
        
        {/* For draft courses - show publish button */}
        {publishStatus === 'draft' && (
          <button 
            className="publish-button"
            onClick={handlePublishClick}
            disabled={publishStatus === 'publishing'}
          >
            <Send size={18} />
            Publish Course
          </button>
        )}
        
        {/* For published or archived courses - show update button */}
        {(publishStatus === 'published' || publishStatus === 'archived') && (
          <button 
            className="update-button"
            onClick={handleUpdateCourse}
          >
            <CheckCircle size={18} />
            Update Course
          </button>
        )}
        
        {/* For published courses - show archive option */}
        {publishStatus === 'published' && (
          <button 
            className="archive-button"
            onClick={handleArchiveClick}
          >
            <Archive size={18} />
            Archive Course
          </button>
        )}
        
        {/* Only show delete in edit mode */}
        {isEditMode && (
          <button 
            className="delete-button"
            onClick={handleDeleteClick}
          >
            <Trash2 size={18} />
            Delete Course
          </button>
        )}
      </>
    );
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
            {previewMode ? 'Course Preview' : isEditMode ? 'Edit Course' : 'Publish Your Course'}
          </h2>
          
          {!previewMode && renderStatusBadge()}
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
              <h3>
                {isEditMode 
                  ? 'Make changes to your course' 
                  : 'Ready to share your knowledge?'}
              </h3>
              <p>
                {isEditMode
                  ? publishStatus === 'published' 
                    ? 'You can update your published course or archive it if you no longer want it to be visible to students.'
                    : publishStatus === 'archived'
                    ? 'You can update your archived course or delete it permanently.'
                    : 'Finalize your course before publishing it to students.'
                  : 'Publishing your course will make it available to students based on your enrollment settings.'}
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
        {renderActionButtons()}
      </div>

      {/* Publish Confirmation Modal */}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="confirmation-modal">
            <h3>Delete Course</h3>
            <p>
              Are you sure you want to delete this course? This action cannot be undone.
              {publishStatus === 'published' && ' Consider archiving the course instead of deleting it.'}
            </p>
            
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="delete-button"
                onClick={handleConfirmDelete}
              >
                Yes, Delete Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal */}
      {showArchiveModal && (
        <div className="modal-backdrop">
          <div className="confirmation-modal">
            <h3>Archive Course</h3>
            <p>
              Are you sure you want to archive this course? 
              Archiving will make it unavailable to new students, but existing students will still have access.
              You can update or delete an archived course later.
            </p>
            
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowArchiveModal(false)}
              >
                Cancel
              </button>
              <button 
                className="archive-button"
                onClick={handleConfirmArchive}
              >
                Yes, Archive Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}