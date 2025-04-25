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
      <div className="dashboard-content-td">
        <div className="dashboard-header-td">
          <h1>Teacher Dashboard</h1>
          <div className="date-display-td">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="dashboard-grid-td">
          {/* Top row: Quick Actions */}
          <section className="dashboard-section-td quick-actions-section-td">
            <div className="section-header-td">
              <h2>Quick Actions</h2>
            </div>
            <QuickActions />
          </section>

          {/* Second row: Analytics */}
          <section className="dashboard-section-td analytics-section-td">
            <div className="section-header-td">
              <h2>Performance Analytics</h2>
              <div className="analytics-filters-td">
                <select defaultValue="lastWeek" className="time-filter-td">
                  <option value="today">Today</option>
                  <option value="lastWeek">Last Week</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="lastYear">Last Year</option>
                </select>
              </div>
            </div>
            <PerformanceAnalytics />
          </section>

          {/* Third row: My Courses */}
          <section className="dashboard-section-td courses-section-td">
            <div className="section-header-td">
              <h2>My Courses</h2>
              <button className="text-button-td">View All</button>
            </div>
            <div className="course-grid-td">
              {courses.map(course => (
                <CourseSummaryCard key={course.id} course={course} />
              ))}
              <div className="add-course-card-td">
                <div className="add-course-content-td">
                  <div className="plus-icon-td">+</div>
                  <p>Create New Course</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom row: Two columns with Upcoming Items and Activity Feed */}
          <div className="bottom-row-td">
            <section className="dashboard-section-td upcoming-section-td">
              <div className="section-header-td">
                <h2>Upcoming Lessons & Tasks</h2>
                <button className="text-button-td">View Calendar</button>
              </div> 
              <UpcomingItems />
            </section>

            <section className="dashboard-section-td activity-section-td">
              <div className="section-header-td">
                <h2>Student Activity</h2>
                <button className="text-button-td">View All Activity</button>
              </div>
              <ActivityFeed />
            </section>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;