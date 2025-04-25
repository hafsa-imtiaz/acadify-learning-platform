import React, { useState } from 'react';
import { MessageSquare, FileText, HelpCircle, User } from 'lucide-react';
import '../../../css/teacher/ActivityFeed.css';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');
  
  const activities = [
    {
      id: 1,
      type: 'discussion',
      user: {
        name: 'Alex Johnson',
        avatar: '/api/placeholder/32/32'
      },
      message: 'Posted a comment in "React Props vs State Discussion"',
      course: 'Advanced React Patterns',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'submission',
      user: {
        name: 'Maria Chen',
        avatar: '/api/placeholder/32/32'
      },
      message: 'Submitted "Assignment 4: State Management"',
      course: 'Advanced React Patterns',
      time: '45 minutes ago'
    },
    {
      id: 3,
      type: 'question',
      user: {
        name: 'David Wilson',
        avatar: '/api/placeholder/32/32'
      },
      message: 'Asked a question in "SQL Joins and Relations"',
      course: 'Introduction to Web Development',
      time: '2 hours ago'
    },
    {
      id: 4,
      type: 'discussion',
      user: {
        name: 'Sarah Miller',
        avatar: '/api/placeholder/32/32'
      },
      message: 'Replied to your comment in "Algorithm Efficiency"',
      course: 'Data Structures for Beginners',
      time: '3 hours ago'
    },
    {
      id: 5,
      type: 'enrollment',
      user: {
        name: 'James Thompson',
        avatar: '/api/placeholder/32/32'
      },
      message: 'Enrolled in your course',
      course: 'Data Structures for Beginners',
      time: '5 hours ago'
    },
    {
      id: 6,
      type: 'submission',
      user: {
        name: 'Emily Zhang',
        avatar: '/api/placeholder/32/32'
      },
      message: 'Submitted "Final Project: Binary Search Tree"',
      course: 'Data Structures for Beginners',
      time: 'Yesterday'
    }
  ];
  
  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);
  
  const getActivityIcon = (type) => {
    switch(type) {
      case 'discussion':
        return <MessageSquare size={16} />;
      case 'submission':
        return <FileText size={16} />;
      case 'question':
        return <HelpCircle size={16} />;
      case 'enrollment':
        return <User size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };
  
  const getActivityClass = (type) => {
    switch(type) {
      case 'discussion':
        return 'activity-discussion';
      case 'submission':
        return 'activity-submission';
      case 'question':
        return 'activity-question';
      case 'enrollment':
        return 'activity-enrollment';
      default:
        return '';
    }
  };

  return (
    <div className="activity-feed-container">
      <div className="activity-feed-filters">
        <button 
          className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Activity
        </button>
        <button 
          className={`filter-pill ${filter === 'discussion' ? 'active' : ''}`}
          onClick={() => setFilter('discussion')}
        >
          Discussions
        </button>
        <button 
          className={`filter-pill ${filter === 'submission' ? 'active' : ''}`}
          onClick={() => setFilter('submission')}
        >
          Submissions
        </button>
        <button 
          className={`filter-pill ${filter === 'question' ? 'active' : ''}`}
          onClick={() => setFilter('question')}
        >
          Questions
        </button>
      </div>
      
      <div className="activity-list">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-avatar">
              <img src={activity.user.avatar} alt={activity.user.name} />
            </div>
            <div className="activity-content">
              <div className="activity-header">
                <span className="activity-user">{activity.user.name}</span>
                <span className="activity-time">{activity.time}</span>
              </div>
              <p className="activity-message">{activity.message}</p>
              <div className="activity-footer">
                <span className={`activity-type ${getActivityClass(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                  <span>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</span>
                </span>
                <span className="activity-course">{activity.course}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;