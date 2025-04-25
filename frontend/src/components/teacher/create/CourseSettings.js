import React, { useState } from 'react';
import { Settings, Clock, Book, Award, Users, Plus, Trash2 } from 'lucide-react';
import '../../../css/teacher/create/course-settings.css';

export default function CourseSettings() {
  const [courseSettings, setCourseSettings] = useState({
    level: 'intermediate',
    estimatedDuration: {
      value: 6,
      unit: 'weeks'
    },
    prerequisites: [
      'Basic understanding of web development',
      'Familiarity with JavaScript fundamentals'
    ],
    learningOutcomes: [
      'Build responsive web applications with React',
      'Implement state management using hooks and context',
      'Create and manage reusable UI components'
    ],
    enrollmentType: 'paid',
    price: 49.99
  });

  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newOutcome, setNewOutcome] = useState('');

  const handleLevelChange = (level) => {
    setCourseSettings({
      ...courseSettings,
      level
    });
  };

  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    setCourseSettings({
      ...courseSettings,
      estimatedDuration: {
        ...courseSettings.estimatedDuration,
        [name]: name === 'value' ? Number(value) : value
      }
    });
  };

  const handleEnrollmentTypeChange = (enrollmentType) => {
    setCourseSettings({
      ...courseSettings,
      enrollmentType
    });
  };

  const handlePriceChange = (e) => {
    setCourseSettings({
      ...courseSettings,
      price: Number(e.target.value)
    });
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim() === '') return;
    
    setCourseSettings({
      ...courseSettings,
      prerequisites: [...courseSettings.prerequisites, newPrerequisite]
    });
    setNewPrerequisite('');
  };

  const removePrerequisite = (index) => {
    const updatedPrerequisites = [...courseSettings.prerequisites];
    updatedPrerequisites.splice(index, 1);
    
    setCourseSettings({
      ...courseSettings,
      prerequisites: updatedPrerequisites
    });
  };

  const addOutcome = () => {
    if (newOutcome.trim() === '') return;
    
    setCourseSettings({
      ...courseSettings,
      learningOutcomes: [...courseSettings.learningOutcomes, newOutcome]
    });
    setNewOutcome('');
  };

  const removeOutcome = (index) => {
    const updatedOutcomes = [...courseSettings.learningOutcomes];
    updatedOutcomes.splice(index, 1);
    
    setCourseSettings({
      ...courseSettings,
      learningOutcomes: updatedOutcomes
    });
  };

  return (
    <div className="course-settings-container">
      <div className="settings-header">
        <h2 className="settings-title">
          <Settings size={24} />
          Course Settings
        </h2>
      </div>

      <div className="settings-grid">
        {/* Course Level Section */}
        <div className="settings-card">
          <div className="card-header">
            <Book size={20} />
            <h3>Course Level</h3>
          </div>
          
          <div className="level-options">
            <button 
              className={`level-button ${courseSettings.level === 'beginner' ? 'active' : ''}`}
              onClick={() => handleLevelChange('beginner')}
            >
              Beginner
            </button>
            <button 
              className={`level-button ${courseSettings.level === 'intermediate' ? 'active' : ''}`}
              onClick={() => handleLevelChange('intermediate')}
            >
              Intermediate
            </button>
            <button 
              className={`level-button ${courseSettings.level === 'advanced' ? 'active' : ''}`}
              onClick={() => handleLevelChange('advanced')}
            >
              Advanced
            </button>
          </div>
        </div>

        {/* Estimated Duration Section */}
        <div className="settings-card">
          <div className="card-header">
            <Clock size={20} />
            <h3>Estimated Duration</h3>
          </div>
          
          <div className="duration-inputs">
            <input
              type="number"
              name="value"
              value={courseSettings.estimatedDuration.value}
              onChange={handleDurationChange}
              min="1"
              className="duration-value"
            />
            
            <select
              name="unit"
              value={courseSettings.estimatedDuration.unit}
              onChange={handleDurationChange}
              className="duration-unit"
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        {/* Prerequisites Section */}
        <div className="settings-card full-width">
          <div className="card-header">
            <Book size={20} />
            <h3>Prerequisites</h3>
          </div>
          
          <div className="list-section">
            <ul className="items-list">
              {courseSettings.prerequisites.map((prerequisite, index) => (
                <li key={index} className="list-item">
                  <span>{prerequisite}</span>
                  <button 
                    className="remove-button"
                    onClick={() => removePrerequisite(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="add-item-form">
              <input
                type="text"
                value={newPrerequisite}
                onChange={(e) => setNewPrerequisite(e.target.value)}
                placeholder="Add a prerequisite..."
                className="add-item-input"
              />
              <button 
                className="add-item-button"
                onClick={addPrerequisite}
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Learning Outcomes Section */}
        <div className="settings-card full-width">
          <div className="card-header">
            <Award size={20} />
            <h3>Learning Outcomes</h3>
          </div>
          
          <div className="list-section">
            <ul className="items-list">
              {courseSettings.learningOutcomes.map((outcome, index) => (
                <li key={index} className="list-item">
                  <span>{outcome}</span>
                  <button 
                    className="remove-button"
                    onClick={() => removeOutcome(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="add-item-form">
              <input
                type="text"
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                placeholder="Add a learning outcome..."
                className="add-item-input"
              />
              <button 
                className="add-item-button"
                onClick={addOutcome}
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Enrollment Type Section */}
        <div className="settings-card full-width">
          <div className="card-header">
            <Users size={20} />
            <h3>Enrollment Type</h3>
          </div>
          
          <div className="enrollment-options">
            <button 
              className={`enrollment-button ${courseSettings.enrollmentType === 'free' ? 'active' : ''}`}
              onClick={() => handleEnrollmentTypeChange('free')}
            >
              Free
            </button>
            <button 
              className={`enrollment-button ${courseSettings.enrollmentType === 'paid' ? 'active' : ''}`}
              onClick={() => handleEnrollmentTypeChange('paid')}
            >
              Paid
            </button>
            <button 
              className={`enrollment-button ${courseSettings.enrollmentType === 'invite' ? 'active' : ''}`}
              onClick={() => handleEnrollmentTypeChange('invite')}
            >
              Invite Only
            </button>
          </div>
          
          {courseSettings.enrollmentType === 'paid' && (
            <div className="price-input-container">
              <label htmlFor="price" className="price-label">Price ($):</label>
              <input
                id="price"
                type="number"
                value={courseSettings.price}
                onChange={handlePriceChange}
                min="0"
                step="0.01"
                className="price-input"
              />
            </div>
          )}
        </div>
      </div>

      <div className="settings-footer">
        <button className="save-button">Save Settings</button>
      </div>
    </div>
  );
}