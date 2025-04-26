import React, { useState } from "react";
import { Video, FileText, FileType, Clock, BookOpen, Calendar, Award, ChevronDown, ChevronRight, Layers } from "lucide-react";
import Module from "../../Module";
import Assignment from "../../Assignment";

import "../../../css/teacher/view/course-content.css"

const CourseContent = () => {
  // Sample initial course data
  const [modules, setModules] = useState([
    {
      id: "module-1",
      title: "Introduction to React",
      description: "Learn the fundamentals of React",
      isOpen: true,
      lessons: [
        {
          id: "lesson-1-1",
          title: "Setting up your Development Environment",
          description: "Install Node.js, npm, and create your first React app",
          type: "video",
          duration: "15 min",
          resourceCount: 2
        },
        {
          id: "lesson-1-2",
          title: "React Components and JSX",
          description: "Understanding the building blocks of React applications",
          type: "text",
          duration: "20 min",
          resourceCount: 1
        }
      ],
      assignments: [
        {
          id: "assignment-1-1",
          title: "Create a Simple React Component",
          description: "Build a functional component that displays user information",
          dueDate: "May 10, 2025",
          points: 10,
          status: "published"
        }
      ]
    },
    {
      id: "module-2",
      title: "State and Props",
      description: "Managing data flow in React applications",
      isOpen: false,
      lessons: [
        {
          id: "lesson-2-1",
          title: "Introduction to State",
          description: "Learn how to use useState hook",
          type: "video",
          duration: "25 min",
          resourceCount: 3
        },
        {
          id: "lesson-2-2",
          title: "Props and Component Communication",
          description: "Passing data between components",
          type: "attachment",
          duration: "30 min",
          resourceCount: 2
        }
      ],
      assignments: [
        {
          id: "assignment-2-1",
          title: "Build a Counter Application",
          description: "Create a React app that demonstrates state management",
          dueDate: "May 17, 2025",
          points: 15,
          status: "draft"
        }
      ]
    }
  ]);

  // Handler for toggling module open/closed
  const handleToggleModule = (moduleId) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, isOpen: !module.isOpen }
        : module
    ));
  };

  // Function to get the icon for lesson type
  const getLessonTypeIcon = (type) => {
    switch(type) {
      case 'video': return <Video size={16} className="lesson-type-icon" />;
      case 'text': return <FileText size={16} className="lesson-type-icon" />;
      case 'attachment': return <FileType size={16} className="lesson-type-icon" />;
      default: return <BookOpen size={16} className="lesson-type-icon" />;
    }
  };

  return (
    <div className="course-view-container">
      <div className="course-header">
        <h2 className="course-title">Course Content</h2>
        <div className="course-summary">
          <div className="summary-item">
            <Layers className="summary-icon" />
            <span>{modules.length} Modules</span>
          </div>
          <div className="summary-item">
            <FileText className="summary-icon" />
            <span>{modules.reduce((count, module) => count + module.lessons.length, 0)} Lessons</span>
          </div>
          <div className="summary-item">
            <Award className="summary-icon" />
            <span>{modules.reduce((count, module) => count + module.assignments.length, 0)} Assignments</span>
          </div>
        </div>
      </div>
      
      {modules.length === 0 ? (
        <div className="no-content">
          <BookOpen size={48} className="no-content-icon" />
          <h3>No content available</h3>
          <p>This course doesn't have any content yet.</p>
        </div>
      ) : (
        <div className="modules-list">
          {modules.map((module) => (
            <div key={module.id} className={`module ${module.isOpen ? 'module-expanded' : ''}`}>
              <div 
                className="module-header" 
                onClick={() => handleToggleModule(module.id)}
                tabIndex={0}
                role="button"
                aria-expanded={module.isOpen}
              >
                <div className="module-header-content">
                  <div className="module-toggle">
                    {module.isOpen ? 
                      <ChevronDown className="module-toggle-icon" /> : 
                      <ChevronRight className="module-toggle-icon" />
                    }
                  </div>
                  <div className="module-info">
                    <h3 className="module-title">{module.title}</h3>
                    {module.description && <p className="module-description">{module.description}</p>}
                  </div>
                </div>
                <div className="module-meta">
                  <span className="module-lessons-count">{module.lessons.length} lessons</span>
                </div>
              </div>
              
              {module.isOpen && (
                <div className="module-content">
                  {module.lessons.length > 0 && (
                    <div className="content-section">
                      <h4 className="section-title">Lessons</h4>
                      <ul className="lessons-list">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="lesson">
                            <div className="lesson-content">
                              <div className="lesson-icon-wrap">
                                {getLessonTypeIcon(lesson.type)}
                              </div>
                              <div className="lesson-details">
                                <h5 className="lesson-title">{lesson.title}</h5>
                                {lesson.description && <p className="lesson-description">{lesson.description}</p>}
                                <div className="lesson-meta">
                                  <span className="meta-item lesson-type">{lesson.type}</span>
                                  {lesson.duration && (
                                    <span className="meta-item lesson-duration">
                                      <Clock size={14} className="meta-icon" />
                                      {lesson.duration}
                                    </span>
                                  )}
                                  {lesson.resourceCount > 0 && (
                                    <span className="meta-item lesson-resources">
                                      <FileText size={14} className="meta-icon" />
                                      {lesson.resourceCount} resource{lesson.resourceCount !== 1 ? 's' : ''}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {module.assignments.length > 0 && (
                    <div className="content-section">
                      <h4 className="section-title">Assignments</h4>
                      <ul className="assignments-list">
                        {module.assignments.map((assignment) => (
                          <li key={assignment.id} className="assignment">
                            <div className="assignment-content">
                              <div className="assignment-icon-wrap">
                                <Award size={16} className="assignment-icon" />
                              </div>
                              <div className="assignment-details">
                                <h5 className="assignment-title">{assignment.title}</h5>
                                {assignment.description && <p className="assignment-description">{assignment.description}</p>}
                                <div className="assignment-meta">
                                  {assignment.dueDate && (
                                    <span className="meta-item assignment-due-date">
                                      <Calendar size={14} className="meta-icon" />
                                      Due: {assignment.dueDate}
                                    </span>
                                  )}
                                  {assignment.points > 0 && (
                                    <span className="meta-item assignment-points">
                                      <Award size={14} className="meta-icon" />
                                      {assignment.points} point{assignment.points !== 1 ? 's' : ''}
                                    </span>
                                  )}
                                  <span className={`meta-item assignment-status status-${assignment.status}`}>
                                    {assignment.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseContent;