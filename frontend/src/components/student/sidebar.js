import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, FileText, Award, User, Settings, 
  LogOut, MessageSquare, Calendar, Video, ChevronDown, 
  Layers, ChevronLeft, ChevronRight
} from 'lucide-react';
import '../../css/student/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedGroup, setExpandedGroup] = useState('main');

  // Menu structure with routes
  const menuGroups = [
    {
      id: 'main',
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/student/dashboard', 
          description: 'Overview of your courses and progress' },
        { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/student/calendar',
          description: 'View upcoming assignments and events' },
      ]
    },
    {
      id: 'learning',
      title: 'Learning',
      items: [
        { id: 'courses', label: 'My Courses', icon: BookOpen, path: '/student/courses',
          description: 'Access your enrolled courses' },
        { id: 'assignments', label: 'Assignments', icon: FileText, path: '/student/assignments', 
          description: 'View and submit assignments' },
        { id: 'achievements', label: 'Achievements', icon: Award, path: '/student/achievements', 
          description: 'View your certificates and badges' },
      ]
    },
    {
      id: 'community',
      title: 'Community',
      items: [
        { id: 'discussions', label: 'Discussions', icon: MessageSquare, path: '/student/discussions', 
          description: 'Participate in course discussions' },
        { id: 'live-sessions', label: 'Live Sessions', icon: Video, path: '/student/live-sessions', 
          description: 'Join live classes and webinars' },
      ]
    },
    {
      id: 'account',
      title: 'Account',
      items: [
        { id: 'profile', label: 'My Profile', icon: User, path: '/student/profile', 
          description: 'Manage your profile and settings' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/student/settings', 
          description: 'Configure account preferences' },
      ]
    },
  ];

  // Check if the current path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Toggle group expansion
  const toggleGroup = (groupId) => {
    setExpandedGroup(expandedGroup === groupId ? '' : groupId);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear auth tokens
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isOpen && <div className="sidebar-logo">Acadify</div>}
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="profile-section">
        <div className="avatar-container">
          <div className="avatar">
            <User size={24} />
          </div>
          <span className="status-indicator"></span>
        </div>
        {isOpen && (
          <div className="profile-details">
            <div className="name">Hafsa Imtiaz</div>
            <div className="role">Student</div>
            <div className="badges">
              <span className="badge badge-level">Level 3</span>
              <span className="badge badge-courses">5 Courses</span>
            </div>
          </div>
        )}
      </div>

      <nav className="sidebar-menu">
        {menuGroups.map(group => (
          <div key={group.id} className="menu-group">
            {isOpen && (
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

            <ul className={`menu-list ${(!isOpen || expandedGroup === group.id) ? 'visible' : 'hidden'}`}>
              {group.items.map(item => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
                    title={!isOpen ? item.description : ""}
                  >
                    <item.icon size={20} className="menu-icon" />
                    {isOpen && (
                      <span className="menu-label">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={20} className="logout-icon" />
          {isOpen && <span className="logout-text">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;