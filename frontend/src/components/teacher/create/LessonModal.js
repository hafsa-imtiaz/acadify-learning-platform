import React, { useState, useEffect } from "react";
import { X, Plus, Video, FileText, Paperclip } from "lucide-react";

const LessonModal = ({ currentLesson, onSave, onClose }) => {
  const initialLessonData = {
    title: "",
    type: "text",
    description: "",
    duration: "",
    content: "",
    resources: [],
    videoUrl: "",
  };
  
  const [lessonData, setLessonData] = useState(initialLessonData);
  const [activeTab, setActiveTab] = useState("basic");
  const [newResource, setNewResource] = useState({ name: "", url: "" });

  useEffect(() => {
    if (currentLesson) {
      // Initialize with default values for fields that might not exist
      setLessonData({
        ...initialLessonData,
        ...currentLesson,
        resources: currentLesson.resources || []
      });
    }
  }, [currentLesson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({ ...lessonData, [name]: value });
  };

  const handleTypeChange = (type) => {
    setLessonData({ ...lessonData, type });
  };

  const handleAddResource = () => {
    if (newResource.name && newResource.url) {
      setLessonData({
        ...lessonData,
        resources: [...(lessonData.resources || []), { ...newResource }],
        resourceCount: (lessonData.resources?.length || 0) + 1
      });
      setNewResource({ name: "", url: "" });
    }
  };

  const handleRemoveResource = (index) => {
    const updatedResources = [...lessonData.resources];
    updatedResources.splice(index, 1);
    setLessonData({
      ...lessonData,
      resources: updatedResources,
      resourceCount: updatedResources.length
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(lessonData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container lesson-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {currentLesson?.id ? "Edit Lesson" : "Add New Lesson"}
          </h2>
          <button onClick={onClose} className="btn-close">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button 
            className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
          <button 
            className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="tab-content">
              <div className="form-group">
                <label className="form-label">Lesson Title</label>
                <input
                  type="text"
                  name="title"
                  value={lessonData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter lesson title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Lesson Type</label>
                <div className="type-selector">
                  <button
                    type="button"
                    className={`type-button ${lessonData.type === 'video' ? 'active' : ''}`}
                    onClick={() => handleTypeChange('video')}
                  >
                    <Video size={18} />
                    <span>Video</span>
                  </button>
                  <button
                    type="button"
                    className={`type-button ${lessonData.type === 'text' ? 'active' : ''}`}
                    onClick={() => handleTypeChange('text')}
                  >
                    <FileText size={18} />
                    <span>Text</span>
                  </button>
                  <button
                    type="button"
                    className={`type-button ${lessonData.type === 'attachment' ? 'active' : ''}`}
                    onClick={() => handleTypeChange('attachment')}
                  >
                    <Paperclip size={18} />
                    <span>Attachment</span>
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={lessonData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Brief description of this lesson"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={lessonData.duration}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. 15 min"
                />
              </div>
            </div>
          )}
          
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="tab-content">
              {lessonData.type === 'video' && (
                <div className="form-group">
                  <label className="form-label">Video URL</label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={lessonData.videoUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                  />
                </div>
              )}
              
              {lessonData.type === 'text' && (
                <div className="form-group">
                  <label className="form-label">Lesson Content</label>
                  <textarea
                    name="content"
                    value={lessonData.content}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Enter the content of your lesson here..."
                    rows="10"
                  ></textarea>
                </div>
              )}
              
              {lessonData.type === 'attachment' && (
                <div className="form-group">
                  <label className="form-label">Attachment URL</label>
                  <input
                    type="url"
                    name="attachmentUrl"
                    value={lessonData.attachmentUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter attachment URL"
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="tab-content">
              <div className="resources-list">
                <h3>Additional Resources</h3>
                
                {lessonData.resources && lessonData.resources.length > 0 ? (
                  <ul className="resource-items">
                    {lessonData.resources.map((resource, index) => (
                      <li key={index} className="resource-item">
                        <div className="resource-info">
                          <span className="resource-name">{resource.name}</span>
                          <span className="resource-url">{resource.url}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveResource(index)}
                          className="btn-remove-resource"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-resources">No additional resources added yet.</p>
                )}
                
                <div className="add-resource">
                  <div className="resource-inputs">
                    <input
                      type="text"
                      value={newResource.name}
                      onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                      className="form-input"
                      placeholder="Resource name"
                    />
                    <input
                      type="url"
                      value={newResource.url}
                      onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                      className="form-input"
                      placeholder="Resource URL"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddResource}
                    className="btn-add-resource"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save"
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