import React, { useState } from 'react';
import CourseSummaryCard from '../../components/teacher/TeacherDashboard/CourseSummaryCard';
import PerformanceAnalytics from '../../components/teacher/TeacherDashboard/PerformanceAnalytics';
import UpcomingItems from '../../components/teacher/TeacherDashboard/UpcomingItems';
import ActivityFeed from '../../components/teacher/TeacherDashboard/ActivityFeed';
import QuickActions from '../../components/teacher/TeacherDashboard/QuickActions';
import TeacherLayout from '../../components/teacher/sidebar';
import '../../css/teacher/TeacherDashboard.css';

const TeacherDashboard = () => {
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
    <TeacherLayout>
      <div className="dashboard-content">
        <section className="dashboard-section quick-actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <QuickActions />
        </section>
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
            <UpcomingItems />
          </section>

          <section className="dashboard-section activity-section">
            <div className="section-header">
              <h2>Student Activity</h2>
              <button className="text-button">View All Activity</button>
            </div>
            <ActivityFeed />
          </section>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;