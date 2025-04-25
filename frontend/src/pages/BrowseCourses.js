import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import { Search, Filter } from "lucide-react";
import "../css/BrowseCourses.css";
import { Link } from 'react-router-dom';
import dscourse from '../assets/Courses/datascicourse.jpg';
import webcourse from '../assets/Courses/webdev.png';
import reactcourse from '../assets/Courses/reactdev.jpeg';
import pythoncourse from '../assets/Courses/python.png';
import uiuxcourse from '../assets/Courses/advanceuiux.png';
import mlcourse from '../assets/Courses/machineL.jpeg'

const mockCourses = [
  {
    id: 1,
    title: "Intro to Python",
    instructor: "Aoun Jee",
    duration: "4 weeks",
    level: "Beginner",
    rating: 4.7,
    reviewCount: 1254,
    price: 49.99,
    image: pythoncourse,
    topics: ["Python", "Programming", "Beginner"],
    category: "Programming"
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    instructor: "Tajwar Mehmood",
    duration: "6 weeks",
    level: "Intermediate",
    rating: 4.9,
    reviewCount: 3421,
    price: 79.99,
    image: webcourse,
    topics: ["HTML", "CSS", "JavaScript"],
    category: "Programming"
  },
  {
    id: 3,
    title: "Data Science Basics",
    instructor: "Areen Zainab",
    duration: "5 weeks",
    level: "Beginner",
    rating: 4.5,
    reviewCount: 987,
    price: 59.99,
    image: dscourse,
    topics: ["Data Analysis", "Pandas", "Beginner"],
    category: "Data Science"
  },
  {
    id: 4,
    title: "Advanced React Patterns",
    instructor: "Tajwar Mehmood",
    duration: "4 weeks",
    level: "Advanced",
    rating: 4.8,
    reviewCount: 765,
    price: 89.99,
    image: reactcourse,
    topics: ["React", "JavaScript", "Advanced"],
    category: "Programming"
  },
  {
    id: 5,
    title: "Machine Learning Fundamentals",
    instructor: "Hafsa Imtiaz",
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.6,
    reviewCount: 1876,
    price: 99.99,
    image: mlcourse,
    topics: ["Machine Learning", "Python", "Data Science"],
    category: "Data Science"
  },
  {
    id: 6,
    title: "UX/UI Design Principles",
    instructor: "Fatimah Rehman",
    duration: "5 weeks",
    level: "Beginner",
    rating: 4.7,
    reviewCount: 1134,
    price: 69.99,
    image: uiuxcourse,
    topics: ["Design", "UX", "UI"],
    category: "Design"
  }
];

const BrowseCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    level: "",
    priceRange: "",
    topics: [],
    duration: ""
  });
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  const categories = ["All Courses", "Programming", "Design", "Business", "Data Science"];

  useEffect(() => {
    // Simulating API fetch with a small delay
    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
    }, 500);
  }, []);

  useEffect(() => {
    // Apply filters, category, and search
    let result = [...courses];
    
    // Apply category filter first (except for "All Courses")
    if (activeCategory !== "All Courses") {
      result = result.filter(course => course.category === activeCategory);
    }
    
    // Apply search query
    if (searchQuery) {
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply level filter
    if (filters.level) {
      result = result.filter(course => course.level === filters.level);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case "free":
          result = result.filter(course => course.price === 0);
          break;
        case "under50":
          result = result.filter(course => course.price > 0 && course.price < 50);
          break;
        case "50to100":
          result = result.filter(course => course.price >= 50 && course.price <= 100);
          break;
        case "over100":
          result = result.filter(course => course.price > 100);
          break;
        default:
          break;
      }
    }
    
    // Apply topics filter
    if (filters.topics.length > 0) {
      result = result.filter(course => 
        filters.topics.some(topic => course.topics.includes(topic))
      );
    }
    
    // Apply duration filter
    if (filters.duration) {
      switch (filters.duration) {
        case "short":
          result = result.filter(course => parseInt(course.duration) <= 4);
          break;
        case "medium":
          result = result.filter(course => parseInt(course.duration) > 4 && parseInt(course.duration) <= 6);
          break;
        case "long":
          result = result.filter(course => parseInt(course.duration) > 6);
          break;
        default:
          break;
      }
    }
    
    // Apply sorting
    if (sortBy === "popular") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredCourses(result);
  }, [searchQuery, courses, filters, sortBy, activeCategory]);

  const handleFilterChange = (filterKey, value) => {
    setFilters({
      ...filters,
      [filterKey]: value
    });
  };

  const handleTopicToggle = (topic) => {
    const updatedTopics = filters.topics.includes(topic)
      ? filters.topics.filter(t => t !== topic)
      : [...filters.topics, topic];
      
    setFilters({
      ...filters,
      topics: updatedTopics
    });
  };

  const resetFilters = () => {
    setFilters({
      level: "",
      priceRange: "",
      topics: [],
      duration: ""
    });
    setSearchQuery("");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Get all unique topics from courses
  const allTopics = Array.from(
    new Set(courses.flatMap(course => course.topics))
  );

  return (
    <div>
      <Navbar />
    
    <div className="main-container">
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container mx-auto px-4">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Next Learning Journey</h1>
            <p className="hero-description">Explore thousands of expert-led courses to fuel your career, passion, and personal growth</p>
            <div className="search-container-courses">
              <div className="search-input-wrapper-courses">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="course-filtering-search"
                />
              </div>
              <button className="search-button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="content-container">
        <div className="content-layout">
          {/* Filters Panel (sidebar) */}
          <div className={`filters-panel ${showFilters ? '' : 'hidden'} md:block`}>
            <div className="filters-card">
              <div className="filters-header">
                <h2 className="filters-title">Filters</h2>
                <button 
                  onClick={resetFilters}
                  className="reset-button"
                >
                  Reset All
                </button>
              </div>
              
              {/* Level Filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Level</h3>
                <div className="filter-options">
                  {["Beginner", "Intermediate", "Advanced"].map(level => (
                    <label key={level} className="filter-option">
                      <input
                        type="radio"
                        name="level"
                        checked={filters.level === level}
                        onChange={() => handleFilterChange("level", level)}
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Price</h3>
                <div className="filter-options">
                  {[
                    { value: "free", label: "Free" },
                    { value: "under50", label: "Under $50" },
                    { value: "50to100", label: "$50 - $100" },
                    { value: "over100", label: "Over $100" }
                  ].map(option => (
                    <label key={option.value} className="filter-option">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === option.value}
                        onChange={() => handleFilterChange("priceRange", option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Duration Filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Duration</h3>
                <div className="filter-options">
                  {[
                    { value: "short", label: "Short (≤ 4 weeks)" },
                    { value: "medium", label: "Medium (5-6 weeks)" },
                    { value: "long", label: "Long (> 6 weeks)" }
                  ].map(option => (
                    <label key={option.value} className="filter-option">
                      <input
                        type="radio"
                        name="duration"
                        checked={filters.duration === option.value}
                        onChange={() => handleFilterChange("duration", option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Topics Filter */}
              <div className="filter-section">
                <h3 className="filter-section-title">Topics</h3>
                <div className="filter-options topics-list">
                  {allTopics.map(topic => (
                    <label key={topic} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters.topics.includes(topic)}
                        onChange={() => handleTopicToggle(topic)}
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="main-content-courses">
            {/* Category tags and Sort Bar */}
            <div className="category-sort-bar">
              <div className="category-tags">
                {categories.map(category => (
                  <button 
                    key={category}
                    className={`category-tag ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="sort-filter-controls">
                <button
                  onClick={toggleFilters}
                  className="filter-toggle-button md:hidden"
                >
                  <Filter size={18} className="filter-button-icon" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Results count and info */}
            <div className="results-info">
              <div className="results-count">
                Showing <span className="results-count-number">{filteredCourses.length}</span> courses
                {activeCategory !== "All Courses" && (
                  <span className="active-category-label"> in {activeCategory}</span>
                )}
              </div>
              
              {(filters.level || filters.priceRange || filters.duration || filters.topics.length > 0 || activeCategory !== "All Courses") ? (
                <button 
                  onClick={() => {
                    resetFilters();
                    setActiveCategory("All Courses");
                  }}
                  className="clear-filters-button"
                >
                  Clear all filters
                </button>
              ) : null}
            </div>
            
            {/* Results */}
            {filteredCourses.length > 0 ? (
              <div className="courses-grid">
                {filteredCourses.map((course) => (
                  <Link to={`/courses/${course.id}`} key={course.id} style={{ textDecoration: "none" }}>
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    instructor={course.instructor}
                    rating={Math.floor(course.rating)}
                    reviewCount={course.reviewCount}
                    price={course.price.toFixed(2)}
                    image={course.image}
                    level={course.level}
                    duration={course.duration}
                  />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="empty-results">
                <p className="empty-message">No courses match your search criteria.</p>
                <button 
                  onClick={() => {
                    resetFilters();
                    setActiveCategory("All Courses");
                  }}
                  className="clear-empty-button"
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredCourses.length > 0 && (
              <div className="pagination">
                <div className="pagination-controls">
                  <button className="pagination-button">Previous</button>
                  <button className="pagination-button active">1</button>
                  <button className="pagination-button">2</button>
                  <button className="pagination-button">3</button>
                  <button className="pagination-button">Next</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseCourses;