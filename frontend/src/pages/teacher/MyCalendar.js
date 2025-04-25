import React, { useState, useEffect } from 'react';
import TeacherLayout from '../../components/teacher/sidebar';
import { Calendar, ChevronLeft, ChevronRight, List, Grid, Clock, BookOpen } from 'lucide-react';
import '../../css/teacher/calendar.css';

const deadlinesData = [
  { id: 1, title: 'Midterm Grades Due', date: '2025-04-28', course: 'CS101' },
  { id: 2, title: 'Final Project Submissions', date: '2025-05-15', course: 'MATH202' },
  { id: 3, title: 'Department Meeting', date: '2025-04-26', course: 'Admin' },
  { id: 4, title: 'Student Evaluations Due', date: '2025-05-10', course: 'ENG105' },
  { id: 5, title: 'Curriculum Review', date: '2025-05-05', course: 'Admin' },
  { id: 6, title: 'Lab Reports Grading', date: '2025-04-30', course: 'PHY201' },
  { id: 7, title: 'Parent-Teacher Conference', date: '2025-05-12', course: 'Admin' },
  { id: 8, title: 'Research Proposal Deadline', date: '2025-05-20', course: 'BIO303' }
];

// Generate calendar days
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days = [];
  const startingDayOfWeek = firstDay.getDay();
  
  // Add empty slots for days before the 1st of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }
  
  // Add days of the current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push({ day, isCurrentMonth: true });
  }
  
  return days;
};

// Course color mapping
const courseColors = {
  'CS101': 'blue',
  'MATH202': 'green',
  'Admin': 'purple',
  'ENG105': 'amber',
  'PHY201': 'red',
  'BIO303': 'teal'
};

const InstructorCalendar = () => {
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [animating, setAnimating] = useState(false);
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = generateCalendarDays(year, month);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'
  ];
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const handlePrevMonth = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentDate(new Date(year, month - 1, 1));
      setAnimating(false);
    }, 300);
  };
  
  const handleNextMonth = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentDate(new Date(year, month + 1, 1));
      setAnimating(false);
    }, 300);
  };

  const toggleView = (mode) => {
    setAnimating(true);
    setTimeout(() => {
      setViewMode(mode);
      setAnimating(false);
    }, 300);
  };

  // Filter deadlines for the current month
  const currentMonthDeadlines = deadlinesData.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate.getMonth() === month && deadlineDate.getFullYear() === year;
  });

  // Get deadlines for a specific day
  const getDeadlinesForDay = (day) => {
    if (!day) return [];
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return deadlinesData.filter(deadline => deadline.date === formattedDate);
  };

  // Check if a day is today
  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  // Sort deadlines by date
  const sortedDeadlines = [...deadlinesData].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Group deadlines by month for list view
  const groupedDeadlines = sortedDeadlines.reduce((acc, deadline) => {
    const date = new Date(deadline.date);
    const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(deadline);
    return acc;
  }, {});

  // Get formatted date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Get days remaining
  const getDaysRemaining = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return `${diffDays} days remaining`;
  };

  return (
    <TeacherLayout>
      <div className="instructor-calendar">
        <div className="calendar-header">
          <div className="calendar-title">
            <Calendar size={24} className="calendar-icon" />
            <h1>Instructor Calendar</h1>
          </div>
          <div className="view-toggle">
            <button 
              onClick={() => toggleView('calendar')} 
              className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              aria-label="Calendar View"
            >
              <Grid size={20} />
              <span>Calendar</span>
            </button>
            <button 
              onClick={() => toggleView('list')} 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="List View"
            >
              <List size={20} />
              <span>List</span>
            </button>
          </div>
        </div>

        <div className={`calendar-content ${animating ? 'fade-out' : 'fade-in'}`}>
          {viewMode === 'calendar' ? (
            <div className="calendar-view">
              <div className="month-navigation">
                <button onClick={handlePrevMonth} className="nav-btn" aria-label="Previous Month">
                  <ChevronLeft size={20} />
                </button>
                <h2 className="month-title">{monthNames[month]} {year}</h2>
                <button onClick={handleNextMonth} className="nav-btn" aria-label="Next Month">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="calendar-grid">
                <div className="weekday-headers">
                  {weekdays.map(day => (
                    <div key={day} className="weekday">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="calendar-days">
                  {calendarDays.map((day, index) => {
                    const dayDeadlines = day.day ? getDeadlinesForDay(day.day) : [];
                    const isTodayClass = isToday(day.day) ? 'is-today' : '';
                    
                    return (
                      <div 
                        key={index} 
                        className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${isTodayClass}`}
                      >
                        {day.day && (
                          <>
                            <span className="day-number">{day.day}</span>
                            <div className="day-events">
                              {dayDeadlines.map(deadline => (
                                <div 
                                  key={deadline.id} 
                                  className={`event-item ${courseColors[deadline.course]}`}
                                  title={`${deadline.title} (${deadline.course})`}
                                >
                                  <span className="event-title">{deadline.title}</span>
                                  <span className="event-course">{deadline.course}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="list-view">
              <div className="list-header">
                <h2>All Upcoming Deadlines</h2>
              </div>
              
              <div className="deadlines-list">
                {Object.entries(groupedDeadlines).length > 0 ? (
                  Object.entries(groupedDeadlines).map(([monthYear, deadlines]) => (
                    <div key={monthYear} className="month-group">
                      <h3 className="month-heading">{monthYear}</h3>
                      <div className="month-items">
                        {deadlines.map(deadline => {
                          const deadlineDate = new Date(deadline.date);
                          return (
                            <div key={deadline.id} className="deadline-item">
                              <div className={`deadline-date ${courseColors[deadline.course]}`}>
                                <span className="date-day">{deadlineDate.getDate()}</span>
                                <span className="date-month">{monthNames[deadlineDate.getMonth()].substring(0, 3)}</span>
                              </div>
                              <div className="deadline-details">
                                <h4 className="deadline-title">{deadline.title}</h4>
                                <div className="deadline-meta">
                                  <span className="deadline-course">
                                    <BookOpen size={14} />
                                    {deadline.course}
                                  </span>
                                  <span className="deadline-countdown">
                                    <Clock size={14} />
                                    {getDaysRemaining(deadline.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-deadlines">
                    <p>No upcoming deadlines found.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Monthly Summary Section */}
        <div className="monthly-summary">
          <h2>This Month's Overview</h2>
          {currentMonthDeadlines.length > 0 ? (
            <div className="summary-list">
              {currentMonthDeadlines.map(deadline => (
                <div key={deadline.id} className="summary-item">
                  <div className={`summary-indicator ${courseColors[deadline.course]}`}></div>
                  <div className="summary-content">
                    <div className="summary-title">{deadline.title}</div>
                    <div className="summary-details">
                      <span className="summary-course">{deadline.course}</span>
                      <span className="summary-date">{formatDate(deadline.date)}</span>
                    </div>
                  </div>
                  <div className="summary-status">
                    <span className={`status-badge ${getDaysRemaining(deadline.date) === 'Today' ? 'urgent' : ''}`}>
                      {getDaysRemaining(deadline.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-deadlines">No deadlines for this month.</p>
          )}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default InstructorCalendar;