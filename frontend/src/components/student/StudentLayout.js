import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, Bell, Search, Moon, Settings, LogOut
} from 'lucide-react';
import Sidebar from './sidebar';  // Use your Sidebar component
import StudentDashboard from './StudentDashboard';
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
  
  // Page metadata state
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [breadcrumbs, setBreadcrumbs] = useState(['Home', 'Dashboard']);
  const [dynamicMetadata, setDynamicMetadata] = useState(null);

  const profileRef = useRef(null);

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

  // Initialize page title and breadcrumbs based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check if this is a special route
    const specialRoute = findSpecialRoute(currentPath);
    
    if (specialRoute) {
      setPageTitle(specialRoute.title);
      setBreadcrumbs(specialRoute.breadcrumbs);
      return;
    }
    
    // If we have dynamic metadata set by a child component, use that
    if (dynamicMetadata) {
      setPageTitle(dynamicMetadata.title);
      setBreadcrumbs(dynamicMetadata.breadcrumbs);
      return;
    }
    
    // Set page title based on route
    switch (currentPath) {
      case '/student':
      case '/student/dashboard':
        setPageTitle('Dashboard');
        setBreadcrumbs(['Home', 'Dashboard']);
        break;
      case '/student/courses':
        setPageTitle('My Courses');
        setBreadcrumbs(['Home', 'My Courses']);
        break;
      case '/student/assignments':
        setPageTitle('Assignments');
        setBreadcrumbs(['Home', 'Assignments']);
        break;
      case '/student/achievements':
        setPageTitle('Achievements');
        setBreadcrumbs(['Home', 'Achievements']);
        break;
      case '/student/profile':
        setPageTitle('My Profile');
        setBreadcrumbs(['Home', 'My Profile']);
        break;
      case '/student/settings':
        setPageTitle('Settings');
        setBreadcrumbs(['Home', 'Settings']);
        break;
      default:
        // If no match found, fallback to Dashboard
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
        {/* Sidebar Component */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className={`main-content ${isSidebarOpen ? '' : 'expanded'}`}>
          <header className="header">
            <div className="header-top">
              <h1 className="page-title">{pageTitle}</h1>

              <div className="header-actions">
                <div className="search-bar">
                  <input type="text" placeholder="Search courses, assignments, or lessons..." />
                  <button className="search-icon">
                    <Search size={20} />
                  </button>
                </div>
                
                <div className="notification">
                  <button className="icon-button" title="Notifications">
                    <Bell size={30} />
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
                    <span className={`dropdown-arrow ${profileDropdownOpen ? 'up' : 'down'}`}></span>
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
            {/* Conditional rendering: Show Dashboard for dashboard routes, otherwise show other components */}
            {(location.pathname === '/student/dashboard' || location.pathname === '/student') ? (
              <StudentDashboard />
            ) : (
              <Outlet />
            )}
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