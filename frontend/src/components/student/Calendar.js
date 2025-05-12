// src/components/student/Calendar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  FileText, BookOpen, Video, MessageSquare, AlertCircle
} from 'lucide-react';
// Remove the context import completely
import '../../css/student/Calendar.css';

const Calendar = () => {
  // Remove all usePageMetadata references
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('month'); // 'month', 'week', or 'day'
  
  // Remove the useEffect for page metadata

  // Fetch calendar events (assignments, classes, etc.)
  useEffect(() => {
    // This would be an API call in a real app
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Mock events data
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      
      // Generate events for the current month
      const eventsData = [
        {
          id: 101,
          title: "JavaScript DOM Manipulation",
          type: "assignment",
          courseId: 2,
          courseName: "Advanced JavaScript",
          date: new Date(2025, 4, 15), // May 15, 2025
          startTime: "23:59",
          endTime: null,
          description: "Create a responsive image gallery using JavaScript",
          status: "pending",
          priority: "high"
        },
        {
          id: 102,
          title: "React Component Lifecycle",
          type: "assignment",
          courseId: 1,
          courseName: "Introduction to React",
          date: new Date(2025, 4, 18), // May 18, 2025
          startTime: "23:59",
          endTime: null,
          description: "Create a weather application using React hooks",
          status: "pending",
          priority: "medium"
        },
        {
          id: 103,
          title: "Python Data Analysis Project",
          type: "assignment",
          courseId: 4,
          courseName: "Python for Data Science",
          date: new Date(2025, 4, 20), // May 20, 2025
          startTime: "23:59",
          endTime: null,
          description: "Analyze a dataset and create visualizations",
          status: "pending",
          priority: "high"
        },
        {
          id: 201,
          title: "Advanced JavaScript Live Session",
          type: "live-session",
          courseId: 2,
          courseName: "Advanced JavaScript",
          date: new Date(2025, 4, 17), // May 17, 2025
          startTime: "10:00",
          endTime: "11:30",
          description: "Deep dive into JavaScript Promises and async/await",
          status: "upcoming",
          priority: "medium"
        },
        {
          id: 202,
          title: "UI/UX Design Workshop",
          type: "live-session",
          courseId: 3,
          courseName: "UI/UX Design Fundamentals",
          date: new Date(2025, 4, 22), // May 22, 2025
          startTime: "14:00",
          endTime: "15:30",
          description: "Hands-on workshop for creating responsive web designs",
          status: "upcoming",
          priority: "medium"
        },
        {
          id: 301,
          title: "React Study Group",
          type: "discussion",
          courseId: 1,
          courseName: "Introduction to React",
          date: new Date(2025, 4, 25), // May 25, 2025
          startTime: "16:00",
          endTime: "17:00",
          description: "Peer discussion about React state management",
          status: "upcoming",
          priority: "low"
        },
        {
          id: 401,
          title: "Python Quiz",
          type: "assessment",
          courseId: 4,
          courseName: "Python for Data Science",
          date: new Date(2025, 4, 12), // May 12, 2025
          startTime: "09:00",
          endTime: "10:00",
          description: "Quiz covering pandas and matplotlib libraries",
          status: "upcoming",
          priority: "high"
        }
      ];
      
      setEvents(eventsData);
      setLoading(false);
    }, 800);
  }, [currentDate]);

  // Calendar navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    
    return `${formattedHours}:${minutes} ${period}`;
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Get icon based on event type
  const getEventIcon = (eventType) => {
    switch (eventType) {
      case 'assignment':
        return <FileText size={16} />;
      case 'live-session':
        return <Video size={16} />;
      case 'discussion':
        return <MessageSquare size={16} />;
      case 'assessment':
        return <AlertCircle size={16} />;
      default:
        return <CalendarIcon size={16} />;
    }
  };

  // Get color based on event type
  const getEventColor = (eventType, priority) => {
    switch (eventType) {
      case 'assignment':
        return priority === 'high' ? 'event-red' : 'event-orange';
      case 'live-session':
        return 'event-blue';
      case 'discussion':
        return 'event-green';
      case 'assessment':
        return 'event-purple';
      default:
        return 'event-gray';
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Previous month days to show
    const prevMonthDays = [];
    const prevMonth = new Date(year, month, 0);
    const prevMonthTotalDays = prevMonth.getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push({
        date: new Date(year, month - 1, prevMonthTotalDays - i),
        isCurrentMonth: false,
        events: []
      });
    }
    
    // Current month days
    const currentMonthDays = [];
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      currentMonthDays.push({
        date,
        isCurrentMonth: true,
        events: getEventsForDate(date)
      });
    }
    
    // Next month days to show
    const nextMonthDays = [];
    const totalCells = 42; // 6 rows, 7 columns
    const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
    
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day);
      nextMonthDays.push({
        date,
        isCurrentMonth: false,
        events: []
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Check if date is selected
  const isSelected = (date) => {
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  // Calendar days grid
  const calendarDays = generateCalendarDays();

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div className="calendar-title">
          <h1>Academic Calendar</h1>
          <p>View your assignments, live sessions, and other academic events</p>
        </div>
        
        <div className="calendar-actions">
          <button className="btn-primary" onClick={goToToday}>
            Today
          </button>
          
          <div className="calendar-nav">
            <button className="btn-icon" onClick={goToPreviousMonth}>
              <ChevronLeft size={20} />
            </button>
            <span className="current-month">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button className="btn-icon" onClick={goToNextMonth}>
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="view-selector">
            <button 
              className={`view-btn ${view === 'month' ? 'active' : ''}`}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button 
              className={`view-btn ${view === 'week' ? 'active' : ''}`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button 
              className={`view-btn ${view === 'day' ? 'active' : ''}`}
              onClick={() => setView('day')}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-container">
        {/* Calendar Grid - Month View */}
        {view === 'month' && (
          <div className="month-view">
            <div className="weekdays">
              <div className="weekday">Sun</div>
              <div className="weekday">Mon</div>
              <div className="weekday">Tue</div>
              <div className="weekday">Wed</div>
              <div className="weekday">Thu</div>
              <div className="weekday">Fri</div>
              <div className="weekday">Sat</div>
            </div>
            
            <div className="days-grid">
              {calendarDays.map((dayData, index) => (
                <div 
                  key={index}
                  className={`day-cell ${dayData.isCurrentMonth ? '' : 'other-month'} ${isToday(dayData.date) ? 'today' : ''} ${isSelected(dayData.date) ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(dayData.date)}
                >
                  <div className="day-number">{dayData.date.getDate()}</div>
                  <div className="day-events">
                    {dayData.events.slice(0, 3).map(event => (
                      <div 
                        key={event.id}
                        className={`event-marker ${getEventColor(event.type, event.priority)}`} 
                        title={`${event.title} - ${event.courseName}`}
                      >
                        {getEventIcon(event.type)}
                        <span className="event-title">{event.title}</span>
                      </div>
                    ))}
                    {dayData.events.length > 3 && (
                      <div className="more-events">+{dayData.events.length - 3} more</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Week View (simplified implementation) */}
        {view === 'week' && (
          <div className="week-view">
            <div className="view-message">
              <p>Week view implementation would go here.</p>
              <p>This would show a detailed hourly view for the selected week.</p>
            </div>
          </div>
        )}
        
        {/* Day View (simplified implementation) */}
        {view === 'day' && (
          <div className="day-view">
            <div className="view-message">
              <p>Day view implementation would go here.</p>
              <p>This would show a detailed hourly view for the selected day.</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Day Events */}
      <div className="events-panel">
        <div className="events-header">
          <h2>{formatDate(selectedDate)}</h2>
          <span className="events-count">
            {getEventsForDate(selectedDate).length} events
          </span>
        </div>
        
        <div className="events-list">
          {getEventsForDate(selectedDate).length === 0 ? (
            <div className="no-events">
              <CalendarIcon size={48} />
              <p>No events scheduled for this day</p>
            </div>
          ) : (
            getEventsForDate(selectedDate).map(event => (
              <div key={event.id} className={`event-card ${getEventColor(event.type, event.priority)}`}>
                <div className="event-header">
                  <div className="event-type">
                    {getEventIcon(event.type)}
                    <span>{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
                  </div>
                  {event.priority === 'high' && (
                    <span className="priority-badge">High Priority</span>
                  )}
                </div>
                
                <h3 className="event-title">{event.title}</h3>
                <p className="event-course">
                  <BookOpen size={16} />
                  <span>{event.courseName}</span>
                </p>
                
                <div className="event-details">
                  <div className="event-time">
                    <span>{formatTime(event.startTime)}</span>
                    {event.endTime && (
                      <>
                        <span> - </span>
                        <span>{formatTime(event.endTime)}</span>
                      </>
                    )}
                  </div>
                  
                  <p className="event-description">{event.description}</p>
                </div>
                
                <div className="event-actions">
                  {event.type === 'assignment' && (
                    <Link to={`/student/assignment/${event.id}`} className="btn-primary">
                      View Assignment
                    </Link>
                  )}
                  
                  {event.type === 'live-session' && (
                    <Link to={`/student/live-sessions/${event.id}`} className="btn-primary">
                      Join Session
                    </Link>
                  )}
                  
                  {event.type === 'discussion' && (
                    <Link to={`/student/discussions/${event.id}`} className="btn-primary">
                      Join Discussion
                    </Link>
                  )}
                  
                  {event.type === 'assessment' && (
                    <Link to={`/student/assessments/${event.id}`} className="btn-primary">
                      Start Assessment
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;