import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, Search, ArrowUp, ArrowDown, CheckCircle, 
  Clock, AlertCircle, AlertTriangle, FileText,
  BookOpen, Calendar, X
} from 'lucide-react';
import '../../css/student/Assignment.css';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState(false);
  
  // Simulated data fetching
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockAssignments = [
        {
          id: 101,
          title: "JavaScript DOM Manipulation",
          courseId: 2,
          courseName: "Advanced JavaScript",
          dueDate: "2025-05-15",
          description: "Create a responsive image gallery using JavaScript",
          status: "pending",
          gradingStatus: "not_submitted",
          weight: 15
        },
        {
          id: 102,
          title: "React Component Lifecycle",
          courseId: 1,
          courseName: "Introduction to React",
          dueDate: "2025-05-18",
          description: "Create a weather application using React hooks",
          status: "pending",
          gradingStatus: "not_submitted",
          weight: 20
        },
        {
          id: 103,
          title: "JavaScript Arrays and Objects",
          courseId: 2,
          courseName: "Advanced JavaScript",
          dueDate: "2025-05-02",
          description: "Complete the exercises on arrays and objects",
          status: "overdue",
          gradingStatus: "not_submitted",
          weight: 10
        },
        {
          id: 104,
          title: "User Interface Wireframes",
          courseId: 3,
          courseName: "UI/UX Design Fundamentals",
          dueDate: "2025-04-28",
          description: "Create wireframes for an e-commerce website",
          status: "completed",
          gradingStatus: "graded",
          grade: 92,
          feedback: "Excellent work! Your wireframes show good understanding of user flow.",
          weight: 25
        },
        {
          id: 105,
          title: "React State Management",
          courseId: 1,
          courseName: "Introduction to React",
          dueDate: "2025-04-20",
          description: "Build a todo list application with React state",
          status: "completed",
          gradingStatus: "graded",
          grade: 85,
          feedback: "Good work, but could improve code organization.",
          weight: 15
        },
        {
          id: 106,
          title: "Introduction to React Assignment",
          courseId: 1,
          courseName: "Introduction to React",
          dueDate: "2025-04-10",
          description: "Create a basic React application with components",
          status: "completed",
          gradingStatus: "graded",
          grade: 90,
          feedback: "Well done! Your component structure is excellent.",
          weight: 10
        },
        {
          id: 107,
          title: "Python Data Analysis Project",
          courseId: 4,
          courseName: "Python for Data Science",
          dueDate: "2025-05-25",
          description: "Analyze a dataset and create visualizations",
          status: "pending",
          gradingStatus: "not_submitted",
          weight: 30
        },
        {
          id: 108,
          title: "Data Cleaning Exercise",
          courseId: 4,
          courseName: "Python for Data Science",
          dueDate: "2025-05-10",
          description: "Clean and prepare a dataset for analysis",
          status: "completed",
          gradingStatus: "in_review",
          submittedDate: "2025-05-09",
          weight: 15
        }
      ];
      
      setAssignments(mockAssignments);
      setFilteredAssignments(mockAssignments);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter and sort assignments
  useEffect(() => {
    let filtered = [...assignments];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(assignment => assignment.status === statusFilter);
    }
    
    // Apply course filter
    if (courseFilter !== 'all') {
      filtered = filtered.filter(assignment => assignment.courseName === courseFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        assignment => 
          assignment.title.toLowerCase().includes(search) || 
          assignment.description.toLowerCase().includes(search) ||
          assignment.courseName.toLowerCase().includes(search)
      );
    }
    
    // Sort the filtered assignments
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate) - new Date(b.dueDate);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'course':
          comparison = a.courseName.localeCompare(b.courseName);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'weight':
          comparison = a.weight - b.weight;
          break;
        default:
          comparison = new Date(a.dueDate) - new Date(b.dueDate);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredAssignments(filtered);
  }, [assignments, statusFilter, courseFilter, searchTerm, sortBy, sortDirection]);
  
  // Get unique course names for filter
  const courseOptions = ['all', ...new Set(assignments.map(a => a.courseName))];
  
  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  
  // Handle sort by column
  const handleSort = (column) => {
    if (sortBy === column) {
      toggleSortDirection();
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
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
  
  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'overdue':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'overdue':
        return <AlertTriangle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };
  
  // Get grading status badge
  const getGradingBadge = (status, grade) => {
    switch (status) {
      case 'graded':
        return (
          <span className="badge badge-grade">
            <span className="grade-value">{grade}%</span>
          </span>
        );
      case 'in_review':
        return <span className="badge badge-review">In Review</span>;
      case 'not_submitted':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="assignments-page">
      <div className="assignments-header">
        <h1>Assignments</h1>
        <p>View and manage all your course assignments</p>
      </div>
      
      <div className="assignments-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <button 
          className={`filter-button ${filters ? 'active' : ''}`}
          onClick={() => setFilters(!filters)}
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>
      
      {filters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Course</label>
            <select 
              value={courseFilter} 
              onChange={(e) => setCourseFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Courses</option>
              {courseOptions.filter(course => course !== 'all').map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="dueDate">Due Date</option>
              <option value="title">Title</option>
              <option value="course">Course</option>
              <option value="status">Status</option>
              <option value="weight">Weight</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Direction</label>
            <button 
              className="sort-direction-toggle"
              onClick={toggleSortDirection}
            >
              {sortDirection === 'asc' ? (
                <>
                  <ArrowUp size={16} />
                  <span>Ascending</span>
                </>
              ) : (
                <>
                  <ArrowDown size={16} />
                  <span>Descending</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="loading-spinner">Loading assignments...</div>
      ) : filteredAssignments.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} />
          <h3>No assignments found</h3>
          <p>
            {searchTerm 
              ? 'Try adjusting your search or filters' 
              : 'You have no assignments yet'}
          </p>
        </div>
      ) : (
        <div className="assignments-table-container">
          <table className="assignments-table">
            <thead>
              <tr>
                <th 
                  className={sortBy === 'title' ? 'active-sort' : ''}
                  onClick={() => handleSort('title')}
                >
                  <div className="th-content">
                    <span>Assignment</span>
                    {sortBy === 'title' && (
                      sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className={sortBy === 'course' ? 'active-sort' : ''}
                  onClick={() => handleSort('course')}
                >
                  <div className="th-content">
                    <span>Course</span>
                    {sortBy === 'course' && (
                      sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className={sortBy === 'dueDate' ? 'active-sort' : ''}
                  onClick={() => handleSort('dueDate')}
                >
                  <div className="th-content">
                    <span>Due Date</span>
                    {sortBy === 'dueDate' && (
                      sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className={sortBy === 'status' ? 'active-sort' : ''}
                  onClick={() => handleSort('status')}
                >
                  <div className="th-content">
                    <span>Status</span>
                    {sortBy === 'status' && (
                      sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className={sortBy === 'weight' ? 'active-sort' : ''}
                  onClick={() => handleSort('weight')}
                >
                  <div className="th-content">
                    <span>Weight</span>
                    {sortBy === 'weight' && (
                      sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                  </div>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map(assignment => (
                <tr key={assignment.id}>
                  <td>
                    <div className="assignment-title-cell">
                      <div className="assignment-icon">
                        <FileText size={18} />
                      </div>
                      <div className="assignment-title-content">
                        <Link to={`/student/assignment/${assignment.id}`} className="assignment-title">
                          {assignment.title}
                        </Link>
                        <p className="assignment-description">{assignment.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="course-cell">
                      <BookOpen size={16} />
                      <span>{assignment.courseName}</span>
                    </div>
                  </td>
                  <td>
                    <div className="due-date-cell">
                      <Calendar size={16} />
                      <div>
                        <div className="due-date">{formatDate(assignment.dueDate)}</div>
                        <div className={`time-remaining ${assignment.status === 'overdue' ? 'overdue' : ''}`}>
                          {getDaysRemaining(assignment.dueDate)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="status-cell">
                      <span className={`status-badge ${getStatusBadgeClass(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        <span>{assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}</span>
                      </span>
                      {getGradingBadge(assignment.gradingStatus, assignment.grade)}
                    </div>
                  </td>
                  <td>
                    <div className="weight-cell">
                      <span className="weight-badge">{assignment.weight}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-cell">
                      {assignment.status !== 'completed' ? (
                        <Link to={`/student/assignment/${assignment.id}`} className="action-button">
                          {assignment.status === 'overdue' ? 'Submit Late' : 'Submit'}
                        </Link>
                      ) : (
                        <Link to={`/student/assignment/${assignment.id}`} className="view-button">
                          View
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="assignments-summary">
        <div className="summary-item">
          <div className="summary-label">Total Assignments</div>
          <div className="summary-value">{assignments.length}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Completed</div>
          <div className="summary-value">
            {assignments.filter(a => a.status === 'completed').length}
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Pending</div>
          <div className="summary-value">
            {assignments.filter(a => a.status === 'pending').length}
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Overdue</div>
          <div className="summary-value">
            {assignments.filter(a => a.status === 'overdue').length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;