import { useState, useRef, useEffect} from 'react';
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
import Areen from '../../assets/Profile/Areen.jpg';

export default function TeacherLayout({ children }) {
  const PFPImage = Areen;
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Set default active states based on current path
  const [activeItem, setActiveItem] = useState('dashboard');
  const [activeSubItem, setActiveSubItem] = useState('overview');
  const [expandedGroup, setExpandedGroup] = useState('main');
  const [teachingSubmenuOpen, setTeachingSubmenuOpen] = useState(false);

  const profileRef = useRef(null);

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
        { id: 'students', label: 'Students', icon: Users, path: '/teacher/students', 
          description: 'View enrollments, progress and student data' },
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
        { id: 'discussions', label: 'Discussions', icon: MessageCircle, path: '/teacher/discussions', 
          description: 'Manage course discussions and student questions' },
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

  const subMenuItems = [
    { id: 'overview', label: 'Overview', path: '/teacher/courses' },
    { id: 'modules', label: 'Modules', path: '/teacher/courses/modules' },
    { id: 'assignments', label: 'Assignments & Grading', path: '/teacher/courses/assignments' },
    { id: 'students', label: 'Students', path: '/teacher/courses/students' },
    { id: 'settings', label: 'Settings', path: '/teacher/courses/settings' }
  ];

  // Initialize active item and submenu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find the item that matches the current path
    let foundItem = false;
    if(currentPath == "/courses/create"){
      foundItem = true;
    }
    
    for (const group of menuGroups) {
      for (const item of group.items) {
        // Check if the current path matches this item's path
        if (currentPath === item.path || currentPath.startsWith(item.path + '/')) {
          setActiveItem(item.id);
          setExpandedGroup(group.id);
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
    if (!foundItem) {
      setActiveItem('dashboard');
      setExpandedGroup('main');
    }
  }, [location.pathname]);

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
    navigate('/login');
  };
  return (
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
            <img src={PFPImage} alt="Teacher Profile" className={styles.avatar} onClick={() => navigate('/teacher/profile')}/>
            <span className={styles.statusIndicator}></span>
          </div>
          {sidebarOpen && (
            <div className={styles.profileDetails}>
              <div className={styles.name}>Prof. Areen Zainab</div>
              <div className={styles.department}>Computer Science</div>
              <div className={styles.badges}>
                <span className={`${styles.badge} ${styles.badgeInstructor}`}>Instructor</span>
                <span className={`${styles.badge} ${styles.badgeRating}`}>4.9 ★</span>
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
            <h1 className={styles.pageTitle}>
              {menuGroups.flatMap(group => group.items).find(item => item.id === activeItem)?.label || 'Dashboard'}
            </h1>

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
                  <img src={PFPImage} alt="Teacher" className={styles.avatarSmall} />
                  <span className={styles.profileName}>Areen Zainab</span>
                  <ChevronDown size={16} className={`${styles.dropdownArrow} ${profileDropdownOpen ? styles.rotated : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownHeader}>
                      <img src={PFPImage} alt="Teacher" className={styles.dropdownAvatar} />
                      <div>
                        <div className={styles.dropdownName}>Prof. Areen Zainab</div>
                        <div className={styles.dropdownEmail}>i221115@nu.edu.pk</div>
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

          {activeItem === 'teaching' && (
            <div className={styles.submenu}>
              {menuGroups.find(g => g.id === 'teaching')?.items.find(i => i.id === 'teaching')?.subItems.map(item => (
                <button
                  key={item.id}
                  className={activeSubItem === item.id ? styles.activeSubmenu : ''}
                  onClick={() => {
                    setActiveSubItem(item.id);
                    navigate(item.path);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          <div className={styles.breadcrumbs}>
            <span>Home</span>
            <span>/</span>
            <span>
              {menuGroups.flatMap(group => group.items).find(item => item.id === activeItem)?.label || 'Dashboard'}
            </span>
            {activeItem === 'teaching' && activeSubItem && (
              <>
                <span>/</span>
                <span>
                  {menuGroups.find(g => g.id === 'teaching')?.items.find(i => i.id === 'teaching')?.subItems.find(item => item.id === activeSubItem)?.label || 'My Courses'}
                </span>
              </>
            )}
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
  );
}