import React from "react";
import "../../../css/teacher/view/overview.css";

const Overview = () => {
  return (
    <div className="overview-container">
      <div className="card">
        <h3 className="card-title">Course Information</h3>
        <div className="info-group">
          <div className="info-item">
            <h4 className="info-label">Title</h4>
            <p className="info-value">Advanced Web Development with React</p>
          </div>
          <div className="info-item">
            <h4 className="info-label">Description</h4>
            <p className="info-text">
              This comprehensive course covers modern React development practices, state management, 
              hooks, context API, and building production-ready applications. Students will learn 
              through hands-on projects and real-world examples.
            </p>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <h4 className="info-label">Category</h4>
              <p className="info-value">Web Development</p>
            </div>
            <div className="info-item">
              <h4 className="info-label">Level</h4>
              <p className="info-value">Intermediate</p>
            </div>
            <div className="info-item">
              <h4 className="info-label">Cost</h4>
              <p className="info-value">$199.99</p>
            </div>
            <div className="info-item">
              <h4 className="info-label">Duration</h4>
              <p className="info-value">10 weeks</p>
            </div>
            <div className="info-item">
              <h4 className="info-label">Language</h4>
              <p className="info-value">English</p>
            </div>
            <div className="info-item">
              <h4 className="info-label">Total Enrolled</h4>
              <p className="info-value">42 students</p>
            </div>
            <div className="info-item">
              <h4 className="info-label">Prerequisite</h4>
              <p className="info-value">Basic JavaScript knowledge</p>
            </div>
            <div className="info-item">
              <h4 className="info-label">Created By</h4>
              <p className="info-value">John Smith</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="card-title">Course Status</h3>
        <div className="status-container">
          <span className="status-badge status-draft">
            Draft
          </span>
          <span className="status-date">Last updated: April 20, 2025</span>
          <div className="course-actions">
            <button className="action-btn action-btn-outline">Archive Course</button>
            <button className="action-btn action-btn-danger">Delete Course</button>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="card-title">Publishing Options</h3>
        <div className="options-container">
          <div className="option-item">
            <div className="option-info">
              <p className="option-label">Visibility</p>
              <p className="option-description">Control who can view and enroll in your course</p>
            </div>
            <div className="option-control">
              <select className="form-select">
                <option>Public</option>
                <option>Private</option>
                <option>Invitation Only</option>
              </select>
            </div>
          </div>
          <div className="option-item">
            <div className="option-info">
              <p className="option-label">Enrollment Period</p>
              <p className="option-description">Set when students can enroll</p>
            </div>
            <div className="option-control">
              <select className="form-select">
                <option>Always Open</option>
                <option>Fixed Period</option>
                <option>Scheduled Sessions</option>
              </select>
            </div>
          </div>
          <div className="option-item">
            <div className="option-info">
              <p className="option-label">Pricing Model</p>
              <p className="option-description">Choose how students will pay for this course</p>
            </div>
            <div className="option-control">
              <select className="form-select">
                <option>One-time Payment</option>
                <option>Subscription</option>
                <option>Free</option>
              </select>
            </div>
          </div>
          <div className="option-item">
            <div className="option-info">
              <p className="option-label">Certificate</p>
              <p className="option-description">Offer completion certificates</p>
            </div>
            <div className="option-control checkbox-wrapper">
              <label className="checkbox-container">
                <input type="checkbox" className="form-checkbox" />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          <div className="option-item">
            <div className="option-info">
              <p className="option-label">Auto-enrollment</p>
              <p className="option-description">Automatically approve student enrollment requests</p>
            </div>
            <div className="option-control checkbox-wrapper">
              <label className="checkbox-container">
                <input type="checkbox" className="form-checkbox" />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="card-title">Instructor Notes</h3>
        <div className="notes-box">
          <p className="notes-text">
            These are your private notes for the course. Students won't see this content.
            Add reminders, planned improvements, or anything else you want to remember about this course.
          </p>
        </div>
        <textarea 
          className="notes-textarea" 
          rows="4"
          placeholder="Add your private notes here..."
        ></textarea>
        <div className="notes-actions">
          <button className="action-btn action-btn-secondary">Save Notes</button>
        </div>
      </div>
    </div>
  );
};

export default Overview;