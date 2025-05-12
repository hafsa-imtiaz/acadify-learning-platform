import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Star, Users, Award, FileText, Play, 
  ChevronDown, ChevronUp, Check, Download, Globe,
  BookOpen, MessageSquare, Calendar, User, AlertCircle,
  Info, HelpCircle, Lock, CheckCircle
} from 'lucide-react';
import '../../css/student/CourseView.css';

const CourseView = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  
  // Fetch course data
  useEffect(() => {
    // This would be replaced with an actual API call
    setTimeout(() => {
      // Mock course data
      const mockCourse = {
        id: parseInt(courseId),
        title: 'Introduction to React Development',
        instructor: {
          name: 'John Smith',
          title: 'Senior Frontend Developer',
          bio: 'John has been teaching web development for over 8 years and has worked with companies like Google and Facebook.',
          avatar: 'https://via.placeholder.com/150'
        },
        description: 'Learn React from the ground up and build modern, interactive web applications. This course covers everything from basics to advanced concepts.',
        image: 'https://via.placeholder.com/800x400',
        category: 'Programming',
        level: 'Beginner',
        rating: 4.8,
        reviewCount: 1254,
        duration: '30 hours',
        totalLessons: 42,
        completedLessons: 16,
        progress: 38,
        enrollmentDate: '2025-03-15',
        lastAccessed: '2025-05-08',
        language: 'English',
        hasCertificate: true,
        sections: [
          {
            id: 1,
            title: 'Getting Started with React',
            progress: 100,
            lessons: [
              { 
                id: 101, 
                title: 'Introduction to the Course', 
                type: 'video',
                duration: '8:45', 
                completed: true,
                locked: false
              },
              { 
                id: 102, 
                title: 'Setting Up Your Development Environment', 
                type: 'video',
                duration: '12:20', 
                completed: true,
                locked: false
              },
              { 
                id: 103, 
                title: 'Creating Your First React App', 
                type: 'video',
                duration: '15:30', 
                completed: true,
                locked: false
              },
              { 
                id: 104, 
                title: 'Section 1 Quiz', 
                type: 'quiz',
                duration: '10:00', 
                completed: true,
                locked: false
              }
            ]
          },
          {
            id: 2,
            title: 'React Components and Props',
            progress: 75,
            lessons: [
              { 
                id: 201, 
                title: 'Understanding Components', 
                type: 'video',
                duration: '14:15', 
                completed: true,
                locked: false
              },
              { 
                id: 202, 
                title: 'Functional vs Class Components', 
                type: 'video',
                duration: '18:30', 
                completed: true,
                locked: false
              },
              { 
                id: 203, 
                title: 'Working with Props', 
                type: 'video',
                duration: '20:45', 
                completed: true,
                locked: false
              },
              { 
                id: 204, 
                title: 'Component Composition', 
                type: 'video',
                duration: '16:20', 
                completed: false,
                locked: false
              },
              { 
                id: 205, 
                title: 'Section 2 Assignment', 
                type: 'assignment',
                duration: '45:00', 
                completed: false,
                locked: false
              }
            ]
          },
          {
            id: 3,
            title: 'State and Lifecycle',
            progress: 0,
            lessons: [
              { 
                id: 301, 
                title: 'Introduction to State', 
                type: 'video',
                duration: '12:30', 
                completed: false,
                locked: false
              },
              { 
                id: 302, 
                title: 'Using the useState Hook', 
                type: 'video',
                duration: '15:45', 
                completed: false,
                locked: false
              },
              { 
                id: 303, 
                title: 'Component Lifecycle', 
                type: 'video',
                duration: '18:20', 
                completed: false,
                locked: false
              },
              { 
                id: 304, 
                title: 'useEffect Hook', 
                type: 'video',
                duration: '22:15', 
                completed: false,
                locked: false
              },
              { 
                id: 305, 
                title: 'State Management Practice', 
                type: 'exercise',
                duration: '30:00', 
                completed: false,
                locked: false
              }
            ]
          },
          {
            id: 4,
            title: 'Handling Events and Forms',
            progress: 0,
            lessons: [
              { 
                id: 401, 
                title: 'Event Handling in React', 
                type: 'video',
                duration: '14:20', 
                completed: false,
                locked: true
              },
              { 
                id: 402, 
                title: 'Controlled Components', 
                type: 'video',
                duration: '16:35', 
                completed: false,
                locked: true
              },
              { 
                id: 403, 
                title: 'Building Forms in React', 
                type: 'video',
                duration: '20:10', 
                completed: false,
                locked: true
              },
              { 
                id: 404, 
                title: 'Form Validation', 
                type: 'video',
                duration: '18:45', 
                completed: false,
                locked: true
              }
            ]
          }
        ],
        assignments: [
          {
            id: 1,
            title: 'Create a Component Hierarchy',
            dueDate: '2025-05-20',
            status: 'pending'
          },
          {
            id: 2,
            title: 'Build a To-Do List App',
            dueDate: '2025-06-05',
            status: 'pending'
          }
        ],
        announcements: [
          {
            id: 1,
            title: 'Live Q&A Session This Friday',
            date: '2025-05-05',
            content: 'Join us for a live Q&A session this Friday at 3 PM EST. We\'ll be discussing common React patterns and answering your questions.'
          },
          {
            id: 2,
            title: 'New Bonus Lecture Added',
            date: '2025-04-28',
            content: 'I\'ve added a new bonus lecture on React performance optimization techniques. Check it out in the bonus section!'
          }
        ],
        resources: [
          {
            id: 1,
            title: 'React Official Documentation',
            type: 'link',
            url: 'https://reactjs.org/docs/getting-started.html'
          },
          {
            id: 2,
            title: 'Component Templates Package',
            type: 'download',
            size: '2.4 MB'
          },
          {
            id: 3,
            title: 'React Design Patterns Cheat Sheet',
            type: 'download',
            size: '1.1 MB'
          }
        ]
      };
      
      setCourse(mockCourse);
      setActiveSection(mockCourse.sections[0].id);
      setLoading(false);
    }, 1000);
  }, [courseId]);
  
  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };
  
  // Get the current section
  const getCurrentSection = () => {
    if (!course) return null;
    return course.sections.find(section => section.id === activeSection);
  };
  
  // Format duration
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  // Get lesson icon
  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return <Play size={16} />;
      case 'quiz':
        return <HelpCircle size={16} />;
      case 'assignment':
        return <FileText size={16} />;
      case 'exercise':
        return <Clock size={16} />;
      default:
        return <Info size={16} />;
    }
  };
  
  // Get next lesson
  const getNextLesson = () => {
    if (!course) return null;
    
    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        if (!lesson.completed && !lesson.locked) {
          return { section, lesson };
        }
      }
    }
    
    return null;
  };

  if (loading) {
    return <div className="course-loading">Loading course content...</div>;
  }

  if (!course) {
    return <div className="course-error">Course not found</div>;
  }
  
  const nextLesson = getNextLesson();

  return (
    <div className="course-view">
      {/* Course Header */}
      <div className="course-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${course.image})` }}>
        <div className="course-header-content">
          <div className="course-details">
            <div className="course-category">{course.category}</div>
            <h1 className="course-title">{course.title}</h1>
            
            <div className="course-meta">
              <div className="meta-item">
                <Star className="meta-icon" />
                <span>{course.rating} ({course.reviewCount} reviews)</span>
              </div>
              <div className="meta-item">
                <Users className="meta-icon" />
                <span>Instructor: {course.instructor.name}</span>
              </div>
              <div className="meta-item">
                <Clock className="meta-icon" />
                <span>{course.duration}</span>
              </div>
              <div className="meta-item">
                <Globe className="meta-icon" />
                <span>{course.language}</span>
              </div>
            </div>
          </div>
          
          <div className="course-progress-card">
            <div className="progress-header">
              <h3>Your Progress</h3>
              <span className="progress-percent">{course.progress}%</span>
            </div>
            
            <div className="progress-bar">
              <div className="progress-value" style={{ width: `${course.progress}%` }}></div>
            </div>
            
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-value">{course.completedLessons}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">{course.totalLessons}</span>
                <span className="stat-label">Total Lessons</span>
              </div>
            </div>
            
            {nextLesson && (
              <Link to={`/student/course/${course.id}/lesson/${nextLesson.lesson.id}`} className="continue-button">
                Continue Learning
              </Link>
            )}
            
            <div className="enrollment-info">
              <Calendar className="info-icon" />
              <span>Enrolled on {formatDate(course.enrollmentDate)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Navigation */}
      <div className="course-navigation">
        <button 
          className={`nav-tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          <BookOpen size={18} />
          <span>Course Content</span>
        </button>
        
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Info size={18} />
          <span>Overview</span>
        </button>
        
        <button 
          className={`nav-tab ${activeTab === 'assignments' ? 'active' : ''}`}
          onClick={() => setActiveTab('assignments')}
        >
          <FileText size={18} />
          <span>Assignments</span>
          {course.assignments.length > 0 && (
            <span className="tab-badge">{course.assignments.length}</span>
          )}
        </button>
        
        <button 
          className={`nav-tab ${activeTab === 'announcements' ? 'active' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          <AlertCircle size={18} />
          <span>Announcements</span>
          {course.announcements.length > 0 && (
            <span className="tab-badge">{course.announcements.length}</span>
          )}
        </button>
        
        <button 
          className={`nav-tab ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <Download size={18} />
          <span>Resources</span>
        </button>
        
        <button 
          className={`nav-tab ${activeTab === 'discussions' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussions')}
        >
          <MessageSquare size={18} />
          <span>Discussions</span>
        </button>
      </div>
      
      {/* Course Content */}
      <div className="course-content">
        {activeTab === 'content' && (
          <div className="course-curriculum">
            <h2 className="section-title">Curriculum</h2>
            
            <div className="curriculum-stats">
              <div className="stat-item">
                <FileText className="stat-icon" />
                <div className="stat-text">
                  <span className="stat-value">{course.totalLessons} lessons</span>
                  <span className="stat-label">{course.duration} of content</span>
                </div>
              </div>
              
              <div className="stat-item">
                <Award className="stat-icon" />
                <div className="stat-text">
                  <span className="stat-value">Certificate of Completion</span>
                  <span className="stat-label">Finish the course to earn</span>
                </div>
              </div>
            </div>
            
            <div className="curriculum-sections">
              {course.sections.map(section => (
                <div className="curriculum-section" key={section.id}>
                  <div 
                    className="section-header"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="section-info">
                      <h3 className="section-name">{section.title}</h3>
                      <div className="section-meta">
                        <span>{section.lessons.length} lessons</span>
                        <span className="section-progress">
                          {section.progress}% complete
                        </span>
                      </div>
                    </div>
                    <div className="section-toggle">
                      {activeSection === section.id ? 
                        <ChevronUp size={20} /> : 
                        <ChevronDown size={20} />
                      }
                    </div>
                  </div>
                  
                  {activeSection === section.id && (
                    <div className="section-lessons">
                      {section.lessons.map(lesson => (
                        <Link 
                          to={lesson.locked ? '#' : `/student/course/${course.id}/lesson/${lesson.id}`}
                          className={`lesson-item ${lesson.locked ? 'locked' : ''} ${lesson.completed ? 'completed' : ''}`}
                          key={lesson.id}
                        >
                          <div className="lesson-icon">
                            {lesson.locked ? <Lock size={16} /> : 
                              lesson.completed ? <CheckCircle size={16} /> : 
                              getLessonIcon(lesson.type)
                            }
                          </div>
                          <div className="lesson-info">
                            <span className="lesson-title">{lesson.title}</span>
                            <div className="lesson-meta">
                              <span className="lesson-type">{lesson.type}</span>
                              <span className="lesson-duration">{lesson.duration}</span>
                            </div>
                          </div>
                          <div className="lesson-status">
                            {lesson.locked ? 
                              <span className="status-locked">Locked</span> :
                              lesson.completed ? 
                              <span className="status-completed">Completed</span> :
                              <span className="status-start">Start</span>
                            }
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'overview' && (
          <div className="course-overview">
            <div className="overview-section">
              <h2 className="section-title">About This Course</h2>
              <p className="course-description">{course.description}</p>
              
              <div className="course-features">
                <div className="feature">
                  <div className="feature-icon">
                    <Clock size={20} />
                  </div>
                  <div className="feature-text">
                    <h4>Duration</h4>
                    <p>{course.duration}</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <BookOpen size={20} />
                  </div>
                  <div className="feature-text">
                    <h4>Level</h4>
                    <p>{course.level}</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <FileText size={20} />
                  </div>
                  <div className="feature-text">
                    <h4>Lessons</h4>
                    <p>{course.totalLessons} lessons</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <Award size={20} />
                  </div>
                  <div className="feature-text">
                    <h4>Certificate</h4>
                    <p>{course.hasCertificate ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overview-section">
              <h2 className="section-title">Meet Your Instructor</h2>
              <div className="instructor-card">
                <div className="instructor-avatar">
                  <img src={course.instructor.avatar} alt={course.instructor.name} />
                </div>
                <div className="instructor-info">
                  <h3 className="instructor-name">{course.instructor.name}</h3>
                  <p className="instructor-title">{course.instructor.title}</p>
                  <p className="instructor-bio">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'assignments' && (
          <div className="course-assignments">
            <h2 className="section-title">Assignments</h2>
            
            {course.assignments.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FileText size={48} />
                </div>
                <h3>No assignments yet</h3>
                <p>The instructor hasn't added any assignments</p>
              </div>
            ) : (
              <div className="assignments-list">
                {course.assignments.map(assignment => (
                  <div className="assignment-card" key={assignment.id}>
                    <div className="assignment-icon">
                      <FileText size={24} />
                    </div>
                    <div className="assignment-info">
                      <h3 className="assignment-title">{assignment.title}</h3>
                      <div className="assignment-meta">
                        <span className="due-date">Due: {formatDate(assignment.dueDate)}</span>
                        <span className={`status ${assignment.status}`}>
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="assignment-action">
                      <Link to={`/student/assignment/${assignment.id}`} className="view-assignment">
                        View Assignment
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'announcements' && (
          <div className="course-announcements">
            <h2 className="section-title">Announcements</h2>
            
            {course.announcements.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <AlertCircle size={48} />
                </div>
                <h3>No announcements yet</h3>
                <p>The instructor hasn't posted any announcements</p>
              </div>
            ) : (
              <div className="announcements-list">
                {course.announcements.map(announcement => (
                  <div className="announcement-card" key={announcement.id}>
                    <div className="announcement-date">
                      {formatDate(announcement.date)}
                    </div>
                    <h3 className="announcement-title">{announcement.title}</h3>
                    <p className="announcement-content">{announcement.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'resources' && (
          <div className="course-resources">
            <h2 className="section-title">Resources</h2>
            
            {course.resources.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Download size={48} />
                </div>
                <h3>No resources yet</h3>
                <p>The instructor hasn't added any resources</p>
              </div>
            ) : (
              <div className="resources-list">
                {course.resources.map(resource => (
                  <div className="resource-card" key={resource.id}>
                    <div className="resource-icon">
                      {resource.type === 'link' ? <Globe size={24} /> : <Download size={24} />}
                    </div>
                    <div className="resource-info">
                      <h3 className="resource-title">{resource.title}</h3>
                      {resource.type === 'download' && (
                        <span className="resource-size">{resource.size}</span>
                      )}
                    </div>
                    <div className="resource-action">
                      {resource.type === 'link' ? (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                          Open Link
                        </a>
                      ) : (
                        <button className="resource-download">
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'discussions' && (
          <div className="course-discussions">
            <h2 className="section-title">Discussions</h2>
            
            <div className="empty-state">
              <div className="empty-icon">
                <MessageSquare size={48} />
              </div>
              <h3>Join the conversation</h3>
              <p>Discussions are coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseView;