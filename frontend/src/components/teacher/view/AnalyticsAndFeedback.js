import React, { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "../../../css/teacher/view/course-analytics.css";

const AnalyticsAndFeedback = () => {
  const enrollmentData = [
    { month: "Jan", count: 120 },
    { month: "Feb", count: 150 },
    { month: "Mar", count: 200 },
    { month: "Apr", count: 180 },
    { month: "May", count: 220 },
    { month: "Jun", count: 250 },
  ];

  const completionRateData = [
    { month: "Jan", rate: 68 },
    { month: "Feb", rate: 72 },
    { month: "Mar", rate: 75 },
    { month: "Apr", rate: 78 },
    { month: "May", rate: 80 },
    { month: "Jun", rate: 82 },
  ];

  const engagementData = [
    { name: "Videos Watched", value: 85 },
    { name: "Assignments Completed", value: 72 },
    { name: "Forum Participation", value: 43 },
    { name: "Quizzes Taken", value: 78 },
  ];

  const moduleCompletionData = [
    { name: "Module 1", completion: 95 },
    { name: "Module 2", completion: 88 },
    { name: "Module 3", completion: 76 },
    { name: "Module 4", completion: 65 },
    { name: "Module 5", completion: 58 },
  ];

  const recentFeedback = [
    { id: 1, rating: 5, comment: "Excellent course! The practical examples were very helpful.", date: "Apr 24, 2025" },
    { id: 2, rating: 4, comment: "Good content but would like more interactive elements.", date: "Apr 22, 2025" },
    { id: 3, rating: 5, comment: "The instructor explains complex concepts very clearly.", date: "Apr 20, 2025" },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState("6m");

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? "star-filled" : "star-empty"}`}>★</span>
      );
    }
    return stars;
  };

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div className="header-content">
          <div>
            <h1 className="header-title">Course Analytics Dashboard</h1>
            <p className="header-subtitle">Introduction to Machine Learning</p>
          </div>
          <div className="header-actions">
            <div className="filter-container">
              <span className="filter-icon">⚙️</span>
              <select 
                className="time-filter" 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <button className="export-button">
              <span className="button-icon">📊</span> Export Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-navigation">
          <button
            onClick={() => setActiveTab("overview")}
            className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("engagement")}
            className={`tab-button ${activeTab === "engagement" ? "active" : ""}`}
          >
            Student Engagement
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`tab-button ${activeTab === "content" ? "active" : ""}`}
          >
            Content Performance
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`tab-button ${activeTab === "feedback" ? "active" : ""}`}
          >
            Student Feedback
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <p className="stat-label">Total Enrollments</p>
                    <p className="stat-value">2,458</p>
                    <p className="stat-trend positive">
                      <span className="trend-icon">↑</span> +12% from last month
                    </p>
                  </div>
                  <div className="stat-icon users">👥</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <p className="stat-label">Completion Rate</p>
                    <p className="stat-value">76%</p>
                    <p className="stat-trend positive">
                      <span className="trend-icon">↑</span> +3% from last month
                    </p>
                  </div>
                  <div className="stat-icon award">🏆</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <p className="stat-label">Average Rating</p>
                    <p className="stat-value">4.7/5</p>
                    <div className="star-rating">★★★★★</div>
                  </div>
                  <div className="stat-icon thumbs-up">👍</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <p className="stat-label">Active Discussions</p>
                    <p className="stat-value">156</p>
                    <p className="stat-trend positive">
                      <span className="trend-icon">↑</span> +8% from last month
                    </p>
                  </div>
                  <div className="stat-icon message">💬</div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="charts-grid">
              <div className="chart-card">
                <h3 className="chart-title">Enrollment Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Completion Rate Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={completionRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Module Completion */}
            <div className="chart-card fullwidth">
              <h3 className="chart-title">Module Completion Rates</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moduleCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completion" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent feedback */}
            <div className="chart-card fullwidth">
              <div className="card-header">
                <h3 className="chart-title">Recent Student Feedback</h3>
                <button className="view-all-button">View All</button>
              </div>
              <div className="feedback-list">
                {recentFeedback.map((item) => (
                  <div key={item.id} className="feedback-item">
                    <div className="feedback-header">
                      <div className="feedback-stars">{renderStars(item.rating)}</div>
                      <span className="feedback-date">{item.date}</span>
                    </div>
                    <p className="feedback-comment">{item.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "engagement" && (
          <>
            <div className="charts-grid">
              <div className="chart-card">
                <h3 className="chart-title">Engagement Metrics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Student Activity by Week</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { week: "Week 1", videos: 92, quizzes: 85, assignments: 78, discussions: 45 },
                      { week: "Week 2", videos: 85, quizzes: 82, assignments: 75, discussions: 40 },
                      { week: "Week 3", videos: 78, quizzes: 74, assignments: 70, discussions: 38 },
                      { week: "Week 4", videos: 72, quizzes: 70, assignments: 63, discussions: 35 },
                      { week: "Week 5", videos: 68, quizzes: 64, assignments: 60, discussions: 32 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="videos" fill="#3B82F6" />
                    <Bar dataKey="quizzes" fill="#10B981" />
                    <Bar dataKey="assignments" fill="#F59E0B" />
                    <Bar dataKey="discussions" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card fullwidth">
              <h3 className="chart-title">Student Retention Heatmap</h3>
              <div className="heatmap-placeholder">
                <p>Heatmap visualization showing student retention at different course points</p>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <h3 className="chart-title">Time Spent per Module</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Module 1", hours: 1.8 },
                      { name: "Module 2", hours: 2.3 },
                      { name: "Module 3", hours: 3.1 },
                      { name: "Module 4", hours: 2.7 },
                      { name: "Module 5", hours: 2.2 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Device Usage</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Desktop", value: 58 },
                        { name: "Mobile", value: 32 },
                        { name: "Tablet", value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#3B82F6" />
                      <Cell fill="#10B981" />
                      <Cell fill="#F59E0B" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeTab === "content" && (
          <>
            <div className="charts-grid">
              <div className="chart-card">
                <h3 className="chart-title">Video Engagement</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Video 1", watched: 95, completed: 88 },
                      { name: "Video 2", watched: 92, completed: 85 },
                      { name: "Video 3", watched: 88, completed: 78 },
                      { name: "Video 4", watched: 82, completed: 73 },
                      { name: "Video 5", watched: 76, completed: 65 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="watched" fill="#3B82F6" />
                    <Bar dataKey="completed" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Quiz Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Quiz 1", avgScore: 87, attempts: 96 },
                      { name: "Quiz 2", avgScore: 82, attempts: 94 },
                      { name: "Quiz 3", avgScore: 78, attempts: 90 },
                      { name: "Quiz 4", avgScore: 75, attempts: 85 },
                      { name: "Quiz 5", avgScore: 72, attempts: 80 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="avgScore" fill="#3B82F6" />
                    <Bar yAxisId="right" dataKey="attempts" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card fullwidth">
              <h3 className="chart-title">Content Difficulty Analysis</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Content Item</th>
                      <th>Type</th>
                      <th>Avg. Completion Time</th>
                      <th>Success Rate</th>
                      <th>Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Introduction to Neural Networks</td>
                      <td>Video + Quiz</td>
                      <td>18 minutes</td>
                      <td>92%</td>
                      <td><span className="difficulty-badge easy">Easy</span></td>
                    </tr>
                    <tr>
                      <td>Convolutional Networks</td>
                      <td>Video + Quiz</td>
                      <td>25 minutes</td>
                      <td>85%</td>
                      <td><span className="difficulty-badge medium">Medium</span></td>
                    </tr>
                    <tr>
                      <td>Backpropagation</td>
                      <td>Video + Assignment</td>
                      <td>42 minutes</td>
                      <td>68%</td>
                      <td><span className="difficulty-badge hard">Hard</span></td>
                    </tr>
                    <tr>
                      <td>Regularization Techniques</td>
                      <td>Video + Quiz</td>
                      <td>32 minutes</td>
                      <td>75%</td>
                      <td><span className="difficulty-badge medium">Medium</span></td>
                    </tr>
                    <tr>
                      <td>Final Project</td>
                      <td>Assignment</td>
                      <td>120 minutes</td>
                      <td>62%</td>
                      <td><span className="difficulty-badge hard">Hard</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="chart-card fullwidth">
              <h3 className="chart-title">Most Skipped Content</h3>
              <div className="skipped-content-list">
                <div className="skipped-content-item">
                  <div className="content-info">
                    <p className="content-name">Advanced Optimization Methods</p>
                    <p className="content-details">Video, 18:24 minutes</p>
                  </div>
                  <div className="content-stats">
                    <div className="progress-bar">
                      <div className="progress-fill red" style={{ width: "42%" }}></div>
                    </div>
                    <p className="skip-rate">42% skip rate</p>
                  </div>
                </div>

                <div className="skipped-content-item">
                  <div className="content-info">
                    <p className="content-name">Matrix Calculus</p>
                    <p className="content-details">Video, 22:12 minutes</p>
                  </div>
                  <div className="content-stats">
                    <div className="progress-bar">
                      <div className="progress-fill red" style={{ width: "38%" }}></div>
                    </div>
                    <p className="skip-rate">38% skip rate</p>
                  </div>
                </div>

                <div className="skipped-content-item">
                  <div className="content-info">
                    <p className="content-name">RNN Architectures</p>
                    <p className="content-details">Video, 15:38 minutes</p>
                  </div>
                  <div className="content-stats">
                    <div className="progress-bar">
                      <div className="progress-fill red" style={{ width: "29%" }}></div>
                    </div>
                    <p className="skip-rate">29% skip rate</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "feedback" && (
          <>
            <div className="stats-grid third">
              <div className="chart-card">
                <div className="card-header">
                  <h3 className="chart-title">Overall Rating</h3>
                  <div className="star-rating gold">★★★★★</div>
                </div>
                <div className="rating-display">
                  <div className="rating-info">
                    <p className="rating-value">4.7</p>
                    <p className="rating-label">out of 5.0</p>
                    <p className="rating-count">from 356 reviews</p>
                  </div>
                </div>
                <div className="rating-breakdown">
                  <div className="rating-bar">
                    <span className="rating-level">5 ★</span>
                    <div className="rating-progress-bar">
                      <div className="rating-progress-fill" style={{ width: "78%" }}></div>
                    </div>
                    <span className="rating-percentage">78%</span>
                  </div>
                  <div className="rating-bar">
                    <span className="rating-level">4 ★</span>
                    <div className="rating-progress-bar">
                      <div className="rating-progress-fill" style={{ width: "15%" }}></div>
                    </div>
                    <span className="rating-percentage">15%</span>
                  </div>
                  <div className="rating-bar">
                    <span className="rating-level">3 ★</span>
                    <div className="rating-progress-bar">
                      <div className="rating-progress-fill" style={{ width: "5%" }}></div>
                    </div>
                    <span className="rating-percentage">5%</span>
                  </div>
                  <div className="rating-bar">
                    <span className="rating-level">2 ★</span>
                    <div className="rating-progress-bar">
                      <div className="rating-progress-fill" style={{ width: "1%" }}></div>
                    </div>
                    <span className="rating-percentage">1%</span>
                  </div>
                  <div className="rating-bar">
                    <span className="rating-level">1 ★</span>
                    <div className="rating-progress-bar">
                      <div className="rating-progress-fill" style={{ width: "1%" }}></div>
                    </div>
                    <span className="rating-percentage">1%</span>
                  </div>
                </div>
              </div>

              <div className="chart-card span-2">
                <h3 className="chart-title">Recent Student Reviews</h3>
                <div className="feedback-list detailed">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="feedback-item detailed">
                      <div className="feedback-header">
                        <div className="user-info">
                          <div className="user-avatar">S</div>
                          <div>
                            <p className="user-name">Student {index + 1}</p>
                            <p className="feedback-date">Apr {20 - index}, 2025</p>
                          </div>
                        </div>
                        <div className="feedback-stars">{renderStars(5 - Math.floor(index / 3))}</div>
                      </div>
                      <p className="feedback-comment">
                        {index % 3 === 0
                          ? "Excellent course! The material was well-structured and the examples were very practical and applicable to real-world scenarios."
                          : index % 3 === 1
                          ? "Good content but would like more interactive elements and practice exercises. The instructor's explanations were clear."
                          : "The course was helpful, but some concepts could be explained better. More advanced examples would be great."}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pagination">
                  <button className="pagination-button active">1</button>
                  <button className="pagination-button">2</button>
                  <button className="pagination-button">3</button>
                  <button className="pagination-button">...</button>
                  <button className="pagination-button">12</button>
                </div>
              </div>
            </div>

            <div className="chart-card fullwidth">
              <h3 className="chart-title">Sentiment Analysis</h3>
              <div className="sentiment-analysis">
                <div className="sentiment-chart">
                  <div className="sentiment-bar positive" style={{ width: "65%" }}>
                    <span>Positive: 65%</span>
                  </div>
                  <div className="sentiment-bar neutral" style={{ width: "25%" }}>
                    <span>Neutral: 25%</span>
                  </div>
                  <div className="sentiment-bar negative" style={{ width: "10%" }}>
                    <span>Negative: 10%</span>
                  </div>
                </div>
                <div className="keyword-cloud">
                  <span className="keyword size-5">clear</span>
                  <span className="keyword size-4">helpful</span>
                  <span className="keyword size-5">practical</span>
                  <span className="keyword size-3">examples</span>
                  <span className="keyword size-4">interesting</span>
                  <span className="keyword size-2">difficult</span>
                  <span className="keyword size-1">confusing</span>
                  <span className="keyword size-3">engaging</span>
                  <span className="keyword size-4">comprehensive</span>
                  <span className="keyword size-2">challenging</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsAndFeedback;