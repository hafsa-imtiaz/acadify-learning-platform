import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import TeacherLayout from '../../components/teacher/sidebar';
import '../../css/teacher/instructor-analytics.css'

const InstructorAnalyticsDashboard = () => {
  // State for time period filter
  const [timePeriod, setTimePeriod] = useState('last-30-days');
  
  // State for active tab 
  const [activeTab, setActiveTab] = useState('student-feedback');
  
  // State for chart filter
  const [chartFilter, setChartFilter] = useState('weekly');

  // State for expanded views
  const [expandedSection, setExpandedSection] = useState(null);

  // Sample data - in a real app, this would come from API calls
  const engagementData = [
    { name: 'Week 1', views: 4000, completions: 2400, enrollments: 2800 },
    { name: 'Week 2', views: 3500, completions: 2100, enrollments: 2300 },
    { name: 'Week 3', views: 4500, completions: 2700, enrollments: 3100 },
    { name: 'Week 4', views: 5000, completions: 3000, enrollments: 3500 },
    { name: 'Week 5', views: 4800, completions: 2900, enrollments: 3400 },
    { name: 'Week 6', views: 5500, completions: 3300, enrollments: 3800 },
  ];

  const monthlyEngagementData = [
    { name: 'Jan', views: 15000, completions: 9400, enrollments: 12800 },
    { name: 'Feb', views: 17500, completions: 10100, enrollments: 13300 },
    { name: 'Mar', views: 16500, completions: 9700, enrollments: 13100 },
    { name: 'Apr', views: 18000, completions: 11000, enrollments: 14500 },
  ];

  const quarterlyEngagementData = [
    { name: 'Q1', views: 45000, completions: 27400, enrollments: 32800 },
    { name: 'Q2', views: 52500, completions: 31100, enrollments: 39300 },
    { name: 'Q3', views: 48500, completions: 29700, enrollments: 36100 },
    { name: 'Q4', views: 55000, completions: 33000, enrollments: 41500 },
  ];

  const getEngagementData = () => {
    switch(chartFilter) {
      case 'monthly':
        return monthlyEngagementData;
      case 'quarterly':
        return quarterlyEngagementData;
      default:
        return engagementData;
    }
  };

  const courseDistributionData = [
    { name: 'Web Development', value: 35, color: '#5D8CAE' },
    { name: 'Data Science', value: 25, color: '#9B7EDE' },
    { name: 'AI & Machine Learning', value: 20, color: '#5EB174' },
    { name: 'UI/UX Design', value: 20, color: '#81CFD1' },
  ];

  const topCourses = [
    { id: 1, name: 'Advanced JavaScript Patterns', students: 423, rating: 4.9, completion: 87 },
    { id: 2, name: 'React & Redux Masterclass', students: 389, rating: 4.8, completion: 82 },
    { id: 3, name: 'Python for Data Science', students: 356, rating: 4.7, completion: 76 },
    { id: 4, name: 'Machine Learning Fundamentals', students: 312, rating: 4.6, completion: 73 },
    { id: 5, name: 'UI Design Principles', students: 298, rating: 4.5, completion: 71 },
    { id: 6, name: 'Node.js Backend Development', students: 285, rating: 4.7, completion: 75 },
    { id: 7, name: 'Responsive Web Design', students: 267, rating: 4.4, completion: 69 },
    { id: 8, name: 'SQL Database Mastery', students: 254, rating: 4.3, completion: 68 },
  ];

  const recentReviews = [
    { id: 1, student: 'Sarah Johnson', course: 'Advanced JavaScript Patterns', rating: 5.0, date: 'Apr 24, 2025', content: 'This course completely changed how I approach JavaScript. The design patterns section was especially enlightening.' },
    { id: 2, student: 'Mike Pearson', course: 'React & Redux Masterclass', rating: 5.0, date: 'Apr 22, 2025', content: 'The Redux section was particularly helpful. I was struggling with state management in my applications but now I feel confident.' },
    { id: 3, student: 'Lisa Zhang', course: 'Python for Data Science', rating: 4.0, date: 'Apr 20, 2025', content: 'The pandas section was excellent, but I found the machine learning portion a bit rushed.' },
    { id: 4, student: 'David Wilson', course: 'Machine Learning Fundamentals', rating: 3.0, date: 'Apr 18, 2025', content: 'Good content but the pacing was too fast for beginners. More examples would help.' },
    { id: 5, student: 'Emma Davis', course: 'UI Design Principles', rating: 4.5, date: 'Apr 16, 2025', content: 'The design exercises were practical and helped me build my portfolio while learning.' },
    { id: 6, student: 'Carlos Mendez', course: 'Node.js Backend Development', rating: 4.5, date: 'Apr 14, 2025', content: 'Great explanations of async concepts, which are usually confusing.' },
    { id: 7, student: 'Priya Sharma', course: 'Responsive Web Design', rating: 4.0, date: 'Apr 12, 2025', content: 'The media query section was helpful, but I wish there were more real-world projects.' },
    { id: 8, student: 'Jason Lee', course: 'SQL Database Mastery', rating: 4.0, date: 'Apr 10, 2025', content: 'Good course for beginners. The advanced SQL section could be more in-depth.' },
  ];

  const studentFeedback = recentReviews.slice(0, 3).map(review => ({
    id: review.id,
    avatar: review.student.split(' ').map(name => name[0]).join(''),
    name: review.student,
    date: review.date,
    rating: review.rating,
    content: review.content,
    course: review.course
  }));

  // Content Performance Data for tab
  const contentPerformanceData = [
    { 
      module: 'JavaScript Fundamentals', 
      completion: 94, 
      avgTimeSpent: '2h 15m',
      quizScore: 87,
      engagement: 'High'
    },
    { 
      module: 'Advanced Functions', 
      completion: 82, 
      avgTimeSpent: '3h 05m',
      quizScore: 78,
      engagement: 'Medium'
    },
    { 
      module: 'Design Patterns', 
      completion: 76, 
      avgTimeSpent: '4h 30m',
      quizScore: 72,
      engagement: 'High'
    },
    { 
      module: 'Async Programming', 
      completion: 68, 
      avgTimeSpent: '3h 45m',
      quizScore: 65,
      engagement: 'Medium'
    },
  ];

  // Learning Patterns Data for tab
  const learningPatternsData = [
    { time: 'Morning (6AM-12PM)', percentage: 35 },
    { time: 'Afternoon (12PM-6PM)', percentage: 25 },
    { time: 'Evening (6PM-12AM)', percentage: 30 },
    { time: 'Night (12AM-6AM)', percentage: 10 },
  ];

  const deviceUsageData = [
    { device: 'Desktop', percentage: 65 },
    { device: 'Mobile', percentage: 25 },
    { device: 'Tablet', percentage: 10 },
  ];

  // Render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="stars-container">
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Get badge class based on completion percentage
  const getBadgeClass = (completion) => {
    if (completion >= 80) return 'badge-success';
    if (completion >= 60) return 'badge-warning';
    return 'badge-danger';
  };

  // Handle View All button clicks
  const handleViewAll = (section) => {
    setExpandedSection(section === expandedSection ? null : section);
  };

  // Render the appropriate content based on the active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'student-feedback':
        return (
          <div className="feedback-container">
            {studentFeedback.map(feedback => (
              <div className="feedback-card" key={feedback.id}>
                <div className="feedback-header">
                  <div className="feedback-user">
                    <div className="feedback-avatar">{feedback.avatar}</div>
                    <div className="feedback-info">
                      <h4>{feedback.name}</h4>
                      <p>{feedback.date}</p>
                    </div>
                  </div>
                  <div className="rating-display">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
                <div className="feedback-content">
                  "{feedback.content}"
                </div>
                <div className="feedback-course">
                  📚 {feedback.course}
                </div>
              </div>
            ))}
          </div>
        );
      case 'content-performance':
        return (
          <div className="content-performance-container">
            <table className="content-performance-table">
              <thead>
                <tr>
                  <th>Module Name</th>
                  <th>Completion Rate</th>
                  <th>Avg Time Spent</th>
                  <th>Quiz Score</th>
                  <th>Engagement</th>
                </tr>
              </thead>
              <tbody>
                {contentPerformanceData.map((module, index) => (
                  <tr key={index}>
                    <td>{module.module}</td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className="progress" 
                          style={{width: `${module.completion}%`}}
                        ></div>
                        <span>{module.completion}%</span>
                      </div>
                    </td>
                    <td>{module.avgTimeSpent}</td>
                    <td>{module.quizScore}%</td>
                    <td>
                      <span className={`engagement-badge ${module.engagement.toLowerCase()}`}>
                        {module.engagement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'learning-patterns':
        return (
          <div className="learning-patterns-container">
            <div className="learning-charts">
              <div className="pattern-chart">
                <h3>Learning Time Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={learningPatternsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#9B7EDE" name="Percentage of Students" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="pattern-chart">
                <h3>Device Usage</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceUsageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="percentage"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell key="cell-0" fill="#5D8CAE" />
                      <Cell key="cell-1" fill="#5EB174" />
                      <Cell key="cell-2" fill="#81CFD1" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="learning-insights">
              <div className="insight-card">
                <h4>Key Insights</h4>
                <ul>
                  <li>Most students prefer learning in the morning (35%)</li>
                  <li>Desktop remains the primary learning device (65%)</li>
                  <li>Weekends show 40% higher engagement than weekdays</li>
                  <li>Video content has 28% higher completion than text-based content</li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <TeacherLayout>
    <div className="container">
      {/* Header with profile and date filter */}
      <header>
        <div className="profile">
          <div className="avatar">JD</div>
          <div className="user-info">
            <h2>John Doe</h2>
            <p>Senior Instructor</p>
          </div>
        </div>
        <div className="date-filter">
          <label htmlFor="date-range">Time Period:</label>
          <select 
            id="date-range" 
            value={timePeriod} 
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </header>

      {/* Dashboard summary cards */}
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>TOTAL STUDENTS</h3>
          <p>2,543</p>
          <div className="trend up">
            ↑ 12% from last period
          </div>
        </div>
        <div className="summary-card">
          <h3>COURSE COMPLETION RATE</h3>
          <p>68.5%</p>
          <div className="trend up">
            ↑ 4.2% from last period
          </div>
        </div>
        <div className="summary-card">
          <h3>AVERAGE RATING</h3>
          <p>4.8 / 5</p>
          <div className="trend up">
            ↑ 0.3 from last period
          </div>
        </div>
        <div className="summary-card">
          <h3>REVENUE</h3>
          <p>$12,680</p>
          <div className="trend down">
            ↓ 3.1% from last period
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="charts-container">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Student Engagement</div>
            <div className="chart-filters">
              <div 
                className={`chart-filter ${chartFilter === 'weekly' ? 'active' : ''}`}
                onClick={() => setChartFilter('weekly')}
              >
                Weekly
              </div>
              <div 
                className={`chart-filter ${chartFilter === 'monthly' ? 'active' : ''}`}
                onClick={() => setChartFilter('monthly')}
              >
                Monthly
              </div>
              <div 
                className={`chart-filter ${chartFilter === 'quarterly' ? 'active' : ''}`}
                onClick={() => setChartFilter('quarterly')}
              >
                Quarterly
              </div>
            </div>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getEngagementData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#5D8CAE" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="completions" stroke="#5EB174" />
                <Line type="monotone" dataKey="enrollments" stroke="#9B7EDE" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Course Distribution</div>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {courseDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data tables */}
      <div className="data-tables">
        <div className="table-card">
          <div className="table-header">
            <div className="table-title">Top Performing Courses</div>
            <button 
              onClick={() => handleViewAll('topCourses')} 
              className="view-all"
            >
              {expandedSection === 'topCourses' ? 'Show Less' : 'View All'}
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Students</th>
                <th>Rating</th>
                <th>Completion</th>
              </tr>
            </thead>
            <tbody>
              {(expandedSection === 'topCourses' ? topCourses : topCourses.slice(0, 4)).map(course => (
                <tr key={course.id}>
                  <td className="course-name">{course.name}</td>
                  <td>{course.students}</td>
                  <td className="rating-cell">
                    {renderStars(course.rating)}
                  </td>
                  <td>
                    <span className={`badge ${getBadgeClass(course.completion)}`}>
                      {course.completion}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-card">
          <div className="table-header">
            <div className="table-title">Recent Reviews</div>
            <button 
              onClick={() => handleViewAll('reviews')} 
              className="view-all"
            >
              {expandedSection === 'reviews' ? 'Show Less' : 'View All'}
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Rating</th>
                <th>Date</th>
                {expandedSection === 'reviews' && <th>Comment</th>}
              </tr>
            </thead>
            <tbody>
              {(expandedSection === 'reviews' ? recentReviews : recentReviews.slice(0, 4)).map(review => (
                <tr key={review.id}>
                  <td>{review.student}</td>
                  <td>{review.course}</td>
                  <td className="rating-cell">
                    {renderStars(review.rating)}
                  </td>
                  <td>{review.date}</td>
                  {expandedSection === 'reviews' && <td className="review-content">{review.content}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student feedback section with functional tabs */}
      <div className="tab-container">
        <div className="tab-header">
          <h2>Analytics Deep Dive</h2>
        </div>
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'student-feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('student-feedback')}
          >
            Student Feedback
          </div>
          <div 
            className={`tab ${activeTab === 'content-performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('content-performance')}
          >
            Content Performance
          </div>
          <div 
            className={`tab ${activeTab === 'learning-patterns' ? 'active' : ''}`}
            onClick={() => setActiveTab('learning-patterns')}
          >
            Learning Patterns
          </div>
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
    </TeacherLayout>
  );
};

export default InstructorAnalyticsDashboard;