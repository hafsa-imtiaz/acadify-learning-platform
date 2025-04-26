import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCardTeacher from '../../components/teacher/TeacherCourseCard';
import { PlusCircle, Search, Filter } from 'lucide-react';
import Sidebar from '../../components/teacher/sidebar';
import '../../css/teacher/my-courses.css';

const MyCourses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: 'Complete Web Development Bootcamp',
          instructor: 'John Smith',
          status: 'published',
          enrolled: 245,
          rating: 4.8,
          reviewCount: 187,
          price: 89.99,
          image: '/api/placeholder/400/300',
          level: 'Beginner',
          duration: '12 weeks',
          lastUpdated: '2025-03-15',
        },
        {
          id: 2,
          title: 'Advanced JavaScript: Modern Patterns and Best Practices',
          instructor: 'John Smith',
          status: 'published',
          enrolled: 142,
          rating: 4.6,
          reviewCount: 98,
          price: 79.99,
          image: '/api/placeholder/400/300',
          level: 'Advanced',
          duration: '8 weeks',
          lastUpdated: '2025-04-02',
        },
        {
          id: 3,
          title: 'UX Design Fundamentals',
          instructor: 'John Smith',
          status: 'draft',
          enrolled: 0,
          rating: 0,
          reviewCount: 0,
          price: 69.99,
          image: '/api/placeholder/400/300',
          level: 'Intermediate',
          duration: '6 weeks',
          lastUpdated: '2025-04-10',
        },
        {
          id: 4,
          title: 'Mobile App Development with React Native',
          instructor: 'John Smith',
          status: 'draft',
          enrolled: 0,
          rating: 0,
          reviewCount: 0,
          price: 99.99,
          image: '/api/placeholder/400/300',
          level: 'Intermediate',
          duration: '10 weeks',
          lastUpdated: '2025-04-15',
        },
        {
          id: 5,
          title: 'Introduction to Machine Learning',
          instructor: 'John Smith',
          status: 'archived',
          enrolled: 78,
          rating: 4.2,
          reviewCount: 45,
          price: 119.99,
          image: '/api/placeholder/400/300',
          level: 'Advanced',
          duration: '14 weeks',
          lastUpdated: '2024-12-05',
        },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  // Handle course navigation
  const handleCourseClick = (courseId) => {
    //navigate(`/teacher/courses/${courseId}`);
  };

  // Handle adding a new course
  const handleAddCourse = () => {
    navigate('/courses/create');
  };

  // Filter courses based on active tab and search term
  const filteredCourses = courses.filter((course) => {
    const matchesTab = 
      activeTab === 'all' || 
      course.status === activeTab;
    
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  // Get counts for each category
  const getCourseCount = (status) => {
    return status === 'all' 
      ? courses.length 
      : courses.filter(course => course.status === status).length;
  };

  return (
    <Sidebar>
    <div className="my-courses-page">
      <div className="courses-container">
       
        <div className="courses-header">
          <div className="search-filter-container">
            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-dropdown">
              <Filter size={18} />
              <select>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-students">Most Students</option>
                <option value="highest-rated">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="courses-tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Courses ({getCourseCount('all')})
          </button>
          <button 
            className={`tab ${activeTab === 'published' ? 'active' : ''}`}
            onClick={() => setActiveTab('published')}
          >
            Published ({getCourseCount('published')})
          </button>
          <button 
            className={`tab ${activeTab === 'draft' ? 'active' : ''}`}
            onClick={() => setActiveTab('draft')}
          >
            Drafts ({getCourseCount('draft')})
          </button>
          <button 
            className={`tab ${activeTab === 'archived' ? 'active' : ''}`}
            onClick={() => setActiveTab('archived')}
          >
            Archived ({getCourseCount('archived')})
          </button>
        </div>
        
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your courses...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="courses-grid">
            {/* Add New Course Card */}
            <div className="add-course-card" onClick={handleAddCourse}>
              <div className="add-course-content">
                <div className="add-icon">
                  <PlusCircle size={48} />
                </div>
                <h3>Create New Course</h3>
                <p>Start building your next educational journey</p>
              </div>
            </div>
            
            {/* Course Cards */}
            {filteredCourses.map((course) => (
              <div key={course.id} onClick={() => handleCourseClick(course.id)}>
                <CourseCardTeacher 
                  course={course}
                  onView={() => navigate(`/teacher/course/${course.id}`)}
                  onEdit={() => navigate(`/courses/edit/${course.id}`)}
                  onDelete={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
                      console.log(`Delete course ${course.id}`);
                      // API call to delete course
                      setCourses(courses.filter(c => c.id !== course.id));
                    }
                  }}
                  onGoToDashboard={(e) => {
                    e.stopPropagation();
                    navigate(`/courses/${course.id}/dashboard`);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            {searchTerm ? (
              <>
                <h3>No courses match your search</h3>
                <p>Try different keywords or clear your search</p>
                <button 
                  className="clear-search-btn" 
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <h3>No courses found</h3>
                <p>Get started by creating your first course</p>
                <button 
                  className="create-course-btn" 
                  onClick={handleAddCourse}
                >
                  Create Course
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
    </Sidebar>
  );
};

export default MyCourses;