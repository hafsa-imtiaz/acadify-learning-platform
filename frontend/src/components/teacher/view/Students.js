import React, { useState, useEffect } from "react";
import { Search, Filter, Check, Clock, AlertTriangle, MessageSquare, Download, UserPlus, ChevronDown, User, Award, BookOpen, Calendar,MoreVertical,
  Mail, ChevronRight } from "lucide-react";
import "../../../css/teacher/view/student.css";

const Students = () => {
  // State for student data
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [activeTab, setActiveTab] = useState("all");
  
  // State for stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    atRisk: 0,
    auditing: 0
  });

  // Fetch mock student data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockStudents = [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-09-15",
        status: "active",
        progress: 68,
        lastActive: "2 days ago",
        grade: "B+",
        completionDate: null,
        assignments: { completed: 12, total: 15 },
        quizzes: { completed: 5, total: 8 },
        messages: 3,
        notes: "Strong participation in discussion forums",
        tags: ["group-project-1"]
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-09-10",
        status: "at-risk",
        progress: 35,
        lastActive: "10 days ago",
        grade: "D",
        completionDate: null,
        assignments: { completed: 5, total: 15 },
        quizzes: { completed: 2, total: 8 },
        messages: 0,
        notes: "Missing multiple assignment deadlines",
        tags: ["needs-intervention"]
      },
      {
        id: 3,
        name: "Jessica Rodriguez",
        email: "jessica.r@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-08-28",
        status: "completed",
        progress: 100,
        lastActive: "1 week ago",
        grade: "A",
        completionDate: "2024-01-10",
        assignments: { completed: 15, total: 15 },
        quizzes: { completed: 8, total: 8 },
        messages: 7,
        notes: "Outstanding final project",
        tags: ["honor-roll"]
      },
      {
        id: 4,
        name: "David Kim",
        email: "david.kim@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-09-05",
        status: "active",
        progress: 82,
        lastActive: "Today",
        grade: "A-",
        completionDate: null,
        assignments: { completed: 13, total: 15 },
        quizzes: { completed: 7, total: 8 },
        messages: 5,
        notes: "",
        tags: []
      },
      {
        id: 5,
        name: "Emma Wilson",
        email: "emma.w@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-09-20",
        status: "auditing",
        progress: 45,
        lastActive: "Yesterday",
        grade: "N/A",
        completionDate: null,
        assignments: { completed: 0, total: 15 },
        quizzes: { completed: 4, total: 8 },
        messages: 1,
        notes: "Audit only, not submitting assignments",
        tags: ["audit"]
      },
      {
        id: 6,
        name: "Thomas Garcia",
        email: "thomas.g@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-09-08",
        status: "completed",
        progress: 100,
        lastActive: "3 days ago",
        grade: "B",
        completionDate: "2024-01-15",
        assignments: { completed: 15, total: 15 },
        quizzes: { completed: 8, total: 8 },
        messages: 0,
        notes: "",
        tags: []
      },
      {
        id: 7,
        name: "Olivia Taylor",
        email: "olivia.t@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-09-12",
        status: "active",
        progress: 75,
        lastActive: "Just now",
        grade: "B+",
        completionDate: null,
        assignments: { completed: 12, total: 15 },
        quizzes: { completed: 6, total: 8 },
        messages: 8,
        notes: "Very engaged in discussions",
        tags: ["group-project-2"]
      },
      {
        id: 8,
        name: "James Martinez",
        email: "james.m@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-09-18",
        status: "at-risk",
        progress: 20,
        lastActive: "2 weeks ago",
        grade: "F",
        completionDate: null,
        assignments: { completed: 3, total: 15 },
        quizzes: { completed: 1, total: 8 },
        messages: 0,
        notes: "Not responding to emails, missed midterm",
        tags: ["urgent-intervention"]
      },
      {
        id: 9,
        name: "Sophia Lee",
        email: "sophia.lee@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-09-01",
        status: "active",
        progress: 90,
        lastActive: "Yesterday",
        grade: "A",
        completionDate: null,
        assignments: { completed: 14, total: 15 },
        quizzes: { completed: 8, total: 8 },
        messages: 5,
        notes: "Exceptionally detailed assignments",
        tags: ["excelling"]
      },
      {
        id: 10,
        name: "William Brown",
        email: "w.brown@example.com",
        avatar: "/api/placeholder/40/40",
        enrollmentDate: "2023-09-07",
        status: "auditing",
        progress: 60,
        lastActive: "3 days ago",
        grade: "N/A",
        completionDate: null,
        assignments: { completed: 0, total: 15 },
        quizzes: { completed: 5, total: 8 },
        messages: 2,
        notes: "Considering full enrollment next semester",
        tags: ["audit", "potential-enrollment"]
      }
    ];

    setStudents(mockStudents);
    setFilteredStudents(mockStudents);

    // Calculate stats
    const stats = {
      total: mockStudents.length,
      active: mockStudents.filter(s => s.status === "active").length,
      completed: mockStudents.filter(s => s.status === "completed").length,
      atRisk: mockStudents.filter(s => s.status === "at-risk").length,
      auditing: mockStudents.filter(s => s.status === "auditing").length
    };
    setStats(stats);
  }, []);

  // Filter students based on search, status filter, and tab
  useEffect(() => {
    let result = [...students];
    
    // Apply tab filter first
    if (activeTab !== "all") {
      result = result.filter(student => student.status === activeTab);
    }
    
    // Apply status filter if not 'all'
    if (statusFilter !== "all") {
      result = result.filter(student => student.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(student => 
        student.name.toLowerCase().includes(query) || 
        student.email.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result = sortStudents(result, sortBy);
    
    setFilteredStudents(result);
  }, [students, searchQuery, statusFilter, sortBy, activeTab]);

  // Sorting function
  const sortStudents = (students, sortMethod) => {
    const sorted = [...students];
    
    switch (sortMethod) {
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "progress-asc":
        return sorted.sort((a, b) => a.progress - b.progress);
      case "progress-desc":
        return sorted.sort((a, b) => b.progress - a.progress);
      case "recent":
        return sorted.sort((a, b) => {
          if (a.lastActive === "Just now") return -1;
          if (b.lastActive === "Just now") return 1;
          if (a.lastActive === "Today") return -1;
          if (b.lastActive === "Today") return 1;
          if (a.lastActive === "Yesterday") return -1;
          if (b.lastActive === "Yesterday") return 1;
          return 0; // simplified for this example
        });
      default:
        return sorted;
    }
  };

  // Helper to get status badge classes
  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "status-badge-active";
      case "completed":
        return "status-badge-completed";
      case "at-risk":
        return "status-badge-risk";
      case "auditing":
        return "status-badge-audit";
      default:
        return "";
    }
  };

  // Helper to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Clock size={14} />;
      case "completed":
        return <Check size={14} />;
      case "at-risk":
        return <AlertTriangle size={14} />;
      case "auditing":
        return <BookOpen size={14} />;
      default:
        return null;
    }
  };

  // Progress bar background color
  const getProgressColor = (status, progress) => {
    if (status === "completed") return "progress-completed";
    if (status === "auditing") return "progress-audit";
    if (status === "at-risk") return "progress-risk";
    if (progress >= 75) return "progress-good";
    if (progress >= 50) return "progress-average";
    return "progress-poor";
  };
  
  return (
    <div className="students-container">
      {/* Header Section */}
      <div className="students-header">
        <div className="header-left">
          <h1>Course Students</h1>
          <p>Manage and track the progress of students enrolled in this course</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stat-cards">
        <div className="stat-card total">
          <div className="stat-icon">
            <User size={18} />
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card active">
          <div className="stat-icon">
            <Clock size={18} />
          </div>
          <div className="stat-info">
            <h3>{stats.active}</h3>
            <p>Active Students</p>
          </div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon">
            <Award size={18} />
          </div>
          <div className="stat-info">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card risk">
          <div className="stat-icon">
            <AlertTriangle size={18} />
          </div>
          <div className="stat-info">
            <h3>{stats.atRisk}</h3>
            <p>At Risk</p>
          </div>
        </div>
        <div className="stat-card audit">
          <div className="stat-icon">
            <BookOpen size={18} />
          </div>
          <div className="stat-info">
            <h3>{stats.auditing}</h3>
            <p>Auditing</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Students ({stats.total})
        </button>
        <button 
          className={`tab ${activeTab === "active" ? "active" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active ({stats.active})
        </button>
        <button 
          className={`tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed ({stats.completed})
        </button>
        <button 
          className={`tab ${activeTab === "at-risk" ? "active" : ""}`}
          onClick={() => setActiveTab("at-risk")}
        >
          At Risk ({stats.atRisk})
        </button>
        <button 
          className={`tab ${activeTab === "auditing" ? "active" : ""}`}
          onClick={() => setActiveTab("auditing")}
        >
          Auditing ({stats.auditing})
        </button>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name or email" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search" 
              onClick={() => setSearchQuery("")}
            >
              ×
            </button>
          )}
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="statusFilter">Status:</label>
            <select 
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="at-risk">At Risk</option>
              <option value="auditing">Auditing</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="sortBy">Sort By:</label>
            <select 
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="progress-desc">Progress (High-Low)</option>
              <option value="progress-asc">Progress (Low-High)</option>
              <option value="recent">Recent Activity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="students-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <div key={student.id} className="student-card">
              <div className="student-info">
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="student-avatar" 
                />
                <div className="student-details">
                  <h3 className="student-name">{student.name}</h3>
                  <div className="student-meta">
                    <span className="student-email">
                      <Mail size={14} />
                      {student.email}
                    </span>
                    <span className="student-enrolled">
                      <Calendar size={14} />
                      Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="student-progress-section">
                <div className="progress-header">
                  <span className="progress-percentage">Progress: {student.progress}%</span>
                  <span className={`status-badge ${getStatusClass(student.status)}`}>
                    {getStatusIcon(student.status)}
                    {student.status === "at-risk" ? "At Risk" : 
                      student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className={`progress-bar ${getProgressColor(student.status, student.progress)}`} 
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
                <div className="progress-details">
                  <div className="detail-item">
                    <span className="detail-label">Assignments:</span>
                    <span className="detail-value">{student.assignments.completed}/{student.assignments.total}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Quizzes:</span>
                    <span className="detail-value">{student.quizzes.completed}/{student.quizzes.total}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Grade:</span>
                    <span className="detail-value">{student.grade}</span>
                  </div>
                </div>
              </div>
              
              <div className="student-activity">
                <div className="activity-item">
                  <span className="activity-label">Last Active:</span>
                  <span className="activity-value">{student.lastActive}</span>
                </div>
                {student.status === "completed" && (
                  <div className="activity-item">
                    <span className="activity-label">Completed:</span>
                    <span className="activity-value">{new Date(student.completionDate).toLocaleDateString()}</span>
                  </div>
                )}
                {student.messages > 0 && (
                  <div className="activity-item">
                    <MessageSquare size={14} />
                    <span className="activity-value">{student.messages} message{student.messages !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              
              <div className="student-actions">
                <button className="btn btn-view">
                  View Profile
                  <ChevronRight size={16} />
                </button>
                <button className="btn btn-icon">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <User size={48} />
            <h3>No students found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;