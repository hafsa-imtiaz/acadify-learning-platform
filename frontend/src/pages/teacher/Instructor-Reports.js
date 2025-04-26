import React, { useState } from 'react';
import { 
  Users, Calendar, Download, TrendingUp, TrendingDown, 
  BarChart2, LineChart, Star, Clock, Award, BookOpen, Edit
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import TeacherLayout from '../../components/teacher/sidebar';
import '../../css/teacher/instructor-reports.css'; // Make sure to create this CSS file

const InstructorReports = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [dateRange, setDateRange] = useState('30'); // '30', '60', '90'

  // Enrollment trend data
  const enrollmentData = [
    { date: 'Mar 27', enrollments: 12 },
    { date: 'Mar 28', enrollments: 19 },
    { date: 'Mar 29', enrollments: 14 },
    { date: 'Apr 1', enrollments: 25 },
    { date: 'Apr 2', enrollments: 23 },
    { date: 'Apr 3', enrollments: 18 },
    { date: 'Apr 4', enrollments: 15 },
    { date: 'Apr 5', enrollments: 22 },
    { date: 'Apr 6', enrollments: 28 },
    { date: 'Apr 7', enrollments: 35 },
    { date: 'Apr 8', enrollments: 30 },
    { date: 'Apr 9', enrollments: 27 },
    { date: 'Apr 10', enrollments: 32 },
    { date: 'Apr 11', enrollments: 24 },
    { date: 'Apr 12', enrollments: 21 },
    { date: 'Apr 13', enrollments: 19 },
    { date: 'Apr 14', enrollments: 23 },
    { date: 'Apr 15', enrollments: 25 },
    { date: 'Apr 16', enrollments: 27 },
    { date: 'Apr 17', enrollments: 30 },
    { date: 'Apr 18', enrollments: 38 },
    { date: 'Apr 19', enrollments: 42 },
    { date: 'Apr 20', enrollments: 45 },
    { date: 'Apr 21', enrollments: 40 },
    { date: 'Apr 22', enrollments: 38 },
    { date: 'Apr 23', enrollments: 35 },
    { date: 'Apr 24', enrollments: 32 },
    { date: 'Apr 25', enrollments: 36 },
    { date: 'Apr 26', enrollments: 42 }
  ];

  // Course engagement data
  const engagementData = [
    { name: 'Web Dev', completion: 72, engagement: 85, participation: 78 },
    { name: 'Data Science', completion: 68, engagement: 75, participation: 82 },
    { name: 'UI/UX', completion: 65, engagement: 80, participation: 70 }
  ];

  // Rating distribution data
  const ratingData = [
    { name: '5 Stars', value: 275, color: '#4CAF50' },
    { name: '4 Stars', value: 125, color: '#8BC34A' },
    { name: '3 Stars', value: 60, color: '#FFEB3B' },
    { name: '2 Stars', value: 25, color: '#FF9800' },
    { name: '1 Star', value: 15, color: '#F44336' }
  ];

  // Live session analytics data
  const liveSessionData = [
    { session: 'Mar 15', attendance: 82, engagement: 75, questions: 22 },
    { session: 'Mar 22', attendance: 78, engagement: 73, questions: 18 },
    { session: 'Mar 29', attendance: 84, engagement: 80, questions: 25 },
    { session: 'Apr 5', attendance: 90, engagement: 85, questions: 30 },
    { session: 'Apr 12', attendance: 87, engagement: 82, questions: 27 },
    { session: 'Apr 19', attendance: 85, engagement: 79, questions: 24 }
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleCourseFilterChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleDateRangeChange = (days) => {
    setDateRange(days);
  };

  return (
    <TeacherLayout>
      <div className="container-tearep">
        <header className="header-tearep">
          <h1 className="page-title-tearep">Reports Dashboard</h1>
          <div className="filter-controls-tearep">
            <select 
              className="filter-dropdown-tearep"
              value={selectedCourse}
              onChange={handleCourseFilterChange}
            >
              <option value="all">All Courses</option>
              <option value="web-dev">Web Development Masterclass</option>
              <option value="data-science">Data Science Fundamentals</option>
              <option value="ui-design">UI/UX Design Principles</option>
            </select>
            
            <div className="date-range-buttons-tearep">
              <button 
                className={`date-button-tearep ${dateRange === '30' ? 'active-tearep' : ''}`}
                onClick={() => handleDateRangeChange('30')}
              >
                30 Days
              </button>
              <button 
                className={`date-button-tearep ${dateRange === '60' ? 'active-tearep' : ''}`}
                onClick={() => handleDateRangeChange('60')}
              >
                60 Days
              </button>
              <button 
                className={`date-button-tearep ${dateRange === '90' ? 'active-tearep' : ''}`}
                onClick={() => handleDateRangeChange('90')}
              >
                90 Days
              </button>
            </div>
            
            <button className="export-button-tearep">
              <Download className="button-icon-tearep" size={18} />
              Export Report
            </button>
          </div>
        </header>

        <div className="tab-navigation-tearep">
          {['Overview', 'Course Performance', 'Student Engagement', 'Revenue', 'Live Sessions'].map((tab) => (
            <div 
              key={tab}
              className={`tab-item-tearep ${activeTab === tab ? 'active-tab-tearep' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="stat-cards-grid-tearep">
          <div className="stat-card-tearep">
            <div className="stat-header-tearep">
              <h3 className="stat-title-tearep">Total Students</h3>
              <Users className="stat-icon-tearep" size={20} />
            </div>
            <div className="stat-value-tearep">2,548</div>
            <div className="stat-trend-tearep positive-tearep">
              <TrendingUp size={16} className="trend-icon-tearep" />
              <span>12% from previous period</span>
            </div>
          </div>
          
          <div className="stat-card-tearep">
            <div className="stat-header-tearep">
              <h3 className="stat-title-tearep">Course Completion Rate</h3>
              <Award className="stat-icon-tearep" size={20} />
            </div>
            <div className="stat-value-tearep">68.5%</div>
            <div className="stat-trend-tearep positive-tearep">
              <TrendingUp size={16} className="trend-icon-tearep" />
              <span>4.2% from previous period</span>
            </div>
          </div>
          
          <div className="stat-card-tearep">
            <div className="stat-header-tearep">
              <h3 className="stat-title-tearep">Average Rating</h3>
              <Star className="stat-icon-tearep" size={20} />
            </div>
            <div className="stat-value-tearep">4.8/5.0</div>
            <div className="stat-trend-tearep positive-tearep">
              <TrendingUp size={16} className="trend-icon-tearep" />
              <span>0.3 from previous period</span>
            </div>
          </div>
          
          <div className="stat-card-tearep">
            <div className="stat-header-tearep">
              <h3 className="stat-title-tearep">New Enrollments</h3>
              <Users className="stat-icon-tearep" size={20} />
            </div>
            <div className="stat-value-tearep">342</div>
            <div className="stat-trend-tearep positive-tearep">
              <TrendingUp size={16} className="trend-icon-tearep" />
              <span>8% from previous period</span>
            </div>
          </div>
          
          <div className="stat-card-tearep">
            <div className="stat-header-tearep">
              <h3 className="stat-title-tearep">Total Revenue</h3>
              <BarChart2 className="stat-icon-tearep" size={20} />
            </div>
            <div className="stat-value-tearep">$15,840</div>
            <div className="stat-trend-tearep positive-tearep">
              <TrendingUp size={16} className="trend-icon-tearep" />
              <span>15% from previous period</span>
            </div>
          </div>
          
          <div className="stat-card-tearep">
            <div className="stat-header-tearep">
              <h3 className="stat-title-tearep">Live Session Attendance</h3>
              <Users className="stat-icon-tearep" size={20} />
            </div>
            <div className="stat-value-tearep">78%</div>
            <div className="stat-trend-tearep negative-tearep">
              <TrendingDown size={16} className="trend-icon-tearep" />
              <span>2% from previous period</span>
            </div>
          </div>
        </div>

        <div className="chart-row-tearep">
          <div className="chart-card-tearep">
            <h2 className="chart-title-tearep">Student Enrollment Trends</h2>
            <div className="chart-container-tearep">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={enrollmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" interval={6} />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="enrollments" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="chart-card-tearep">
            <h2 className="chart-title-tearep">Course Engagement Metrics</h2>
            <div className="chart-container-tearep">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completion" name="Completion Rate" fill="#3b82f6" />
                  <Bar dataKey="engagement" name="Content Engagement" fill="#10b981" />
                  <Bar dataKey="participation" name="Participation" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="insight-row-tearep">
          <div className="reviews-card-tearep">
            <div className="insight-header-tearep">
              <h2 className="insight-title-tearep">Student Reviews</h2>
              <span className="rating-badge-tearep">
                <Star size={14} className="badge-icon-tearep" />
                4.8 Average
              </span>
            </div>
            
            <div className="rating-chart-tearep">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="review-list-tearep">
              <div className="review-item-tearep">
                <div className="review-header-tearep">
                  <div className="star-rating-tearep">
                    <Star size={16} className="star-icon-tearep" />
                    <Star size={16} className="star-icon-tearep" />
                    <Star size={16} className="star-icon-tearep" />
                    <Star size={16} className="star-icon-tearep" />
                    <Star size={16} className="star-icon-tearep" />
                  </div>
                  <div className="review-date-tearep">Apr 20, 2025</div>
                </div>
                <div className="reviewer-name-tearep">Sarah Johnson</div>
                <div className="course-name-tearep">Web Development Masterclass</div>
                <div className="review-content-tearep">
                  The content was incredibly well-structured and the projects were really engaging. I feel much more confident in my web development skills now.
                </div>
              </div>
              
              <div className="review-item-tearep">
                <div className="review-header-tearep">
                  <div className="star-rating-tearep">
                    <Star size={16} className="star-icon-tearep" />
                    <Star size={16} className="star-icon-tearep" />
                    <Star size={16} className="star-icon-tearep" />
                    <Star size={16} className="star-icon-tearep" />
                    <Star size={16} className="star-icon-tearep" />
                  </div>
                  <div className="review-date-tearep">Apr 18, 2025</div>
                </div>
                <div className="reviewer-name-tearep">Michael Chen</div>
                <div className="course-name-tearep">Data Science Fundamentals</div>
                <div className="review-content-tearep">
                  The live sessions were particularly helpful. Being able to ask questions in real-time helped me overcome challenges quickly.
                </div>
              </div>
            </div>
          </div>
          
          <div className="performance-card-tearep">
            <div className="insight-header-tearep">
              <h2 className="insight-title-tearep">Instructor Performance</h2>
              <span className="success-badge-tearep">Excellent</span>
            </div>
            
            <div className="score-circle-tearep">
              <svg className="circle-chart-tearep" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="96, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="score-label-tearep">
                <div className="score-value-tearep">96</div>
                <div className="score-text-tearep">Overall Score</div>
              </div>
            </div>
            
            <div className="metrics-grid-tearep">
              <div className="metric-item-tearep blue-tearep">
                <div className="metric-value-tearep">98%</div>
                <div className="metric-label-tearep">Content Quality</div>
              </div>
              <div className="metric-item-tearep green-tearep">
                <div className="metric-value-tearep">95%</div>
                <div className="metric-label-tearep">Student Satisfaction</div>
              </div>
              <div className="metric-item-tearep yellow-tearep">
                <div className="metric-value-tearep">92%</div>
                <div className="metric-label-tearep">Engagement</div>
              </div>
              <div className="metric-item-tearep indigo-tearep">
                <div className="metric-value-tearep">24hrs</div>
                <div className="metric-label-tearep">Avg. Response Time</div>
              </div>
              <div className="metric-item-tearep purple-tearep">
                <div className="metric-value-tearep">97%</div>
                <div className="metric-label-tearep">Support Quality</div>
              </div>
              <div className="metric-item-tearep pink-tearep">
                <div className="metric-value-tearep">89%</div>
                <div className="metric-label-tearep">Live Session Effectiveness</div>
              </div>
            </div>
          </div>
        </div>

        <div className="course-performance-tearep">
          <h2 className="section-title-tearep">Course Performance</h2>
          <div className="course-list-tearep">
            <div className="course-item-tearep">
              <div className="course-main-tearep">
                <div className="course-title-tearep">Web Development Masterclass</div>
                <div className="course-meta-tearep">
                  <span className="meta-item-tearep">
                    <Users size={16} className="meta-icon-tearep" />
                    1,245 Students
                  </span>
                  <span className="meta-item-tearep">
                    <Calendar size={16} className="meta-icon-tearep" />
                    Last updated Apr 10, 2025
                  </span>
                </div>
              </div>
              <div className="course-stats-tearep">
                <div className="course-stat-tearep">
                  <div className="stat-number-tearep blue-text-tearep">4.9</div>
                  <div className="stat-label-tearep">Rating</div>
                </div>
                <div className="course-stat-tearep">
                  <div className="stat-number-tearep green-text-tearep">72%</div>
                  <div className="stat-label-tearep">Completion</div>
                </div>
                <div className="course-stat-tearep">
                  <div className="stat-number-tearep purple-text-tearep">$8,950</div>
                  <div className="stat-label-tearep">Revenue</div>
                </div>
              </div>
            </div>
            
            <div className="course-item-tearep">
              <div className="course-main-tearep">
                <div className="course-title-tearep">Data Science Fundamentals</div>
                <div className="course-meta-tearep">
                  <span className="meta-item-tearep">
                    <Users size={16} className="meta-icon-tearep" />
                    842 Students
                  </span>
                  <span className="meta-item-tearep">
                    <Calendar size={16} className="meta-icon-tearep" />
                    Last updated Apr 15, 2025
                  </span>
                </div>
              </div>
              <div className="course-stats-tearep">
                <div className="course-stat-tearep">
                  <div className="stat-number-tearep blue-text-tearep">4.7</div>
                  <div className="stat-label-tearep">Rating</div>
                </div>
                <div className="course-stat-tearep">
                  <div className="stat-number-tearep green-text-tearep">68%</div>
                  <div className="stat-label-tearep">Completion</div>
                </div>
                <div className="course-stat-tearep">
                  <div className="stat-number-tearep purple-text-tearep">$4,210</div>
                  <div className="stat-label-tearep">Revenue</div>
                </div>
              </div>
            </div>
            
            <div className="course-item-tearep">
              <div className="course-main-tearep">
                <div className="course-title-tearep">UI/UX Design Principles</div>
                <div className="course-meta-tearep">
                  <span className="meta-item-tearep">
                    <Users size={16} className="meta-icon-tearep" />
                    461 Students
                  </span>
                  <span className="meta-item-tearep">
                    <Calendar size={16} className="meta-icon-tearep" />
                    Last updated Apr 5, 2025
                  </span>
                </div>
              </div>
              <div className="course-stats-tearep">
                <div className="course-stat-tearep">
                  <div className="stat-number-tearep blue-text-tearep">4.8</div>
                  <div className="stat-label-tearep">Rating</div>
                </div>
                <div className="course-stat-tearep">
                  <div className="stat-number-tearep green-text-tearep">65%</div>
                  <div className="stat-label-tearep">Completion</div>
                </div>
                <div className="course-stat-tearep">
                  <div className="stat-number-tearep purple-text-tearep">$2,680</div>
                  <div className="stat-label-tearep">Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="session-row-tearep">
          <div className="sessions-card-tearep">
            <h2 className="section-title-tearep">Upcoming Live Sessions</h2>
            <div className="session-list-tearep">
              <div className="session-item-tearep">
                <div className="session-date-block-tearep blue-bg-tearep">
                  <div className="date-day-tearep">30</div>
                  <div className="date-month-tearep">Apr</div>
                </div>
                <div className="session-details-tearep">
                  <div className="session-title-tearep">Advanced JavaScript Concepts</div>
                  <div className="session-meta-tearep">
                    <span className="session-meta-item-tearep">
                      <Clock size={16} className="meta-icon-tearep" />
                      2:00 PM - 4:00 PM
                    </span>
                    <span className="session-meta-item-tearep">
                      <Users size={16} className="meta-icon-tearep" />
                      128 Registered
                    </span>
                    <span className="session-meta-item-tearep">
                      <BookOpen size={16} className="meta-icon-tearep" />
                      Web Development Masterclass
                    </span>
                  </div>
                  <div className="session-actions-tearep">
                    <a href="#" className="action-link-tearep">
                      <Edit size={14} className="action-icon-tearep" />
                      Manage Session
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="session-item-tearep">
                <div className="session-date-block-tearep green-bg-tearep">
                  <div className="date-day-tearep">3</div>
                  <div className="date-month-tearep">May</div>
                </div>
                <div className="session-details-tearep">
                  <div className="session-title-tearep">Machine Learning Workshop</div>
                  <div className="session-meta-tearep">
                    <span className="session-meta-item-tearep">
                      <Clock size={16} className="meta-icon-tearep" />
                      10:00 AM - 12:30 PM
                    </span>
                    <span className="session-meta-item-tearep">
                      <Users size={16} className="meta-icon-tearep" />
                      95 Registered
                    </span>
                    <span className="session-meta-item-tearep">
                      <BookOpen size={16} className="meta-icon-tearep" />
                      Data Science Fundamentals
                    </span>
                  </div>
                  <div className="session-actions-tearep">
                    <a href="#" className="action-link-tearep">
                      <Edit size={14} className="action-icon-tearep" />
                      Manage Session
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="session-item-tearep">
                <div className="session-date-block-tearep purple-bg-tearep">
                  <div className="date-day-tearep">7</div>
                  <div className="date-month-tearep">May</div>
                </div>
                <div className="session-details-tearep">
                  <div className="session-title-tearep">Design Systems Implementation</div>
                  <div className="session-meta-tearep">
                    <span className="session-meta-item-tearep">
                      <Clock size={16} className="meta-icon-tearep" />
                      1:00 PM - 3:00 PM
                    </span>
                    <span className="session-meta-item-tearep">
                      <Users size={16} className="meta-icon-tearep" />
                      72 Registered
                    </span>
                    <span className="session-meta-item-tearep">
                      <BookOpen size={16} className="meta-icon-tearep" />
                      UI/UX Design Principles
                    </span>
                  </div>
                  <div className="session-actions-tearep">
                    <a href="#" className="action-link-tearep">
                      <Edit size={14} className="action-icon-tearep" />
                      Manage Session
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="chart-card-tearep">
            <h2 className="chart-title-tearep">Live Session Analytics</h2>
            <div className="chart-container-tearep">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={liveSessionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="session" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" name="Attendance Rate %" fill="#3b82f6" />
                  <Bar dataKey="engagement" name="Engagement Level %" fill="#10b981" />
                  <Bar dataKey="questions" name="Questions Asked" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default InstructorReports;