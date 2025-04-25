import React, { useState } from 'react';
import { BookOpen, Info, Clock, Users, Tag, Image, ChevronRight } from 'lucide-react';

const CourseResourcesUploader = ({ onNext, courseData, setCourseData }) => {
  const [title, setTitle] = useState(courseData?.title || '');
  const [description, setDescription] = useState(courseData?.description || '');
  const [category, setCategory] = useState(courseData?.category || '');
  const [level, setLevel] = useState(courseData?.level || 'beginner');
  const [duration, setDuration] = useState(courseData?.duration || '');
  const [capacity, setCapacity] = useState(courseData?.capacity || '');
  const [image, setImage] = useState(courseData?.image || null);
  const [tags, setTags] = useState(courseData?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Course title is required';
    if (!description.trim()) newErrors.description = 'Course description is required';
    if (!category) newErrors.category = 'Category is required';
    if (!duration) newErrors.duration = 'Duration is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const updatedCourseData = {
      ...courseData,
      title,
      description,
      category,
      level,
      duration,
      capacity,
      image,
      tags
    };

    setCourseData(updatedCourseData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="section-title">
          <BookOpen size={20} />
          Basic Course Information
        </h3>
        
        <div className="form-group">
          <label htmlFor="title">Course Title</label>
          <p className="form-description">Be specific and clear about what you'll teach</p>
          <input 
            type="text" 
            id="title" 
            className={`form-control ${errors.title ? 'error' : ''}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Introduction to Python Programming"
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Course Description</label>
          <p className="form-description">What will students learn in this course?</p>
          <textarea 
            id="description" 
            className={`form-control textarea ${errors.description ? 'error' : ''}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your course content, objectives, and outcomes..."
            rows="5"
          ></textarea>
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="section-title">
          <Info size={20} />
          Course Details
        </h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              className={`form-control select ${errors.category ? 'error' : ''}`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="programming">Programming & Development</option>
              <option value="business">Business & Management</option>
              <option value="design">Design & Creativity</option>
              <option value="marketing">Marketing & Communication</option>
              <option value="science">Science & Math</option>
              <option value="language">Language Learning</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <div className="error-message">{errors.category}</div>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="level">Difficulty Level</label>
            <select 
              id="level" 
              className="form-control select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="beginner">Beginner - No prior knowledge required</option>
              <option value="intermediate">Intermediate - Basic knowledge required</option>
              <option value="advanced">Advanced - Comprehensive knowledge required</option>
              <option value="all">All Levels</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Estimated Duration</label>
            <p className="form-description">How long will it take to complete this course?</p>
            <input 
              type="text" 
              id="duration" 
              className={`form-control ${errors.duration ? 'error' : ''}`}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 6 weeks, 12 hours"
            />
            {errors.duration && <div className="error-message">{errors.duration}</div>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="capacity">Student Capacity (Optional)</label>
            <p className="form-description">Leave blank for unlimited students</p>
            <input 
              type="number" 
              id="capacity" 
              className="form-control"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="e.g., 30"
              min="1"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="section-title">
          <Image size={20} />
          Course Image
        </h3>
        
        <div className="form-group">
          <label>Upload Course Thumbnail</label>
          <p className="form-description">Recommended size: 1280x720 pixels (16:9 ratio)</p>
          
          <div className="image-upload-container">
            {image ? (
              <div className="image-preview">
                <img src={image} alt="Course thumbnail preview" />
                <button 
                  type="button" 
                  className="remove-image-btn"
                  onClick={() => setImage(null)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <input 
                  type="file" 
                  id="course-image" 
                  onChange={handleImageChange}
                  accept="image/*"
                  className="image-input"
                />
                <label htmlFor="course-image" className="upload-btn">
                  <Image size={24} />
                  <span>Choose Image</span>
                </label>
                <p className="upload-hint">JPG, PNG or GIF, max 5MB</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="section-title">
          <Tag size={20} />
          Tags
        </h3>
        
        <div className="form-group">
          <label htmlFor="tags">Course Tags</label>
          <p className="form-description">Add up to 5 tags to help students find your course</p>
          
          <div className="tags-input-container">
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <span className="tag-remove" onClick={() => removeTag(tag)}>
                  ×
                </span>
              </div>
            ))}
            <form onSubmit={addTag}>
              <input 
                type="text" 
                className="tags-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder={tags.length === 0 ? "Add tags..." : ""}
                disabled={tags.length >= 5}
              />
            </form>
          </div>
          <p className="form-description">Press Enter to add a tag</p>
        </div>
      </div>
      
      <div className="button-row">
        <button type="button" className="button button-secondary" disabled>
          Cancel
        </button>
        <button type="submit" className="button button-primary">
          Continue to Course Structure
          <ChevronRight size={16} />
        </button>
      </div>
    </form>
  );
};

export default CourseResourcesUploader;