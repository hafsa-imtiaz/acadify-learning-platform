import React, { useState, useEffect } from 'react';
import styles from '../../css/teacher/live-sessions.module.css';
import { Calendar, Clock, Trash2, Edit, Eye, Plus, Search, Filter, X } from 'lucide-react';
import TeacherLayout from '../../components/teacher/sidebar';

const LiveSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // Form state for new/edit session
  const [sessionForm, setSessionForm] = useState({
    id: null,
    title: '',
    courseId: '',
    courseName: '',
    date: '',
    time: '',
    duration: '',
    description: '',
    link: '',
    isPublic: true,
    status: 'upcoming',
    attendees: []
  });

  // Mock data for courses
  const courses = [
    { id: 1, name: 'Introduction to Web Development' },
    { id: 2, name: 'Advanced JavaScript' },
    { id: 3, name: 'UX/UI Design Fundamentals' },
    { id: 4, name: 'Data Science Basics' }
  ];

  // Mock data for sessions - in a real app, you'd fetch this from an API
  useEffect(() => {
    // Simulating API fetch
    const mockSessions = [
      {
        id: 1,
        title: 'JavaScript Fundamentals',
        courseId: 2,
        courseName: 'Advanced JavaScript',
        date: '2025-05-01',
        time: '14:00',
        duration: '60',
        description: 'Covering core JavaScript concepts and ES6+ features',
        link: 'https://zoom.us/j/123456789',
        isPublic: true,
        status: 'upcoming',
        attendees: [
          { id: 1, name: 'Jane Smith' },
          { id: 2, name: 'John Doe' },
          { id: 3, name: 'Alice Johnson' }
        ]
      },
      {
        id: 2,
        title: 'Responsive Design Workshop',
        courseId: 1,
        courseName: 'Introduction to Web Development',
        date: '2025-04-28',
        time: '10:00',
        duration: '90',
        description: 'Hands-on workshop for responsive web design techniques',
        link: 'https://meet.google.com/abc-defg-hij',
        isPublic: true,
        status: 'ongoing',
        attendees: [
          { id: 1, name: 'Jane Smith' },
          { id: 4, name: 'Bob Wilson' },
          { id: 5, name: 'Carol Taylor' }
        ]
      },
      {
        id: 3,
        title: 'HTML Basics',
        courseId: 1,
        courseName: 'Introduction to Web Development',
        date: '2025-04-20',
        time: '11:00',
        duration: '45',
        description: 'Introduction to HTML structure and elements',
        link: 'https://zoom.us/j/987654321',
        isPublic: true,
        status: 'completed',
        attendees: [
          { id: 2, name: 'John Doe' },
          { id: 3, name: 'Alice Johnson' },
          { id: 4, name: 'Bob Wilson' }
        ]
      }
    ];
    setSessions(mockSessions);
    filterSessions(mockSessions, activeTab, searchQuery, selectedCourse);
  }, []);

  // Filter sessions based on active tab, search query, and selected course
  useEffect(() => {
    filterSessions(sessions, activeTab, searchQuery, selectedCourse);
  }, [activeTab, searchQuery, selectedCourse, sortBy]);

  const filterSessions = (sessions, tab, query, course) => {
    let filtered = [...sessions];
    
    // Filter by tab (status)
    if (tab !== 'all') {
      filtered = filtered.filter(session => session.status === tab);
    }
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(session => 
        session.title.toLowerCase().includes(query.toLowerCase()) || 
        session.description.toLowerCase().includes(query.toLowerCase()) ||
        session.courseName.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by course
    if (course !== 'all') {
      filtered = filtered.filter(session => session.courseId === parseInt(course));
    }
    
    // Sort sessions
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'attendees') {
      filtered.sort((a, b) => b.attendees.length - a.attendees.length);
    }
    
    setFilteredSessions(filtered);
  };

  const openAddModal = () => {
    setSessionForm({
      id: null,
      title: '',
      courseId: '',
      courseName: '',
      date: '',
      time: '',
      duration: '',
      description: '',
      link: '',
      isPublic: true,
      status: 'upcoming',
      attendees: []
    });
    setIsModalOpen(true);
  };

  const openEditModal = (session) => {
    setSessionForm({
      ...session,
      courseId: session.courseId.toString()
    });
    setIsModalOpen(true);
  };

  const openViewModal = (session) => {
    setCurrentSession(session);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSessionForm({
      ...sessionForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    const selectedCourse = courses.find(course => course.id === parseInt(courseId));
    setSessionForm({
      ...sessionForm,
      courseId,
      courseName: selectedCourse ? selectedCourse.name : ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newSession = {
      ...sessionForm,
      id: sessionForm.id || Date.now(),
      courseId: parseInt(sessionForm.courseId)
    };
    
    if (sessionForm.id) {
      // Update existing session
      const updatedSessions = sessions.map(session => 
        session.id === newSession.id ? newSession : session
      );
      setSessions(updatedSessions);
    } else {
      // Add new session
      setSessions([...sessions, newSession]);
    }
    
    closeModal();
    // Refresh filters
    filterSessions([...sessions, newSession], activeTab, searchQuery, selectedCourse);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      const updatedSessions = sessions.filter(session => session.id !== id);
      setSessions(updatedSessions);
      filterSessions(updatedSessions, activeTab, searchQuery, selectedCourse);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedSessions = sessions.map(session => 
      session.id === id ? { ...session, status: newStatus } : session
    );
    setSessions(updatedSessions);
    filterSessions(updatedSessions, activeTab, searchQuery, selectedCourse);
  };

  return (
    <TeacherLayout>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Live Sessions</h1>
        <button className={styles.addButton} onClick={openAddModal}>
          <Plus size={18} />
          Add New Session
        </button>
      </header>
      
      <div className={styles.controls}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'ongoing' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('ongoing')}
          >
            Ongoing
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'completed' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Sessions
          </button>
        </div>
        
        <div className={styles.filterControls}>
          <div className={styles.searchBar}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className={styles.clearButton} onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className={styles.filterDropdowns}>
            <div className={styles.filterItem}>
              <label>Course:</label>
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterItem}>
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date (Ascending)</option>
                <option value="title">Title (A-Z)</option>
                <option value="attendees">Attendees (Most First)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {filteredSessions.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No sessions found for the selected filters.</p>
          <button className={styles.addButton} onClick={openAddModal}>
            <Plus size={18} />
            Add Your First Session
          </button>
        </div>
      ) : (
        <div className={styles.sessionsGrid}>
          {filteredSessions.map(session => (
            <div key={session.id} className={styles.sessionCard}>
              <div className={styles.sessionHeader}>
                <span className={`${styles.statusBadge} ${styles[session.status]}`}>
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </span>
                <h3>{session.title}</h3>
              </div>
              
              <div className={styles.courseName}>{session.courseName}</div>
              
              <div className={styles.sessionDetails}>
                <div className={styles.detailItem}>
                  <Calendar size={16} />
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                </div>
                <div className={styles.detailItem}>
                  <Clock size={16} />
                  <span>{session.time} ({session.duration} min)</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Attendees: {session.attendees.length}</span>
                </div>
              </div>
              
              <div className={styles.cardActions}>
                <button 
                  className={styles.viewButton} 
                  onClick={() => openViewModal(session)}
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button 
                  className={styles.editButton} 
                  onClick={() => openEditModal(session)}
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button 
                  className={styles.deleteButton} 
                  onClick={() => handleDelete(session.id)}
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Modal for Add/Edit Session */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{sessionForm.id ? 'Edit Session' : 'Add New Session'}</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.sessionForm}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Session Title*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={sessionForm.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter session title"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="courseId">Course*</label>
                <select
                  id="courseId"
                  name="courseId"
                  value={sessionForm.courseId}
                  onChange={handleCourseChange}
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="date">Date*</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={sessionForm.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="time">Time*</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={sessionForm.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="duration">Duration (minutes)*</label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={sessionForm.duration}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="e.g., 60"
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={sessionForm.description}
                  onChange={handleInputChange}
                  placeholder="Enter session description"
                  rows="3"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="link">Session Link*</label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={sessionForm.link}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., https://zoom.us/j/123456789"
                />
              </div>
              
              <div className={styles.formGroup}>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={sessionForm.isPublic}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="isPublic">Make session public</label>
                </div>
              </div>
              
              {sessionForm.id && (
                <div className={styles.formGroup}>
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={sessionForm.status}
                    onChange={handleInputChange}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}
              
              <div className={styles.formButtons}>
                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  {sessionForm.id ? 'Update Session' : 'Create Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal for View Session Details */}
      {isViewModalOpen && currentSession && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Session Details</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.sessionDetails}>
              <div className={styles.detailHeader}>
                <h3>{currentSession.title}</h3>
                <span className={`${styles.statusBadge} ${styles[currentSession.status]}`}>
                  {currentSession.status.charAt(0).toUpperCase() + currentSession.status.slice(1)}
                </span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Course:</span>
                <span className={styles.detailValue}>{currentSession.courseName}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Date:</span>
                <span className={styles.detailValue}>
                  {new Date(currentSession.date).toLocaleDateString()}
                </span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Time:</span>
                <span className={styles.detailValue}>{currentSession.time}</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Duration:</span>
                <span className={styles.detailValue}>{currentSession.duration} minutes</span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Visibility:</span>
                <span className={styles.detailValue}>
                  {currentSession.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
              
              {currentSession.description && (
                <div className={styles.detailDescription}>
                  <span className={styles.detailLabel}>Description:</span>
                  <p>{currentSession.description}</p>
                </div>
              )}
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Session Link:</span>
                <a href={currentSession.link} target="_blank" rel="noopener noreferrer" className={styles.sessionLink}>
                  {currentSession.link}
                </a>
              </div>
              
              <div className={styles.attendeesSection}>
                <h4>Attendees ({currentSession.attendees.length})</h4>
                {currentSession.attendees.length > 0 ? (
                  <ul className={styles.attendeesList}>
                    {currentSession.attendees.map(attendee => (
                      <li key={attendee.id} className={styles.attendeeItem}>
                        {attendee.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No attendees registered yet.</p>
                )}
              </div>
              
              <div className={styles.sessionActions}>
                {currentSession.status === 'upcoming' && (
                  <button 
                    className={styles.primaryButton}
                    onClick={() => handleStatusChange(currentSession.id, 'ongoing')}
                  >
                    Start Session
                  </button>
                )}
                
                {currentSession.status === 'ongoing' && (
                  <button 
                    className={styles.primaryButton}
                    onClick={() => handleStatusChange(currentSession.id, 'completed')}
                  >
                    Mark as Completed
                  </button>
                )}
                
                <button 
                  className={styles.secondaryButton}
                  onClick={() => {
                    closeModal();
                    openEditModal(currentSession);
                  }}
                >
                  <Edit size={16} />
                  Edit Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </TeacherLayout>
  );
};

export default LiveSessionsPage;