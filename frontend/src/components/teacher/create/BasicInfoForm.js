import React, { useState, useEffect } from 'react';
import { BookOpen, Info, Clock, Users, Tag, Image, ChevronRight, X } from 'lucide-react';
import '../../../css/teacher/create/basicinfo.css'

const CourseBasicInfoForm = ({ onNext, initialData, onSave, isEditMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('beginner');
  const [duration, setDuration] = useState('');
  const [capacity, setCapacity] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  // Initialize form data when initialData changes or on component mount
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setCategory(initialData.category || '');
      setLevel(initialData.level || 'beginner');
      setDuration(initialData.duration || '');
      setCapacity(initialData.capacity || '');
      setImage(initialData.image || null);
      setTags(initialData.tags || []);
    }
  }, [initialData]);

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

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  // Handle Enter key press for tag input
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      addTag();
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
      title,
      description,
      category,
      level,
      duration,
      capacity,
      image,
      tags
    };

    // If onSave is provided (for edit/create functionality), call it with the data
    if (onSave) {
      onSave(updatedCourseData);
    }
    
    // If onNext is provided (for multi-step form navigation), call it
    if (onNext) {
      onNext(updatedCourseData);
    }
  };

  // Update page title and button text based on edit mode
  const submitButtonText = isEditMode 
    ? "Save Changes" 
    : "Continue to Course Structure";

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-section-basic">
        <h3 className="section-title-basic">
          <BookOpen size={20} />
          Basic Course Information
        </h3>
        
        <div className="form-group-basic">
          <label className="label-basic" htmlFor="title">Course Title</label>
          <p className="form-description-basic">Be specific and clear about what you'll teach</p>
          <input 
            type="text" 
            id="title" 
            className={`form-control-basic ${errors.title ? 'error-basic' : ''}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Introduction to Python Programming"
          />
          {errors.title && <div className="error-message-basic">{errors.title}</div>}
        </div>
        
        <div className="form-group-basic">
          <label className="label-basic" htmlFor="description">Course Description</label>
          <p className="form-description-basic">What will students learn in this course?</p>
          <textarea 
            id="description" 
            className={`form-control-basic textarea-basic ${errors.description ? 'error-basic' : ''}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your course content, objectives, and outcomes..."
            rows="5"
          ></textarea>
          {errors.description && <div className="error-message-basic">{errors.description}</div>}
        </div>
      </div>
      
      <div className="form-section-basic">
        <h3 className="section-title-basic">
          <Info size={20} />
          Course Details
        </h3>
        
        <div className="form-row-basic">
          <div className="form-group-basic">
            <label className="label-basic" htmlFor="category">Category</label>
            <select 
              id="category" 
              className={`form-control-basic select-basic ${errors.category ? 'error-basic' : ''}`}
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
            {errors.category && <div className="error-message-basic">{errors.category}</div>}
          </div>
        </div>
        
        <div className="form-row-basic">
          <div className="form-group-basic">
            <label className="label-basic" htmlFor="level">Difficulty Level</label>
            <select 
              id="level" 
              className="form-control-basic select-basic"
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
        
        <div className="form-row-basic">
          <div className="form-group-basic">
            <label className="label-basic" htmlFor="duration">Estimated Duration</label>
            <p className="form-description-basic">How long will it take to complete this course?</p>
            <input 
              type="text" 
              id="duration" 
              className={`form-control-basic ${errors.duration ? 'error-basic' : ''}`}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 6 weeks, 12 hours"
            />
            {errors.duration && <div className="error-message-basic">{errors.duration}</div>}
          </div>
        </div>
        
        <div className="form-row-basic">
          <div className="form-group-basic">
            <label className="label-basic" htmlFor="capacity">Student Capacity (Optional)</label>
            <p className="form-description-basic">Leave blank for unlimited students</p>
            <input 
              type="number" 
              id="capacity" 
              className="form-control-basic"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="e.g., 30"
              min="1"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section-basic">
        <h3 className="section-title-basic">
          <Image size={20} />
          Course Image
        </h3>
        
        <div className="form-group-basic">
          <label className="label-basic">Upload Course Thumbnail</label>
          <p className="form-description-basic">Recommended size: 1280x720 pixels (16:9 ratio)</p>
          
          <div className="image-upload-container-basic">
            {image ? (
              <div className="image-preview-basic">
                <img src={image} alt="Course thumbnail preview" />
                <button 
                  type="button" 
                  className="remove-image-btn-basic"
                  onClick={() => setImage(null)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="upload-placeholder-basic">
                <input 
                  type="file" 
                  id="course-image" 
                  onChange={handleImageChange}
                  accept="image/*"
                  className="image-input-basic"
                />
                <label htmlFor="course-image" className="upload-btn-basic">
                  <Image size={24} />
                  <span>Choose Image</span>
                </label>
                <p className="upload-hint-basic">JPG, PNG or GIF, max 5MB</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="form-section-basic">
        <h3 className="section-title-basic">
          <Tag size={20} />
          Tags
        </h3>
        
        <div className="form-group-basic">
          <label className="label-basic" htmlFor="tags">Course Tags</label>
          <p className="form-description-basic">Add up to 5 tags to help students find your course</p>
          
          <div className="tags-input-container-basic">
            {tags.map((tag, index) => (
              <div key={index} className="tag-basic">
                {tag}
                <span className="tag-remove-basic" onClick={() => removeTag(tag)}>
                  <X size={14} />
                </span>
              </div>
            ))}
            <div className="tag-input-wrapper-basic">
              <input 
                type="text" 
                className="tags-input-basic"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={tags.length === 0 ? "Add tags..." : ""}
                disabled={tags.length >= 5}
              />
              {tagInput && (
                <button 
                  type="button" 
                  className="add-tag-btn-basic" 
                  onClick={addTag}
                  disabled={tags.length >= 5}
                >
                  Add
                </button>
              )}
            </div>
          </div>
          <p className="form-description-basic">Press Enter to add a tag</p>
        </div>
      </div>
      
      <div className="button-row-basic">
        <button type="button" className="button-basic button-secondary-basic">
          Cancel
        </button>
        <button type="submit" className="button-basic button-primary-basic">
          {submitButtonText}
          {!isEditMode && <ChevronRight size={16} />}
        </button>
      </div>
    </form>
  );
};

export default CourseBasicInfoForm;