import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, BookOpen, User, Layers, FileText, Award, Settings, 
  LogOut, Menu, X, Bell, Search, Calendar, Video,
  MessageCircle, ChevronDown, ChevronLeft, ChevronRight, Moon
} from 'lucide-react';
import Sidebar from './sidebar';
import '../../css/student/StudentLayout.css';

// Create context for managing page metadata
export const PageMetadataContext = createContext();

export function usePageMetadata() {
  return useContext(PageMetadataContext);
}

// Define a map of special routes that aren't in the sidebar
const specialRoutes = {
  '/student/courses/:courseId': {
    title: 'Course Details', 
    breadcrumbs: ['Home', 'My Courses', 'Course Details'],
    parentId: 'courses'
  },
  '/student/assignment/:assignmentId': {
    title: 'Assignment Details',
    breadcrumbs: ['Home', 'Assignments', 'Assignment Details'],
    parentId: 'assignments'
  },
};

const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(2);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Set default active states based on current path
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedGroup, setExpandedGroup] = useState('main');
  
  // Page metadata state
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [breadcrumbs, setBreadcrumbs] = useState(['Home', 'Dashboard']);
  const [dynamicMetadata, setDynamicMetadata] = useState(null);

  const profileRef = useRef(null);

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
        { id: 'discussions', label: 'Discussions', icon: MessageCircle, path: '/student/discussions', 
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

  // Helper function to match dynamic routes
  const findSpecialRoute = (path) => {
    // First check exact matches
    if (specialRoutes[path]) {
      return specialRoutes[path];
    }
    
    // Then check for pattern matches (like :courseId)
    for (const [routePattern, metadata] of Object.entries(specialRoutes)) {
      if (routePattern.includes(':')) {
        const regexPattern = routePattern
          .replace(/:[^/]+/g, '([^/]+)') // Replace :param with capture group
          .replace(/\//g, '\\/');         // Escape forward slashes
          
        const regex = new RegExp(`^${regexPattern}$`);
        if (regex.test(path)) {
          return metadata;
        }
      }
    }
    
    return null;
  };

  // Function to update dynamic page metadata
  const updatePageMetadata = (title, crumbs) => {
    setDynamicMetadata({
      title: title,
      breadcrumbs: crumbs
    });
  };

  // Initialize active item based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check if this is a special route
    const specialRoute = findSpecialRoute(currentPath);
    
    if (specialRoute) {
      setPageTitle(specialRoute.title);
      setBreadcrumbs(specialRoute.breadcrumbs);
      
      if (specialRoute.parentId) {
        setActiveItem(specialRoute.parentId);
        
        // Find the group containing this item
        for (const group of menuGroups) {
          for (const item of group.items) {
            if (item.id === specialRoute.parentId) {
              setExpandedGroup(group.id);
              break;
            }
          }
        }
      }
      return;
    }
    
    // If we have dynamic metadata set by a child component, use that
    if (dynamicMetadata) {
      setPageTitle(dynamicMetadata.title);
      setBreadcrumbs(dynamicMetadata.breadcrumbs);
    }
    
    // Standard sidebar-based navigation
    let foundItem = false;
    
    for (const group of menuGroups) {
      for (const item of group.items) {
        // Check if the current path matches this item's path
        if (currentPath === item.path || currentPath.startsWith(item.path + '/')) {
          setActiveItem(item.id);
          setExpandedGroup(group.id);
          setPageTitle(item.label);
          setBreadcrumbs(['Home', item.label]);
          foundItem = true;
          break;
        }
      }
      if (foundItem) break;
    }
    
    // Default to dashboard if no match found
    if (!foundItem && !specialRoute && !dynamicMetadata) {
      setActiveItem('dashboard');
      setExpandedGroup('main');
      setPageTitle('Dashboard');
      setBreadcrumbs(['Home', 'Dashboard']);
    }
  }, [location.pathname, dynamicMetadata]);

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
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleGroup = (groupId) => {
    setExpandedGroup(expandedGroup === groupId ? '' : groupId);
  };
  
  const handleNavigation = (path, itemId) => {
    setActiveItem(itemId);
    navigate(path);
  };

  const handleLogout = () => {
    // Clear auth tokens
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roleDetails');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };
  
  // Context value for child components
  const pageMetadataContextValue = {
    setPageMetadata: updatePageMetadata
  };

  return (
    <PageMetadataContext.Provider value={pageMetadataContextValue}>
      <div className="student-layout">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
          <div className="sidebar-header">
            {isSidebarOpen && <div className="logo">Acadify</div>}
            <button onClick={toggleSidebar} className="toggle-button">
              {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          <div className="profile-section">
            <div className="avatar-container">
              <div className="avatar">
                <User size={24} />
              </div>
              <span className="status-indicator"></span>
            </div>
            {isSidebarOpen && (
              <div className="profile-details">
                <div className="name">John Doe</div>
                <div className="role">Student</div>
                <div className="badges">
                  <span className="badge badge-level">Level 3</span>
                  <span className="badge badge-courses">5 Courses</span>
                </div>
              </div>
            )}
          </div>

          <nav className="menu">
            {menuGroups.map(group => (
              <div key={group.id} className="menu-group">
                {isSidebarOpen && (
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

                <ul className={`menu-list ${(!isSidebarOpen || expandedGroup === group.id) ? 'visible' : 'hidden'}`}>
                  {group.items.map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavigation(item.path, item.id)}
                        className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
                        title={!isSidebarOpen ? item.description : ""}
                      >
                        <item.icon size={20} />
                        {isSidebarOpen && (
                          <span className="menu-label">{item.label}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="logout-section">
            <button className="logout-button" onClick={handleLogout}>
              <LogOut size={20} />
              {isSidebarOpen && <span className="menu-label">Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="header">
            <div className="header-top">
              <h1 className="page-title">{pageTitle}</h1>

              <div className="header-actions">
                <div className="search-bar">
                  <input type="text" placeholder="Search courses, assignments, or lessons..." />
                  <button className="search-icon">
                    <Search size={18} />
                  </button>
                </div>
                
                <div className="notification">
                  <button className="icon-button" title="Notifications">
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
                    <div className="avatar-small">
                      <User size={18} />
                    </div>
                    <span className="profile-name">John Doe</span>
                    <ChevronDown size={16} className={`dropdown-arrow ${profileDropdownOpen ? 'rotated' : ''}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div className="dropdown-menu">
                      <div className="dropdown-header">
                        <div className="dropdown-avatar">
                          <User size={32} />
                        </div>
                        <div>
                          <div className="dropdown-name">John Doe</div>
                          <div className="dropdown-email">john.doe@example.com</div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <ul className="dropdown-list">
                        <li>
                          <Link to="/student/profile">
                            <User size={16} />
                            <span>View Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/student/settings">
                            <Settings size={16} />
                            <span>Account Settings</span>
                          </Link>
                        </li>
                      </ul>
                      <div className="dropdown-divider"></div>
                      <a href="#logout" className="dropdown-logout" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="breadcrumbs">
              {breadcrumbs.map((crumb, index) => (
                <span key={index}>
                  {index > 0 && <span className="breadcrumb-separator">/</span>}
                  <span className={index === breadcrumbs.length - 1 ? 'active-breadcrumb' : ''}>{crumb}</span>
                </span>
              ))}
            </div>
          </header>

          {/* Page Content */}
          <div className="content">
            <Outlet />
          </div>
        </div>
        
        {/* Dark mode toggle button */}
        <button className="dark-mode-toggle" title="Toggle Dark Mode">
          <Moon size={20} />
        </button>
      </div>
    </PageMetadataContext.Provider>
  );
};

export default StudentLayout;