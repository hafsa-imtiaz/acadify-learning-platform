import React, { useState } from 'react';
import { Bell, Search, Filter, RefreshCw, MoreHorizontal, CheckCircle, AlertCircle, MessageSquare, User, Users, FileText, Calendar, Clock } from 'lucide-react';
import '../../css/teacher/notifications.css';
import TeacherLayout from '../../components/teacher/sidebar';

export default function InstructorNotifications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sample notification data
  const allNotifications = [
    {
      id: 1,
      type: 'student',
      title: 'New student enrollment',
      message: 'John Smith has enrolled in "Introduction to React Development"',
      time: '10 minutes ago',
      read: false,
      course: 'Introduction to React Development'
    },
    {
      id: 2,
      type: 'message',
      title: 'New discussion post',
      message: 'Emily Parker posted a question in Module 3 discussion forum',
      time: '1 hour ago',
      read: false,
      course: 'Introduction to React Development'
    },
    {
      id: 3,
      type: 'assignment',
      title: 'Assignments ready for review',
      message: '12 new assignment submissions are ready for grading',
      time: '3 hours ago',
      read: true,
      course: 'Advanced JavaScript Techniques'
    },
    {
      id: 4,
      type: 'system',
      title: 'Course approval',
      message: 'Your course "Advanced JavaScript Techniques" has been approved and is now live',
      time: '1 day ago',
      read: true,
      course: 'Advanced JavaScript Techniques'
    },
    {
      id: 5,
      type: 'student',
      title: 'Student completion alert',
      message: 'Sarah Johnson has completed all modules in your course',
      time: '2 days ago',
      read: false,
      course: 'Web Design Fundamentals'
    },
    {
      id: 6,
      type: 'schedule',
      title: 'Upcoming office hours',
      message: 'You have scheduled office hours tomorrow at 3:00 PM',
      time: '2 days ago',
      read: true,
      course: 'Introduction to React Development'
    },
    {
      id: 7,
      type: 'message',
      title: 'Direct message',
      message: 'You have a new direct message from Alex Thompson regarding the final project',
      time: '3 days ago',
      read: true,
      course: 'Web Design Fundamentals'
    },
    {
      id: 8,
      type: 'system',
      title: 'Platform update',
      message: 'New grading features have been added to the platform',
      time: '5 days ago',
      read: true,
      course: 'All courses'
    },
    {
      id: 9,
      type: 'assignment',
      title: 'Grading reminder',
      message: 'You have pending assignments that need grading from last week',
      time: '1 week ago',
      read: false,
      course: 'Advanced JavaScript Techniques'
    }
  ];

  // Analytics data
  const analytics = {
    total: allNotifications.length,
    unread: allNotifications.filter(n => !n.read).length,
    today: allNotifications.filter(n => n.time.includes('minutes ago') || n.time.includes('hour') || n.time === 'today').length,
    byType: {
      student: allNotifications.filter(n => n.type === 'student').length,
      message: allNotifications.filter(n => n.type === 'message').length,
      assignment: allNotifications.filter(n => n.type === 'assignment').length,
      system: allNotifications.filter(n => n.type === 'system').length,
      schedule: allNotifications.filter(n => n.type === 'schedule').length
    }
  };

  // Filter notifications based on current filters and search
  const filteredNotifications = allNotifications.filter(notification => {
    // Filter by status (read/unread)
    if (filterStatus === 'read' && !notification.read) return false;
    if (filterStatus === 'unread' && notification.read) return false;
    
    // Filter by type
    if (filterType !== 'all' && notification.type !== filterType) return false;
    
    // Filter by search query
    if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !notification.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !notification.course.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Sort notifications
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === 'oldest') {
      return a.id - b.id;
    } else {
      return b.id - a.id; // newest first
    }
  });

  const markAsRead = (id) => {
    // In a real app, this would update the database
    console.log(`Marking notification ${id} as read`);
    // This is just for demo purposes, in a real app you'd update state properly
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'student': return <User className="notification-icon student" />;
      case 'message': return <MessageSquare className="notification-icon message" />;
      case 'assignment': return <FileText className="notification-icon assignment" />;
      case 'system': return <Bell className="notification-icon system" />;
      case 'schedule': return <Calendar className="notification-icon schedule" />;
      default: return <Bell className="notification-icon" />;
    }
  };

  return (
    <TeacherLayout>
    <div className="notifications-page">
      <div className="container">
        <div className="page-header">
          <h1>Notifications</h1>
          <div className="refresh-button">
            <button className="icon-button">
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
        
        {/* Analytics Section - Rearranged */}
        <div className="analytics-section">
          <div className="analytics-card total">
            <div className="analytics-value">{analytics.total}</div>
            <div className="analytics-label">Total Notifications</div>
          </div>
          <div className="analytics-card unread">
            <div className="analytics-value">{analytics.unread}</div>
            <div className="analytics-label">Unread</div>
          </div>
          <div className="analytics-card today">
            <div className="analytics-value">{analytics.today}</div>
            <div className="analytics-label">Today</div>
          </div>
        </div>
        
        {/* Type Analytics - Moved below the main analytics */}
        <div className="type-analytics-section">
          <h3>Notifications by Type</h3>
          <div className="type-analytics-container">
            <div className="type-analytics-item">
              <User size={20} />
              <span className="type-label">Students</span>
              <span className="type-count">{analytics.byType.student}</span>
            </div>
            <div className="type-analytics-item">
              <MessageSquare size={20} />
              <span className="type-label">Messages</span>
              <span className="type-count">{analytics.byType.message}</span>
            </div>
            <div className="type-analytics-item">
              <FileText size={20} />
              <span className="type-label">Assignments</span>
              <span className="type-count">{analytics.byType.assignment}</span>
            </div>
            <div className="type-analytics-item">
              <Bell size={20} />
              <span className="type-label">System</span>
              <span className="type-count">{analytics.byType.system}</span>
            </div>
            <div className="type-analytics-item">
              <Calendar size={20} />
              <span className="type-label">Schedule</span>
              <span className="type-count">{analytics.byType.schedule}</span>
            </div>
          </div>
        </div>
        
        {/* Improved Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search notifications by title, message or course..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="filters-section">
          <div className="filters">
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Type:</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="student">Student</option>
                <option value="message">Message</option>
                <option value="assignment">Assignment</option>
                <option value="system">System</option>
                <option value="schedule">Schedule</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sort:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Notifications List */}
        <div className="notifications-list">
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              >
                <div className="notification-icon-container">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <h3>{notification.title}</h3>
                    <span className="notification-time">
                      <Clock size={14} />
                      {notification.time}
                    </span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  <div className="notification-meta">
                    <span className="notification-course">{notification.course}</span>
                  </div>
                </div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button 
                      className="action-button mark-read" 
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CheckCircle size={16} />
                      <span>Mark as read</span>
                    </button>
                  )}
                  <button className="icon-button action-more">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <Bell size={48} className="empty-icon" />
              <h3>No notifications found</h3>
              <p>Try changing your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </TeacherLayout>
  );
}