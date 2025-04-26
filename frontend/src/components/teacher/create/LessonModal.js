import React, { useState, useEffect } from "react";
import { X, Plus, Video, FileText, Paperclip } from "lucide-react";
import styles from "../../../css/teacher/create/LessonModal.module.css";

const LessonModal = ({ currentLesson, onSave, onClose }) => {
  const initialLessonData = {
    title: "",
    type: "text",
    description: "",
    duration: "",
    content: "",
    resources: [],
    videoUrl: "",
    attachmentUrl: "",
  };
  
  const [lessonData, setLessonData] = useState(initialLessonData);
  const [activeTab, setActiveTab] = useState("basic");
  const [newResource, setNewResource] = useState({ name: "", url: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentLesson) {
      // Initialize with current lesson data or defaults
      setLessonData({
        ...initialLessonData,
        ...currentLesson,
        resources: currentLesson.resources || []
      });
    } else {
      // Reset form when adding new lesson
      setLessonData(initialLessonData);
    }
  }, [currentLesson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({ ...lessonData, [name]: value });
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleTypeChange = (type) => {
    setLessonData({ ...lessonData, type });
  };

  const handleAddResource = () => {
    if (newResource.name && newResource.url) {
      setLessonData({
        ...lessonData,
        resources: [...(lessonData.resources || []), { ...newResource }]
      });
      setNewResource({ name: "", url: "" });
    }
  };

  const handleRemoveResource = (index) => {
    const updatedResources = [...lessonData.resources];
    updatedResources.splice(index, 1);
    setLessonData({
      ...lessonData,
      resources: updatedResources
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!lessonData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (lessonData.type === "video" && !lessonData.videoUrl) {
      newErrors.videoUrl = "Video URL is required for video lessons";
    }
    
    if (lessonData.type === "attachment" && !lessonData.attachmentUrl) {
      newErrors.attachmentUrl = "Attachment URL is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Prepare the data to save (including the id if editing)
      const dataToSave = {
        ...lessonData,
        id: currentLesson?.id // Keep the id if editing
      };
      
      onSave(dataToSave);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {currentLesson?.id ? "Edit Lesson" : "Add New Lesson"}
          </h2>
          <button onClick={onClose} className={styles.btnClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.modalTabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'basic' ? styles.active : ''}`}
            onClick={() => setActiveTab('basic')}
            type="button"
          >
            Basic Info
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'content' ? styles.active : ''}`}
            onClick={() => setActiveTab('content')}
            type="button"
          >
            Content
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'resources' ? styles.active : ''}`}
            onClick={() => setActiveTab('resources')}
            type="button"
          >
            Resources
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Basic Info Tab */}
          <div className={`${styles.tabContent} ${activeTab === 'basic' ? styles.activeTab : ''}`}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Lesson Title</label>
              <input
                type="text"
                name="title"
                value={lessonData.title}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Enter lesson title"
              />
              {errors.title && <span className={styles.errorText}>{errors.title}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Lesson Type</label>
              <div className={styles.typeSelector}>
                <button
                  type="button"
                  className={`${styles.typeButton} ${lessonData.type === 'video' ? styles.active : ''}`}
                  onClick={() => handleTypeChange('video')}
                >
                  <Video size={18} />
                  <span>Video</span>
                </button>
                <button
                  type="button"
                  className={`${styles.typeButton} ${lessonData.type === 'text' ? styles.active : ''}`}
                  onClick={() => handleTypeChange('text')}
                >
                  <FileText size={18} />
                  <span>Text</span>
                </button>
                <button
                  type="button"
                  className={`${styles.typeButton} ${lessonData.type === 'attachment' ? styles.active : ''}`}
                  onClick={() => handleTypeChange('attachment')}
                >
                  <Paperclip size={18} />
                  <span>Attachment</span>
                </button>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description</label>
              <textarea
                name="description"
                value={lessonData.description}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Brief description of this lesson"
                rows="3"
              ></textarea>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Duration</label>
              <input
                type="text"
                name="duration"
                value={lessonData.duration}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="e.g. 15 min"
              />
            </div>
          </div>
          
          {/* Content Tab */}
          <div className={`${styles.tabContent} ${activeTab === 'content' ? styles.activeTab : ''}`}>
            {lessonData.type === 'video' && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Video URL</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={lessonData.videoUrl}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                />
                {errors.videoUrl && <span className={styles.errorText}>{errors.videoUrl}</span>}
              </div>
            )}
            
            {lessonData.type === 'text' && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Lesson Content</label>
                <textarea
                  name="content"
                  value={lessonData.content}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="Enter the content of your lesson here..."
                  rows="10"
                ></textarea>
              </div>
            )}
            
            {lessonData.type === 'attachment' && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Attachment URL</label>
                <input
                  type="url"
                  name="attachmentUrl"
                  value={lessonData.attachmentUrl}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter attachment URL"
                />
                {errors.attachmentUrl && <span className={styles.errorText}>{errors.attachmentUrl}</span>}
              </div>
            )}
          </div>
          
          {/* Resources Tab */}
          <div className={`${styles.tabContent} ${activeTab === 'resources' ? styles.activeTab : ''}`}>
            <div className={styles.resourcesList}>
              <h3>Additional Resources</h3>
              
              {lessonData.resources && lessonData.resources.length > 0 ? (
                <ul className={styles.resourceItems}>
                  {lessonData.resources.map((resource, index) => (
                    <li key={index} className={styles.resourceItem}>
                      <div className={styles.resourceInfo}>
                        <span className={styles.resourceName}>{resource.name}</span>
                        <span className={styles.resourceUrl}>{resource.url}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveResource(index)}
                        className={styles.btnRemoveResource}
                        aria-label="Remove resource"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.noResources}>No additional resources added yet.</p>
              )}
              
              <div className={styles.addResource}>
                <div className={styles.resourceInputs}>
                  <input
                    type="text"
                    value={newResource.name}
                    onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                    className={styles.formInput}
                    placeholder="Resource name"
                  />
                  <input
                    type="url"
                    value={newResource.url}
                    onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                    className={styles.formInput}
                    placeholder="Resource URL"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddResource}
                  className={styles.btnAddResource}
                  disabled={!newResource.name || !newResource.url}
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.btnCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.btnSave}
            >
              Save Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonModal;