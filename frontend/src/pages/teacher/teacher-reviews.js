import React, { useState, useEffect } from 'react';
import styles from '../../css/teacher/teacher-reviews.module.css';
import { 
  Search, 
  Star, 
  Flag, 
  MessageSquare, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  User
} from 'lucide-react';
import TeacherLayout from '../../components/teacher/sidebar'

const ReviewsPage = () => {
  // States for tabs, filters, and pagination
  const [activeTab, setActiveTab] = useState('course');
  const [courseReviews, setCourseReviews] = useState([]);
  const [instructorReviews, setInstructorReviews] = useState([]);
  const [filteredCourseReviews, setFilteredCourseReviews] = useState([]);
  const [filteredInstructorReviews, setFilteredInstructorReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [expandedReviews, setExpandedReviews] = useState([]);
  
  const itemsPerPage = 5;

  // Mock data for courses
  useEffect(() => {
    // In a real app, this would be an API call
    const mockCourses = [
      { id: 1, title: 'Introduction to Web Development' },
      { id: 2, title: 'Advanced JavaScript' },
      { id: 3, title: 'UX/UI Design Fundamentals' },
      { id: 4, title: 'Mobile App Development' },
    ];
    setCourses(mockCourses);
    
    // Generate mock reviews
    const generateMockReviews = () => {
      // Course reviews
      const mockCourseReviews = [
        {
          id: 1,
          courseId: 1,
          courseName: 'Introduction to Web Development',
          reviewer: {
            id: 101,
            name: 'John Doe',
            avatar: null
          },
          title: 'Great introductory course!',
          content: 'This course provided an excellent foundation in web development. The instructor explained complex concepts in an easy-to-understand manner. Highly recommend for beginners who want to start their journey in web development. The practical exercises were particularly helpful.',
          rating: 5,
          date: '2025-04-22',
          response: null
        },
        {
          id: 2,
          courseId: 2,
          courseName: 'Advanced JavaScript',
          reviewer: {
            id: 102,
            name: 'Jane Smith',
            avatar: null
          },
          title: 'Very detailed and practical',
          content: 'The Advanced JavaScript course was exactly what I needed to take my skills to the next level. The instructor covered advanced topics with practical examples that I could immediately apply to my work projects.',
          rating: 4,
          date: '2025-04-18',
          response: 'Thank you for your feedback! I\'m glad you found the practical examples useful.'
        },
        {
          id: 3,
          courseId: 1,
          courseName: 'Introduction to Web Development',
          reviewer: {
            id: 103,
            name: 'Alex Johnson',
            avatar: null
          },
          title: 'Needs more practical exercises',
          content: 'The theoretical part was good, but I would have liked more hands-on exercises. Sometimes it felt too abstract without enough practice to reinforce the concepts.',
          rating: 3,
          date: '2025-04-15',
          response: null
        },
        {
          id: 4,
          courseId: 3,
          courseName: 'UX/UI Design Fundamentals',
          reviewer: {
            id: 104,
            name: 'Sarah Williams',
            avatar: null
          },
          title: 'Perfect balance of theory and practice',
          content: 'I loved how this course balanced theoretical principles with practical design challenges. The instructor provided valuable feedback on my assignments which helped me improve my design skills significantly.',
          rating: 5,
          date: '2025-04-10',
          response: null
        },
        {
          id: 5,
          courseId: 4,
          courseName: 'Mobile App Development',
          reviewer: {
            id: 105,
            name: 'Michael Brown',
            avatar: null
          },
          title: 'Content was outdated',
          content: 'While the instructor was knowledgeable, some of the content seemed outdated. Mobile development moves fast, and some of the libraries and approaches taught aren\'t the current best practices in the industry.',
          rating: 2,
          date: '2025-04-05',
          response: 'I appreciate your feedback. We are currently updating the course content to reflect the latest industry standards and best practices. The updated modules will be available soon.'
        },
        {
          id: 6,
          courseId: 2,
          courseName: 'Advanced JavaScript',
          reviewer: {
            id: 106,
            name: 'Emily Davis',
            avatar: null
          },
          title: 'Complex topics explained well',
          content: 'The instructor has a gift for explaining complex JavaScript concepts in an approachable way. The sections on closures and async programming were particularly illuminating.',
          rating: 5,
          date: '2025-04-01',
          response: null
        },
        {
          id: 7,
          courseId: 3,
          courseName: 'UX/UI Design Fundamentals',
          reviewer: {
            id: 107,
            name: 'David Wilson',
            avatar: null
          },
          title: 'Great for beginners in design',
          content: 'As someone with no prior design experience, this course gave me a solid foundation in UX/UI principles. I now feel confident in creating user-centered designs for my projects.',
          rating: 4,
          date: '2025-03-28',
          response: null
        }
      ];
      
      // Instructor reviews
      const mockInstructorReviews = [
        {
          id: 101,
          reviewer: {
            id: 101,
            name: 'John Doe',
            avatar: null
          },
          title: 'Excellent teaching style',
          content: 'The instructor has a very engaging teaching style and makes complex topics easy to understand. Always responds promptly to questions and provides additional resources when needed.',
          rating: 5,
          date: '2025-04-20',
          response: null
        },
        {
          id: 102,
          reviewer: {
            id: 104,
            name: 'Sarah Williams',
            avatar: null
          },
          title: 'Very knowledgeable but sometimes rushed',
          content: 'The instructor clearly knows the subject matter deeply, but occasionally rushed through important concepts. I appreciated their real-world examples, though sometimes I needed to rewatch parts to fully understand.',
          rating: 4,
          date: '2025-04-12',
          response: 'Thank you for the feedback, Sarah. I will work on pacing the content better in future sessions.'
        },
        {
          id: 103,
          reviewer: {
            id: 102,
            name: 'Jane Smith',
            avatar: null
          },
          title: 'Responsive and helpful',
          content: 'Whenever I had questions, the instructor was quick to respond with helpful clarifications. Their personalized feedback on my assignments helped me improve significantly throughout the course.',
          rating: 5,
          date: '2025-04-08',
          response: null
        },
        {
          id: 104,
          reviewer: {
            id: 105,
            name: 'Michael Brown',
            avatar: null
          },
          title: 'Could be more interactive',
          content: 'While the content was solid, I wish the teaching style was more interactive. Sometimes it felt like a one-way lecture rather than an engaging learning environment.',
          rating: 3,
          date: '2025-04-02',
          response: null
        },
        {
          id: 105,
          reviewer: {
            id: 107,
            name: 'David Wilson',
            avatar: null
          },
          title: 'Great at explaining difficult concepts',
          content: 'The instructor has a talent for breaking down complex topics into understandable parts. Their analogies and examples really helped the concepts stick.',
          rating: 5,
          date: '2025-03-25',
          response: 'I am glad my teaching approach worked well for you, David! Thanks for the kind feedback.'
        }
      ];
      
      setCourseReviews(mockCourseReviews);
      setInstructorReviews(mockInstructorReviews);
      
      // Initialize filtered reviews
      setFilteredCourseReviews(mockCourseReviews);
      setFilteredInstructorReviews(mockInstructorReviews);
    };
    
    generateMockReviews();
  }, []);
  
  // Handle filtering and sorting for course reviews
  useEffect(() => {
    let filtered = [...courseReviews];
    
    // Filter by course
    if (selectedCourse !== 'all') {
      const courseId = parseInt(selectedCourse);
      filtered = filtered.filter(review => review.courseId === courseId);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(review => 
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.reviewer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort reviews
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'highest') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      filtered.sort((a, b) => a.rating - b.rating);
    }
    
    setFilteredCourseReviews(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [courseReviews, selectedCourse, sortBy, searchQuery]);
  
  // Handle filtering and sorting for instructor reviews
  useEffect(() => {
    let filtered = [...instructorReviews];
    
    // Filter by rating
    if (selectedRating !== 'all') {
      const rating = parseInt(selectedRating);
      filtered = filtered.filter(review => review.rating === rating);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(review => 
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.reviewer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort reviews
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'highest') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      filtered.sort((a, b) => a.rating - b.rating);
    }
    
    setFilteredInstructorReviews(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [instructorReviews, selectedRating, sortBy, searchQuery]);
  
  // Current reviews based on active tab
  const currentReviews = activeTab === 'course' ? filteredCourseReviews : filteredInstructorReviews;
  
  // Pagination logic
  const totalPages = Math.ceil(currentReviews.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentReviews.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Toggle reply form
  const toggleReplyForm = (reviewId) => {
    if (replyingTo === reviewId) {
      setReplyingTo(null);
      setReplyText('');
    } else {
      setReplyingTo(reviewId);
      setReplyText('');
    }
  };
  
  // Submit reply
  const submitReply = (reviewId) => {
    if (!replyText.trim()) return;
    
    if (activeTab === 'course') {
      const updatedReviews = courseReviews.map(review => 
        review.id === reviewId ? { ...review, response: replyText } : review
      );
      setCourseReviews(updatedReviews);
    } else {
      const updatedReviews = instructorReviews.map(review => 
        review.id === reviewId ? { ...review, response: replyText } : review
      );
      setInstructorReviews(updatedReviews);
    }
    
    setReplyingTo(null);
    setReplyText('');
  };
  
  // Toggle expanded review
  const toggleExpandReview = (reviewId) => {
    if (expandedReviews.includes(reviewId)) {
      setExpandedReviews(expandedReviews.filter(id => id !== reviewId));
    } else {
      setExpandedReviews([...expandedReviews, reviewId]);
    }
  };
  
  // Flag a review (placeholder function)
  const flagReview = (reviewId) => {
    alert(`Review ${reviewId} has been flagged for moderation.`);
  };
  
  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className={styles.starRating}>
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            size={16} 
            className={index < rating ? styles.starFilled : styles.starEmpty} 
            fill={index < rating ? '#FFD700' : 'none'} 
          />
        ))}
      </div>
    );
  };
  
  // Calculate average rating for active tab
  const calculateAverageRating = () => {
    const reviews = activeTab === 'course' ? filteredCourseReviews : filteredInstructorReviews;
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };
  
  // Get rating counts for instructor reviews
  const getRatingCounts = () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    instructorReviews.forEach(review => {
      counts[review.rating]++;
    });
    return counts;
  };
  
  const ratingCounts = getRatingCounts();

  return (
    <TeacherLayout>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Course & Instructor Reviews</h1>
        <p>Here you can see all the reviews for your courses and feedback about you as an instructor. You can filter, sort, and respond to reviews.</p>
      </header>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'course' ? styles.activeTab : ''}`}
          onClick={() => {
            setActiveTab('course');
            setCurrentPage(1);
          }}
        >
          Course Reviews
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'instructor' ? styles.activeTab : ''}`}
          onClick={() => {
            setActiveTab('instructor');
            setCurrentPage(1);
          }}
        >
          Instructor Reviews
        </button>
      </div>
      
      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className={styles.clearButton} onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className={styles.filterControls}>
          {activeTab === 'course' ? (
            <div className={styles.filterItem}>
              <label>Course:</label>
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className={styles.filterItem}>
              <label>Rating:</label>
              <select 
                value={selectedRating} 
                onChange={(e) => setSelectedRating(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars ({ratingCounts[5]})</option>
                <option value="4">4 Stars ({ratingCounts[4]})</option>
                <option value="3">3 Stars ({ratingCounts[3]})</option>
                <option value="2">2 Stars ({ratingCounts[2]})</option>
                <option value="1">1 Star ({ratingCounts[1]})</option>
              </select>
            </div>
          )}
          
          <div className={styles.filterItem}>
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className={styles.statsBar}>
        <div className={styles.statsItem}>
          <span className={styles.statsLabel}>Total Reviews:</span>
          <span className={styles.statsValue}>{currentReviews.length}</span>
        </div>
        <div className={styles.statsItem}>
          <span className={styles.statsLabel}>Average Rating:</span>
          <span className={styles.statsValue}>
            {calculateAverageRating()} 
            <Star size={16} className={styles.starFilled} fill="#FFD700" />
          </span>
        </div>
      </div>
      
      {currentItems.length === 0 ? (
        <div className={styles.emptyState}>
          <User size={48} strokeWidth={1} />
          <p>No reviews found for the selected filters.</p>
          {searchQuery && (
            <button className={styles.clearFiltersButton} onClick={() => setSearchQuery('')}>
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className={styles.reviewsList}>
          {currentItems.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.avatarPlaceholder}>
                    {review.reviewer.name.charAt(0)}
                  </div>
                  <div>
                    <span className={styles.reviewerName}>{review.reviewer.name}</span>
                    <span className={styles.reviewDate}>
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
                <div className={styles.reviewRating}>
                  {renderStars(review.rating)}
                </div>
              </div>
              
              {activeTab === 'course' && (
                <div className={styles.courseBadge}>
                  {review.courseName}
                </div>
              )}
              
              <h3 className={styles.reviewTitle}>{review.title}</h3>
              
              <div className={styles.reviewContent}>
                {review.content.length > 150 && !expandedReviews.includes(review.id) ? (
                  <>
                    <p>{review.content.substring(0, 150)}...</p>
                    <button 
                      className={styles.expandButton}
                      onClick={() => toggleExpandReview(review.id)}
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  <>
                    <p>{review.content}</p>
                    {review.content.length > 150 && (
                      <button 
                        className={styles.expandButton}
                        onClick={() => toggleExpandReview(review.id)}
                      >
                        Show less
                      </button>
                    )}
                  </>
                )}
              </div>
              
              {review.response && (
                <div className={styles.responseContainer}>
                  <div className={styles.responseHeader}>
                    <strong>Your Response:</strong>
                    <span className={styles.responseDate}>Responded on Apr 24, 2025</span>
                  </div>
                  <p className={styles.responseText}>{review.response}</p>
                </div>
              )}
              
              <div className={styles.reviewActions}>
                <button 
                  className={`${styles.actionButton} ${styles.replyButton}`}
                  onClick={() => toggleReplyForm(review.id)}
                >
                  <MessageSquare size={16} />
                  {review.response ? 'Edit Response' : 'Reply'}
                </button>
                <button 
                  className={`${styles.actionButton} ${styles.flagButton}`}
                  onClick={() => flagReview(review.id)}
                >
                  <Flag size={16} />
                  Flag
                </button>
              </div>
              
              {replyingTo === review.id && (
                <div className={styles.replyForm}>
                  <textarea
                    placeholder="Write your response to this review..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                  />
                  <div className={styles.replyFormActions}>
                    <button 
                      className={styles.cancelButton}
                      onClick={() => toggleReplyForm(review.id)}
                    >
                      Cancel
                    </button>
                    <button 
                      className={styles.submitButton}
                      onClick={() => submitReply(review.id)}
                      disabled={!replyText.trim()}
                    >
                      Submit Response
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button 
            className={styles.pageButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
    </TeacherLayout>
  );
};

export default ReviewsPage;