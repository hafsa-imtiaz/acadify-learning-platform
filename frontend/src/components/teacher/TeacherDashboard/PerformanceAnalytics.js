import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../../css/teacher/PerformanceAnalytics.css';

const PerformanceAnalytics = () => {
  const [activeTab, setActiveTab] = useState('activity');
  
  const activityData = [
    { name: 'Mon', students: 23, completions: 18 },
    { name: 'Tue', students: 28, completions: 22 },
    { name: 'Wed', students: 35, completions: 27 },
    { name: 'Thu', students: 42, completions: 32 },
    { name: 'Fri', students: 38, completions: 30 },
    { name: 'Sat', students: 25, completions: 20 },
    { name: 'Sun', students: 20, completions: 15 },
  ];
  
  const quizData = [
    { name: 'Quiz 1', avgScore: 85 },
    { name: 'Quiz 2', avgScore: 78 },
    { name: 'Quiz 3', avgScore: 82 },
    { name: 'Quiz 4', avgScore: 90 },
    { name: 'Quiz 5', avgScore: 86 },
  ];
  
  const engagementData = [
    { name: 'Week 1', discussions: 45, resources: 67 },
    { name: 'Week 2', discussions: 53, resources: 78 },
    { name: 'Week 3', discussions: 61, resources: 82 },
    { name: 'Week 4', discussions: 58, resources: 76 },
    { name: 'Week 5', discussions: 65, resources: 89 },
    { name: 'Week 6', discussions: 70, resources: 92 },
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-tabs">
        <button 
          className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Student Activity
        </button>
        <button 
          className={`tab-button ${activeTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quizzes')}
        >
          Quiz Performance
        </button>
        <button 
          className={`tab-button ${activeTab === 'engagement' ? 'active' : ''}`}
          onClick={() => setActiveTab('engagement')}
        >
          Engagement
        </button>
      </div>
      
      <div className="chart-container">
        {activeTab === 'activity' && (
          <div className="chart-info">
            <div className="info-header">
              <h3>Weekly Student Activity</h3>
              <div className="metrics">
                <div className="metric">
                  <span className="metric-value">187</span>
                  <span className="metric-label">Active Students</span>
                </div>
                <div className="metric">
                  <span className="metric-value">78%</span>
                  <span className="metric-label">Completion Rate</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="completions" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {activeTab === 'quizzes' && (
          <div className="chart-info">
            <div className="info-header">
              <h3>Quiz Performance</h3>
              <div className="metrics">
                <div className="metric">
                  <span className="metric-value">84.2</span>
                  <span className="metric-label">Avg. Score</span>
                </div>
                <div className="metric">
                  <span className="metric-value">92%</span>
                  <span className="metric-label">Pass Rate</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={quizData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {activeTab === 'engagement' && (
          <div className="chart-info">
            <div className="info-header">
              <h3>Student Engagement</h3>
              <div className="metrics">
                <div className="metric">
                  <span className="metric-value">352</span>
                  <span className="metric-label">Discussion Posts</span>
                </div>
                <div className="metric">
                  <span className="metric-value">484</span>
                  <span className="metric-label">Resource Views</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="discussions" stroke="#4f46e5" strokeWidth={2} />
                <Line type="monotone" dataKey="resources" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceAnalytics;