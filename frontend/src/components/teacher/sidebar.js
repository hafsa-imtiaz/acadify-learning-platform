import { useState, useRef, useEffect, createContext, useContext } from 'react';
import {
  Home, BookOpen, Users, BarChart2,
  FileText, MessageCircle, Star, Video,
  Settings, ChevronRight, ChevronLeft, Bell,
  HelpCircle, LogOut, Calendar, User,
  Layers, Award, ChevronDown, CreditCard,
  Shield, Mail, BookOpen as Course,
  PenTool, UserCheck, MessageSquare, Moon
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../css/teacher/teacher-sidebar.module.css';
import DefaultProfileImage from '../../assets/Profile/default-pfp.jpeg'; // Fallback image

// Create context for managing page metadata
export const PageMetadataContext = createContext();

export function usePageMetadata() {
  return useContext(PageMetadataContext);
}

// Define a map of special routes that aren't in the sidebar
const specialRoutes = {
  '/teacher/courses/create': {
    title: 'Create New Course',
    breadcrumbs: ['Home', 'My Courses', 'Create New Course'],
    parentId: 'mycourses' // This connects it to a sidebar item for highlighting
  },
  '/teacher/courses/:courseId': {
    title: 'Course Details', // This will be dynamic
    breadcrumbs: ['Home', 'My Courses', 'Course Details'],
    parentId: 'mycourses'
  },
  '/teacher/students/:studentId': {
    title: 'Student Profile',
    breadcrumbs: ['Home', 'Students', 'Student Profile'],
    parentId: 'students'
  },
  '/teacher/assignments/create': {
    title: 'Create Assignment',
    breadcrumbs: ['Home', 'Assignments', 'Create Assignment'],
    parentId: 'assignments'
  },
  // Add more special routes as needed
};

export default function TeacherLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // States for user and teacher data from localStorage
  const [userData, setUserData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [profileImage, setProfileImage] = useState(DefaultProfileImage);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Set default active states based on current path
  const [activeItem, setActiveItem] = useState('dashboard');
  const [activeSubItem, setActiveSubItem] = useState('overview');
  const [expandedGroup, setExpandedGroup] = useState('main');
  const [teachingSubmenuOpen, setTeachingSubmenuOpen] = useState(false);
  
  // Page metadata state
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [breadcrumbs, setBreadcrumbs] = useState(['Home', 'Dashboard']);
  const [dynamicMetadata, setDynamicMetadata] = useState(null);

  const profileRef = useRef(null);
  
  // Load user and teacher data from localStorage on component mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedTeacher = localStorage.getItem('roleDetails');
      console.log(storedUser);
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      }
      
      if (storedTeacher) {
        const parsedTeacher = JSON.parse(storedTeacher);
        setTeacherData(parsedTeacher);
      }
      
      // Set profile image if available in user data
      // This assumes you have a profileImage field in your user data
      // Adjust according to your actual user data structure
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.profileImage) {
          setProfileImage(parsedUser.profileImage);
        }
      }
    } catch (error) {
      console.error("Error loading user data from localStorage:", error);
    }
  }, []);

  // Menu structure with routes
  const menuGroups = [
    {
      id: 'main',
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/teacher/dashboard', 
          description: 'Overview of your courses, students and activity' },
        { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/teacher/calendar',
          description: 'View and manage course schedule and deadlines' },
      ]
    },
    {
      id: 'teaching',
      title: 'Teaching',
      items: [
        { 
          id: 'mycourses', 
          label: 'My Courses', 
          icon: BookOpen, 
          path: '/teacher/courses',
          description: 'Manage your courses',          
        },
        { id: 'assignments', label: 'Assignments', icon: PenTool, path: '/teacher/assignments', 
          description: 'Manage assignments across all courses' },
        { id: 'sessions', label: 'Live Sessions', icon: Video, path: '/teacher/sessions', 
          description: 'Schedule and manage webinars and office hours' },
      ]
    },
    {
      id: 'community',
      title: 'Community',
      items: [
        { id: 'reviews', label: 'Reviews', icon: Star, path: '/teacher/reviews', 
          description: 'See student reviews and course ratings' },
      ]
    },
    {
      id: 'insights',
      title: 'Insights',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart2, path: '/teacher/analytics', 
          description: 'View detailed performance metrics and analytics' },
        { id: 'reports', label: 'Reports', icon: FileText, path: '/teacher/reports', 
          description: 'Generate and view detailed reports' },
      ]
    },
    {
      id: 'account',
      title: 'Account',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings, path: '/teacher/settings', 
          description: 'Configure profile, payments and preferences' },
        { id: 'help', label: 'Help Center', icon: HelpCircle, path: '/teacher/help', 
          description: 'Get help and support' },
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

  // Format teacher name with appropriate title
  const getFormattedTeacherName = () => {
    if (!userData) return "Teacher";
    
    const title = teacherData?.professionalTitle || "Prof.";
    const full_name = userData.fullName || "";
    
    return `${title} ${full_name}`.trim();
  };

  // Get teacher specialization
  const getTeacherSpecialization = () => {
    return teacherData?.specialization || teacherData?.department || "Educator";
  };

  // Get teacher rating
  const getTeacherRating = () => {
    return teacherData?.averageRating?.toFixed(1) || "N/A";
  };

  // Initialize active item and submenu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check if this is a special route
    const specialRoute = findSpecialRoute(currentPath);
    
    if (specialRoute) {
      setPageTitle(specialRoute.title);
      setBreadcrumbs(specialRoute.breadcrumbs);
      
      // If this special route is associated with a sidebar item, highlight it
      if (specialRoute.parentId) {
        // Find the parent menu item to highlight
        for (const group of menuGroups) {
          for (const item of group.items) {
            if (item.id === specialRoute.parentId) {
              setActiveItem(item.id);
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
    
    // Otherwise use the standard sidebar-based navigation
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
          
          // If this is teaching, check for submenu match
          if (item.id === 'teaching' && item.hasSubmenu) {
            setTeachingSubmenuOpen(true);
            
            // Find matching submenu item
            const subItem = item.subItems.find(sub => 
              currentPath === sub.path || currentPath.startsWith(sub.path + '/')
            );
            
            if (subItem) {
              setActiveSubItem(subItem.id);
              setBreadcrumbs(['Home', item.label, subItem.label]);
            } else {
              setActiveSubItem('my-courses');
            }
          }
          
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
    setSidebarOpen(!sidebarOpen);
  };

  const toggleGroup = (groupId) => {
    setExpandedGroup(expandedGroup === groupId ? '' : groupId);
  };
  
  const handleNavigation = (item) => {
    if (item.id === 'teaching' && activeItem === 'teaching') {
      setTeachingSubmenuOpen(!teachingSubmenuOpen);
    } else {
      setActiveItem(item.id);
      if (item.hasSubmenu) {
        setTeachingSubmenuOpen(true);
        if (item.subItems && item.subItems.length > 0) {
          setActiveSubItem(item.subItems[0].id);
        }
      }
      navigate(item.path);
    }
  };
  
  const handleSubItemClick = (subItem) => {
    setActiveSubItem(subItem.id);
    navigate(subItem.path);
  };

  const handleLogout = () => {
    // Clear the token and user info from both sessionStorage and localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roleDetails');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Redirect user to the login page after logout
    navigate('/login');
  };
  
  // Context value for child components
  const pageMetadataContextValue = {
    setPageMetadata: updatePageMetadata
  };

  // Get user email from userData
  const getUserEmail = () => {
    return userData?.email || "";
  };

  return (
    <PageMetadataContext.Provider value={pageMetadataContextValue}>
      <div className={styles.teacherLayout}>
        {/* Sidebar */}
        <div className={`${styles.sidebar} ${sidebarOpen ? styles.expanded : styles.collapsed}`}>
          <div className={styles.sidebarHeader}>
            {sidebarOpen && <div className={styles.logo}>Acadify</div>}
            <button onClick={toggleSidebar} className={styles.toggleButton}>
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <img src={profileImage} alt="Teacher Profile" className={styles.avatar} onClick={() => navigate('/teacher/profile')}/>
              <span className={styles.statusIndicator}></span>
            </div>
            {sidebarOpen && (
              <div className={styles.profileDetails}>
                <div className={styles.name}>{getFormattedTeacherName()}</div>
                <div className={styles.department}>{getTeacherSpecialization()}</div>
                <div className={styles.badges}>
                  <span className={`${styles.badge} ${styles.badgeInstructor}`}>Instructor</span>
                  <span className={`${styles.badge} ${styles.badgeRating}`}>{getTeacherRating()} ★</span>
                </div>
              </div>
            )}
          </div>

          <nav className={styles.menu}>
            {menuGroups.map(group => (
              <div key={group.id} className={styles.menuGroup}>
                {sidebarOpen && (
                  <div
                    className={styles.groupHeader}
                    onClick={() => toggleGroup(group.id)}
                  >
                    <span className={styles.groupTitle}>{group.title}</span>
                    <ChevronDown
                      size={16}
                      className={`${styles.groupChevron} ${expandedGroup === group.id ? styles.rotated : ''}`}
                    />
                  </div>
                )}

                <ul className={`${styles.menuList} ${(!sidebarOpen || expandedGroup === group.id) ? styles.visible : styles.hidden}`}>
                  {group.items.map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavigation(item)}
                        className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
                        title={!sidebarOpen ? item.description : ""}
                      >
                        <item.icon size={20} />
                        {sidebarOpen && (
                          <>
                            <span className={styles.menuLabel}>{item.label}</span>
                            {item.hasSubmenu && (
                              <ChevronDown 
                                size={16} 
                                className={`${styles.submenuIndicator} ${teachingSubmenuOpen ? styles.rotated : ''}`} 
                              />
                            )}
                          </>
                        )}
                      </button>

                      {sidebarOpen && item.hasSubmenu && activeItem === item.id && (
                        <ul className={`${styles.submenuList} ${teachingSubmenuOpen ? styles.visible : styles.hidden}`}>
                          {item.subItems.map(subItem => (
                            <li key={subItem.id}>
                              <button
                                onClick={() => handleSubItemClick(subItem)}
                                className={`${styles.submenuItem} ${activeSubItem === subItem.id ? styles.active : ''}`}
                              >
                                <span className={styles.submenuDot}></span>
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

          <div className={styles.logoutSection}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              <LogOut size={20} />
              {sidebarOpen && <span className={styles.menuLabel}>Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <header className={styles.header}>
            <div className={styles.headerTop}>
              <h1 className={styles.pageTitle}>{pageTitle}</h1>

              <div className={styles.headerActions}>
                <div className={styles.searchBar}>
                  <input type="text" placeholder="Search courses, students, or content..." />
                  <button className={styles.searchIcon}>
                    <svg className="icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
                <button className={styles.iconButton} title="View My Courses" onClick={() => navigate('/teacher/courses')}>
                  <Course size={20} />
                </button>
                <button className={styles.iconButton} title="Help Center" onClick={() => navigate('/teacher/help')}>
                  <HelpCircle size={20} />
                </button>
                <div className={styles.notification}>
                  <button className={styles.iconButton} title="Notifications" onClick={() => navigate('/teacher/notifications')}>
                    <Bell size={20} />
                    {notifications > 0 && <span className={styles.notificationBadge}>{notifications}</span>}
                  </button>
                </div>

                {/* Profile dropdown */}
                <div className={styles.profileDropdown} ref={profileRef}>
                  <button
                    className={styles.profileButton}
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  >
                    <img src={profileImage} alt="Teacher" className={styles.avatarSmall} />
                    <span className={styles.profileName}>
                      {userData ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() : 'Teacher'}
                    </span>
                    <ChevronDown size={16} className={`${styles.dropdownArrow} ${profileDropdownOpen ? styles.rotated : ''}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      <div className={styles.dropdownHeader}>
                        <img src={profileImage} alt="Teacher" className={styles.dropdownAvatar} />
                        <div>
                          <div className={styles.dropdownName}>{getFormattedTeacherName()}</div>
                          <div className={styles.dropdownEmail}>{getUserEmail()}</div>
                        </div>
                      </div>
                      <div className={styles.dropdownDivider}></div>
                      <ul className={styles.dropdownList}>
                        <li>
                          <a href="/teacher/profile">
                            <User size={16} />
                            <span>View Profile</span>
                          </a>
                        </li>
                        <li>
                          <a href="/teacher/settings">
                            <Settings size={16} />
                            <span>Account Settings</span>
                          </a>
                        </li>
                        <li>
                          <a href="/teacher/settings#payment">
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
                      <div className={styles.dropdownDivider}></div>
                      <a href="#logout" className={styles.dropdownLogout} onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.breadcrumbs}>
              {breadcrumbs.map((crumb, index) => (
                <span key={index}>
                  {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                  <span className={index === breadcrumbs.length - 1 ? styles.activeBreadcrumb : ''}>{crumb}</span>
                </span>
              ))}
            </div>
          </header>

          {/* Page Content - Only render children here */}
          <div className={styles.content}>
            {children}
          </div>
        </div>
        
        {/* Dark mode toggle button (optional) */}
        <button className={styles.darkModeToggle} title="Toggle Dark Mode">
          <Moon size={20} />
        </button>
      </div>
    </PageMetadataContext.Provider>
  );
}