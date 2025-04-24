import React, { useState } from 'react';
import CourseSummaryCard from '../../components/teacher/TeacherDashboard/CourseSummaryCard';
import PerformanceAnalytics from '../../components/teacher/TeacherDashboard/PerformanceAnalytics';
import UpcomingItems from '../../components/teacher/TeacherDashboard/UpcomingItems';
import ActivityFeed from '../../components/teacher/TeacherDashboard/ActivityFeed';
import QuickActions from '../../components/teacher/TeacherDashboard/QuickActions';
import { Bell, ChevronDown, Search, Settings } from 'lucide-react';
import '../../css/teacher/TeacherDashboard.css';

const TeacherDashboard = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Web Development',
      enrolled: 126,
      rating: 4.8,
      image: '/api/placeholder/400/225',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      enrolled: 89,
      rating: 4.9,
      image: '/api/placeholder/400/225',
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Data Structures for Beginners',
      enrolled: 215,
      rating: 4.7,
      image: '/api/placeholder/400/225',
      lastUpdated: '3 days ago'
    }
  ]);

  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Teacher Dashboard</h1>
          <p className="welcome-message">Welcome back, Prof. Jane!</p>
        </div>
        <div className="header-right">
          <div className="search-container">
            <Search size={18} />
            <input type="text" placeholder="Search..." />
          </div>
          <button className="icon-button">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <button className="icon-button">
            <Settings size={20} />
          </button>
          <div className="profile-dropdown">
            <button 
              className="profile-button" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img 
                src="/api/placeholder/40/40" 
                alt="Profile" 
                className="profile-image" 
              />
              <span>Jane Smith</span>
              <ChevronDown size={16} />
            </button>
            {showProfileMenu && (
              <div className="dropdown-menu">
                <a href="#">Profile</a>
                <a href="#">Account Settings</a>
                <a href="#">Help Center</a>
                <a href="#">Log Out</a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="dashboard-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <button className="text-button">View All</button>
          </div>
          <div className="course-grid">
            {courses.map(course => (
              <CourseSummaryCard key={course.id} course={course} />
            ))}
            <div className="add-course-card">
              <div className="add-course-content">
                <div className="plus-icon">+</div>
                <p>Create New Course</p>
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-row">
          <section className="dashboard-section analytics-section">
            <div className="section-header">
              <h2>Performance Analytics</h2>
              <div className="analytics-filters">
                <select defaultValue="lastWeek">
                  <option value="today">Today</option>
                  <option value="lastWeek">Last Week</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="lastYear">Last Year</option>
                </select>
              </div>
            </div>
            <PerformanceAnalytics />
          </section>
        </div>

        <div className="dashboard-row">
          <section className="dashboard-section upcoming-section">
            <div className="section-header">
              <h2>Upcoming Lessons & Tasks</h2>
              <button className="text-button">View Calendar</button>
            </div> 
          </section>

          <section className="dashboard-section activity-section">
            <div className="section-header">
              <h2>Student Activity</h2>
              <button className="text-button">View All Activity</button>
            </div>
          </section>
        </div>

        <section className="dashboard-section quick-actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;