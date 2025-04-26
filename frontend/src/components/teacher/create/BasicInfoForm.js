import React from 'react';
import { BookOpen, Info, Image, Tag, X, ChevronRight } from 'lucide-react';
import styles from '../../../css/teacher/create/basicinfo.module.css';

const CourseBasicInfoForm = ({ 
  title, setTitle,
  description, setDescription,
  category, setCategory,
  level, setLevel,
  duration, setDuration,
  capacity, setCapacity,
  image, setImage,
  tags = [], setTags,
  tagInput = "", setTagInput,
  isEditMode = false,
  submitButtonText = "Save",
  handleSubmit,
  errors = {}  // Provide a default empty object
}) => {
  const handleImageChange = (e) => {
    // Image change handler implementation
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <BookOpen size={20} />
          Basic Course Information
        </h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">Course Title</label>
          <p className={styles.formDescription}>Be specific and clear about what you'll teach</p>
          <input 
            type="text" 
            id="title" 
            className={`${styles.formControl} ${errors?.title ? styles.error : ''}`}
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Introduction to Python Programming"
          />
          {errors?.title && <div className={styles.errorMessage}>{errors.title}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">Course Description</label>
          <p className={styles.formDescription}>What will students learn in this course?</p>
          <textarea 
            id="description" 
            className={`${styles.formControl} ${styles.textarea} ${errors?.description ? styles.error : ''}`}
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your course content, objectives, and outcomes..."
            rows="5"
          ></textarea>
          {errors?.description && <div className={styles.errorMessage}>{errors.description}</div>}
        </div>
      </div>
      
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <Info size={20} />
          Course Details
        </h3>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">Category</label>
            <select 
              id="category" 
              className={`${styles.formControl} ${styles.select} ${errors?.category ? styles.error : ''}`}
              value={category || ""}
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
            {errors?.category && <div className={styles.errorMessage}>{errors.category}</div>}
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="level">Difficulty Level</label>
            <select 
              id="level" 
              className={`${styles.formControl} ${styles.select}`}
              value={level || "beginner"}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="beginner">Beginner - No prior knowledge required</option>
              <option value="intermediate">Intermediate - Basic knowledge required</option>
              <option value="advanced">Advanced - Comprehensive knowledge required</option>
              <option value="all">All Levels</option>
            </select>
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="duration">Estimated Duration</label>
            <p className={styles.formDescription}>How long will it take to complete this course?</p>
            <input 
              type="text" 
              id="duration" 
              className={`${styles.formControl} ${errors?.duration ? styles.error : ''}`}
              value={duration || ""}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 6 weeks, 12 hours"
            />
            {errors?.duration && <div className={styles.errorMessage}>{errors.duration}</div>}
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="capacity">Student Capacity (Optional)</label>
            <p className={styles.formDescription}>Leave blank for unlimited students</p>
            <input 
              type="number" 
              id="capacity" 
              className={styles.formControl}
              value={capacity || ""}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="e.g., 30"
              min="1"
            />
          </div>
        </div>
      </div>
      
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <Image size={20} />
          Course Image
        </h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Upload Course Thumbnail</label>
          <p className={styles.formDescription}>Recommended size: 1280x720 pixels (16:9 ratio)</p>
          
          <div className={styles.imageUploadContainer}>
            {image ? (
              <div className={styles.imagePreview}>
                <img src={image} alt="Course thumbnail preview" />
                <button 
                  type="button" 
                  className={styles.removeImageBtn}
                  onClick={() => setImage(null)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className={styles.uploadPlaceholder}>
                <input 
                  type="file" 
                  id="course-image" 
                  onChange={handleImageChange}
                  accept="image/*"
                  className={styles.imageInput}
                />
                <label htmlFor="course-image" className={styles.uploadBtn}>
                  <Image size={24} />
                  <span>Choose Image</span>
                </label>
                <p className={styles.uploadHint}>JPG, PNG or GIF, max 5MB</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <Tag size={20} />
          Tags
        </h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="tags">Course Tags</label>
          <p className={styles.formDescription}>Add up to 5 tags to help students find your course</p>
          
          <div className={styles.tagsInputContainer}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tag}>
                {tag}
                <span className={styles.tagRemove} onClick={() => removeTag(tag)}>
                  <X size={14} />
                </span>
              </div>
            ))}
            <div className={styles.tagInputWrapper}>
              <input 
                type="text" 
                className={styles.tagsInput}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={tags.length === 0 ? "Add tags..." : ""}
                disabled={tags.length >= 5}
              />
              {tagInput && (
                <button 
                  type="button" 
                  className={styles.addTagBtn} 
                  onClick={addTag}
                  disabled={tags.length >= 5}
                >
                  Add
                </button>
              )}
            </div>
          </div>
          <p className={styles.formDescription}>Press Enter to add a tag</p>
        </div>
      </div>
      
      <div className={styles.buttonRow}>
        <button type="button" className={`${styles.button} ${styles.buttonSecondary}`}>
          Cancel
        </button>
        <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
          {submitButtonText}
          {!isEditMode && <ChevronRight size={16} />}
        </button>
      </div>
    </form>
  );
};

export default CourseBasicInfoForm;