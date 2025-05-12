import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Clock, CheckCircle, Calendar, FileText, Award,
  Play, BookmarkIcon, Star, AlertCircle, MessageSquare
} from 'lucide-react';
import '../../css/student/Dashboard.css';
import reactImg from '../../assets/react.jpg';
import jsImg from '../../assets/js.png';
import uiImg from '../../assets/uiux.webp';
import webImg from '../../assets/web.jpeg';
import pythonImg from '../../assets/python.jpg';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  
  // Get current date
  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  // Simulated data fetching
  useEffect(() => {
    // In a real app, these would be API calls
    setTimeout(() => {
      // Mock enrolled courses data
      const coursesData = [
        {
          id: 1,
          title: "Introduction to React",
          instructor: "John Smith",
          progress: 65,
          nextLesson: "React Hooks",
          dueAssignments: 2,
          lastAccessed: "2 days ago",
          image: reactImg,
          totalLessons: 24,
          completedLessons: 16
        },
        {
          id: 2,
          title: "Advanced JavaScript",
          instructor: "Jane Doe",
          progress: 40,
          nextLesson: "Promises and Async/Await",
          dueAssignments: 1,
          lastAccessed: "Yesterday",
          image: jsImg,
          totalLessons: 32,
          completedLessons: 13
        },
        {
          id: 3,
          title: "UI/UX Design Fundamentals",
          instructor: "Mike Johnson",
          progress: 20,
          nextLesson: "User Research Methods",
          dueAssignments: 0,
          lastAccessed: "5 days ago",
          image: uiImg,
          totalLessons: 18,
          completedLessons: 4
        },
        {
          id: 4,
          title: "Python for Data Science",
          instructor: "Sarah Williams",
          progress: 85,
          nextLesson: "Machine Learning Basics",
          dueAssignments: 1,
          lastAccessed: "Today",
          image: pythonImg,
          totalLessons: 28,
          completedLessons: 24
        }
      ];
      
      // Mock upcoming assignments data
      const assignmentsData = [
        {
          id: 101,
          title: "JavaScript DOM Manipulation",
          courseId: 2,
          courseName: "Advanced JavaScript",
          dueDate: "2025-05-15",
          description: "Create a responsive image gallery using JavaScript",
          status: "pending"
        },
        {
          id: 102,
          title: "React Component Lifecycle",
          courseId: 1,
          courseName: "Introduction to React",
          dueDate: "2025-05-18",
          description: "Create a weather application using React hooks",
          status: "pending"
        },
        {
          id: 103,
          title: "Python Data Analysis Project",
          courseId: 4,
          courseName: "Python for Data Science",
          dueDate: "2025-05-20",
          description: "Analyze a dataset and create visualizations",
          status: "pending"
        }
      ];
      
      // Mock certificates data
      const certificatesData = [
        {
          id: 201,
          title: "Web Development Fundamentals",
          issueDate: "2025-03-15",
          image: webImg
        },
        {
          id: 202,
          title: "HTML & CSS Masterclass",
          issueDate: "2025-02-10",
          image: "https://via.placeholder.com/100"
        }
      ];
      
      // Calculate overall progress
      const totalProgress = coursesData.reduce((sum, course) => sum + course.progress, 0);
      const calculatedOverallProgress = Math.round(totalProgress / coursesData.length);
      
      setEnrolledCourses(coursesData);
      setUpcomingAssignments(assignmentsData);
      setCertificates(certificatesData);
      setOverallProgress(calculatedOverallProgress);
      setLoading(false);
    }, 1000);
  }, []);

  // Get days remaining until due date
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays < 0) return 'Overdue';
    return `${diffDays} days left`;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="student-dashboard">
      
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="welcome-content">
          <h1>Welcome back, John!</h1>
          <p>{formattedDate}</p>
          <div className="progress-overview">
            <div className="progress-text">
              <span>Your overall progress</span>
              <span className="progress-percentage">{overallProgress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-value" style={{ width: `${overallProgress}%` }}></div>
            </div>
          </div>
        </div>
        <div className="welcome-cards">
          <div className="welcome-card">
            <div className="card-icon">
              <BookOpen />
            </div>
            <div className="card-info">
              <h3>{enrolledCourses.length}</h3>
              <p>Enrolled Courses</p>
            </div>
          </div>
          <div className="welcome-card">
            <div className="card-icon">
              <FileText />
            </div>
            <div className="card-info">
              <h3>{upcomingAssignments.length}</h3>
              <p>Due Assignments</p>
            </div>
          </div>
          <div className="welcome-card">
            <div className="card-icon">
              <Award />
            </div>
            <div className="card-info">
              <h3>{certificates.length}</h3>
              <p>Certificates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-title-row">
        <h2>Quick Actions</h2>
      </div>
      
      <div className="quick-actions">
        <Link to="/student/courses" className="action-card">
          <div className="action-icon">
            <BookOpen />
          </div>
          <div className="action-text">
            <h3>Browse Courses</h3>
            <p>Discover new learning opportunities</p>
          </div>
        </Link>
        
        <Link to="/student/assignments" className="action-card">
          <div className="action-icon">
            <FileText />
          </div>
          <div className="action-text">
            <h3>View Assignments</h3>
            <p>Check your pending tasks</p>
          </div>
        </Link>
        
        <Link to="/student/discussions" className="action-card">
          <div className="action-icon">
            <MessageSquare />
          </div>
          <div className="action-text">
            <h3>Discussions</h3>
            <p>Engage with your peers</p>
          </div>
        </Link>
        
        <Link to="/student/live-sessions" className="action-card">
          <div className="action-icon">
            <Play />
          </div>
          <div className="action-text">
            <h3>Live Sessions</h3>
            <p>Join upcoming webinars</p>
          </div>
        </Link>
      </div>

      {/* My Courses */}
      <div className="section-title-row">
        <h2>My Courses</h2>
        <Link to="/student/courses" className="view-all">View All</Link>
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading courses...</div>
      ) : (
        <div className="courses-grid">
          {enrolledCourses.slice(0, 3).map(course => (
            <div className="course-card" key={course.id}>
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-progress-indicator">
                  <span className="progress-text">{course.progress}%</span>
                </div>
              </div>
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-instructor">Instructor: {course.instructor}</p>
                
                <div className="course-stats">
                  <div className="stat">
                    <Clock className="stat-icon" />
                    <span>Last accessed: {course.lastAccessed}</span>
                  </div>
                  <div className="stat">
                    <BookmarkIcon className="stat-icon" />
                    <span>Next: {course.nextLesson}</span>
                  </div>
                </div>
                
                <div className="course-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-value" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="lessons-count">
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                </div>
                
                <div className="course-actions">
                  <Link to={`/student/course/${course.id}`} className="btn-primary">
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Assignments */}
      <div className="section-title-row">
        <h2>Upcoming Assignments</h2>
        <Link to="/student/assignments" className="view-all">View All</Link>
      </div>
      
      <div className="assignments-list">
        {upcomingAssignments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <CheckCircle size={48} />
            </div>
            <h3>No pending assignments!</h3>
            <p>You're all caught up. Great job!</p>
          </div>
        ) : (
          upcomingAssignments.map(assignment => (
            <div className="assignment-item" key={assignment.id}>
              <div className="assignment-date">
                <span className="day">{formatDate(assignment.dueDate)}</span>
                <span className="time-left">
                  {getDaysRemaining(assignment.dueDate)}
                </span>
              </div>
              <div className="assignment-details">
                <h4>{assignment.title}</h4>
                <p>{assignment.description}</p>
                <span className="course-badge">{assignment.courseName}</span>
              </div>
              <div className="assignment-actions">
                <Link to={`/student/assignment/${assignment.id}`} className="btn-outline">
                  Start Now
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Certifications */}
      <div className="section-title-row">
        <h2>My Achievements</h2>
        <Link to="/student/achievements" className="view-all">View All</Link>
      </div>
      
      <div className="achievements-section">
        {certificates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <AlertCircle size={48} />
            </div>
            <h3>No certificates yet</h3>
            <p>Complete courses to earn certificates</p>
          </div>
        ) : (
          <div className="certificates-grid">
            {certificates.map(certificate => (
              <div className="certificate-card" key={certificate.id}>
                <div className="certificate-icon">
                  <Award size={36} />
                </div>
                <div className="certificate-content">
                  <h4>{certificate.title}</h4>
                  <p>Issued on {certificate.issueDate}</p>
                  <div className="certificate-badge">
                    <Star size={14} />
                    <span>Certificate</span>
                  </div>
                </div>
                <Link to={`/student/certificate/${certificate.id}`} className="view-certificate">
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;