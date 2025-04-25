import { useState, useRef, useEffect } from 'react';
import {
  Home, BookOpen, Users, BarChart2,
  FileText, MessageCircle, Star, Video,
  Settings, ChevronRight, ChevronLeft, Bell,
  HelpCircle, LogOut, Calendar, User,
  Layers, Award, ChevronDown, CreditCard,
  Shield, Mail, BookOpen as Course,
  PenTool, UserCheck, MessageSquare
} from 'lucide-react';

import '../../css/teacher/teachersidebar.css';
import Areen from '../../assets/Profile/Areen.jpg'

export default function TeacherLayout({ children }) {
  const PFPImage = Areen;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [activeSubItem, setActiveSubItem] = useState('assignments');
  const [expandedGroup, setExpandedGroup] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleGroup = (groupId) => {
    setExpandedGroup(expandedGroup === groupId ? '' : groupId);
  };

  const menuGroups = [
    {
      id: 'main',
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview of your courses, students and activity' },
        { id: 'calendar', label: 'Calendar', icon: Calendar, description: 'View and manage course schedule and deadlines' },
      ]
    },
    {
      id: 'teaching',
      title: 'Teaching',
      items: [
        { id: 'courses', label: 'Courses', icon: BookOpen, description: 'Create, edit and manage your course content',
          subItems: [
            { id: 'overview', label: 'Overview' },
            { id: 'modules', label: 'Modules' },
            { id: 'assignments', label: 'Assignments & Grading' },
            { id: 'students', label: 'Students' },
          ]
        },
        { id: 'students', label: 'Students', icon: Users, description: 'View enrollments, progress and student data' },
        { id: 'assignments', label: 'Assignments', icon: PenTool, description: 'Manage assignments across all courses' },
        { id: 'sessions', label: 'Live Sessions', icon: Video, description: 'Schedule and manage webinars and office hours' },
      ]
    },
    {
      id: 'community',
      title: 'Community',
      items: [
        { id: 'discussions', label: 'Discussions', icon: MessageCircle, description: 'Manage course discussions and student questions' },
        { id: 'reviews', label: 'Reviews', icon: Star, description: 'See student reviews and course ratings' },
      ]
    },
    {
      id: 'insights',
      title: 'Insights',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart2, description: 'View detailed performance metrics and analytics' },
        { id: 'reports', label: 'Reports', icon: FileText, description: 'Generate and view detailed reports' },
      ]
    },
    {
      id: 'account',
      title: 'Account',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings, description: 'Configure profile, payments and preferences' },
        { id: 'help', label: 'Help Center', icon: HelpCircle, description: 'Get help and support' },
      ]
    },
  ];

  const subMenuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'modules', label: 'Modules' },
    { id: 'assignments', label: 'Assignments & Grading' },
    { id: 'students', label: 'Students' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="teacher-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
        <div className="sidebar-header">
          {sidebarOpen && <div className="logo">Acadify</div>}
          <button onClick={toggleSidebar} className="toggle-button">
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <div className="profile-section">
          <div className="avatar-container">
            <img src={PFPImage} alt="Teacher Profile" className="avatar" />
            <span className="status-indicator"></span>
          </div>
          {sidebarOpen && (
            <div className="profile-details">
              <div className="name">Prof. PFPImage Zainab</div>
              <div className="department">Computer Science</div>
              <div className="badges">
                <span className="badge badge-instructor">Instructor</span>
                <span className="badge badge-rating">4.9 ★</span>
              </div>
            </div>
          )}
        </div>

        <nav className="menu">
          {menuGroups.map(group => (
            <div key={group.id} className="menu-group">
              {sidebarOpen && (
                <div
                  className="group-header"
                  onClick={() => toggleGroup(group.id)}
                >
                  <span className="group-title">{group.title}</span>
                  <ChevronDown
                    size={16}
                    className={`group-chevron ${expandedGroup === group.id ? 'rotated' : ''}`}
                  />
                </div>
              )}

              <ul className={`menu-list ${(!sidebarOpen || expandedGroup === group.id) ? 'visible' : 'hidden'}`}>
                {group.items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveItem(item.id);
                        if (item.subItems && item.subItems.length > 0) {
                          setActiveSubItem(item.subItems[0].id);
                        }
                      }}
                      className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
                      title={!sidebarOpen ? item.description : ""}
                    >
                      <item.icon size={20} />
                      {sidebarOpen && (
                        <>
                          <span className="menu-label">{item.label}</span>
                          {item.subItems && <ChevronDown size={16} className="submenu-indicator" />}
                        </>
                      )}
                    </button>

                    {sidebarOpen && item.subItems && activeItem === item.id && (
                      <ul className="submenu-list">
                        {item.subItems.map(subItem => (
                          <li key={subItem.id}>
                            <button
                              onClick={() => setActiveSubItem(subItem.id)}
                              className={`submenu-item ${activeSubItem === subItem.id ? 'active' : ''}`}
                            >
                              <span className="submenu-dot"></span>
                              {subItem.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="logout-section">
          <button className="logout-button">
            <LogOut size={20} />
            {sidebarOpen && <span className="menu-label">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-top">
            <h1 className="page-title">
              {menuGroups.flatMap(group => group.items).find(item => item.id === activeItem)?.label || 'Dashboard'}
            </h1>

            <div className="header-actions">
              <div className="search-bar">
                <input type="text" placeholder="Search courses, students, or content..." />
                <button className="search-icon">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <button className="icon-button" title="Create New Course">
                <Course size={20} />
              </button>
              <button className="icon-button" title="Help Center">
                <HelpCircle size={20} />
              </button>
              <div className="notification">
                <button className="icon-button">
                  <Bell size={20} />
                  {notifications > 0 && <span className="notification-badge">{notifications}</span>}
                </button>
              </div>

              {/* Profile dropdown */}
              <div className="profile-dropdown" ref={profileRef}>
                <button
                  className="profile-button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <img src={PFPImage} alt="Teacher" className="avatar-small" />
                  <span className="profile-name">Areen Zainab</span>
                  <ChevronDown size={16} className={`dropdown-arrow ${profileDropdownOpen ? 'rotated' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <img src={PFPImage} alt="Teacher" className="dropdown-avatar" />
                      <div>
                        <div className="dropdown-name">Prof. PFPImage Zainab</div>
                        <div className="dropdown-email">i221115@nu.edu.pk</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <ul className="dropdown-list">
                      <li>
                        <a href="#profile">
                          <User size={16} />
                          <span>View Profile</span>
                        </a>
                      </li>
                      <li>
                        <a href="#account">
                          <Settings size={16} />
                          <span>Account Settings</span>
                        </a>
                      </li>
                      <li>
                        <a href="#billing">
                          <CreditCard size={16} />
                          <span>Billing & Payments</span>
                        </a>
                      </li>
                      <li>
                        <a href="#privacy">
                          <Shield size={16} />
                          <span>Privacy & Security</span>
                        </a>
                      </li>
                    </ul>
                    <div className="dropdown-divider"></div>
                    <a href="#logout" className="dropdown-logout">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {activeItem === 'courses' && (
            <div className="submenu">
              {subMenuItems.map(item => (
                <button
                  key={item.id}
                  className={activeSubItem === item.id ? 'active-submenu' : ''}
                  onClick={() => setActiveSubItem(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          <div className="breadcrumbs">
            <span>Home</span>
            <span>/</span>
            <span>
              {menuGroups.flatMap(group => group.items).find(item => item.id === activeItem)?.label || 'Dashboard'}
            </span>
            {activeItem === 'courses' && (
              <>
                <span>/</span>
                <span>{subMenuItems.find(item => item.id === activeSubItem)?.label || 'Assignments & Grading'}</span>
              </>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="content">
          {children || (
            <div className="content-card">
              <h2 className="content-title">
                Welcome to your {menuGroups.flatMap(group => group.items).find(item => item.id === activeItem)?.label || 'Dashboard'}
              </h2>
              <p className="content-description">
                {menuGroups.flatMap(group => group.items).find(item => item.id === activeItem)?.description || 'View and manage your teaching activities'}
              </p>

              {activeItem === 'courses' && activeSubItem === 'assignments' && (
                <div className="assignments-section">
                  <h3>Assignments & Grading</h3>
                  <p>
                    Create, manage and grade assignments, quizzes and exams for your courses. You can access this section from within any course.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
