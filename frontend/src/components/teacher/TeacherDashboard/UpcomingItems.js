import React, { useState } from 'react';
import { Calendar, Video, FileText, CheckSquare, ChevronRight } from 'lucide-react';
import '../../../css/teacher/UpcomingItems.css';

const UpcomingItems = () => {
  const upcomingEvents = [
    {
      id: 1,
      type: 'class',
      title: 'Live Session: Advanced Algorithms',
      course: 'Data Structures for Beginners',
      date: 'Today',
      time: '2:00 PM - 3:30 PM',
      status: 'upcoming'
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Final Project Review',
      course: 'Advanced React Patterns',
      date: 'Tomorrow',
      time: 'Due by 11:59 PM',
      status: 'pending'
    },
    {
      id: 3,
      type: 'recording',
      title: 'Record React Hooks Lecture',
      course: 'Advanced React Patterns',
      date: 'Apr 26',
      time: 'No scheduled time',
      status: 'todo'
    },
    {
      id: 4,
      type: 'grading',
      title: 'Grade Quiz 3 Submissions',
      course: 'Introduction to Web Development',
      date: 'Apr 27',
      time: '15 submissions pending',
      status: 'pending'
    },
    {
      id: 5,
      type: 'class',
      title: 'Office Hours',
      course: 'Data Structures for Beginners',
      date: 'Apr 28',
      time: '10:00 AM - 12:00 PM',
      status: 'upcoming'
    }
  ];
  
  const getIcon = (type) => {
    switch(type) {
      case 'class':
        return <Video size={18} />;
      case 'assignment':
        return <FileText size={18} />;
      case 'recording':
        return <Video size={18} />;
      case 'grading':
        return <CheckSquare size={18} />;
      default:
        return <Calendar size={18} />;
    }
  };
  
  const getTypeLabel = (type) => {
    switch(type) {
      case 'class':
        return 'Live Class';
      case 'assignment':
        return 'Assignment';
      case 'recording':
        return 'Recording';
      case 'grading':
        return 'Grading';
      default:
        return 'Event';
    }
  };
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'upcoming':
        return 'status-upcoming';
      case 'pending':
        return 'status-pending';
      case 'todo':
        return 'status-todo';
      default:
        return '';
    }
  };

  return (
    <div className="upcoming-container">
      <div className="upcoming-header">
        <div className="date-display">
          <div className="current-date">
            <Calendar size={18} />
            <span>Thursday, April 24, 2025</span>
          </div>
        </div>
        <div className="filter-controls">
          <button className="filter-button active">All</button>
          <button className="filter-button">Classes</button>
          <button className="filter-button">Assignments</button>
          <button className="filter-button">Tasks</button>
        </div>
      </div>

      <div className="upcoming-list">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="upcoming-item">
            <div className="item-left">
              <div className={`item-icon ${event.type}`}>
                {getIcon(event.type)}
              </div>
              <div className="item-content">
                <div className="item-header">
                  <span className="item-type">{getTypeLabel(event.type)}</span>
                  <span className={`item-status ${getStatusClass(event.status)}`}>
                    {event.status === 'upcoming' ? 'Upcoming' : 
                     event.status === 'pending' ? 'Pending' : 'To Do'}
                  </span>
                </div>
                <h4 className="item-title">{event.title}</h4>
                <p className="item-course">{event.course}</p>
              </div>
            </div>
            <div className="item-right">
              <div className="item-time">
                <div className="time-date">{event.date}</div>
                <div className="time-hours">{event.time}</div>
              </div>
              <button className="action-button">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingItems;