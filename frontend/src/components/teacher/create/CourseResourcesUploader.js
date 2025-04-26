import React, { useState, useEffect } from 'react';
import { Upload, Plus, Link, Trash2, FileText, File, ExternalLink, FileSpreadsheet} from 'lucide-react';
import "../../../css/teacher/create/CourseResources.css";

export default function CourseResourcesUploader( initialData, onSave, isEditMode ) {
  const [attachments, setAttachments] = useState([
    { id: 1, name: 'Course Syllabus.pdf', type: 'pdf', size: '1.2 MB', assignedTo: 'general' },
    { id: 2, name: 'Week 1 Slides.pptx', type: 'ppt', size: '3.5 MB', assignedTo: 'Lesson 1: Introduction' },
    { id: 3, name: 'https://example.com/helpful-resource', type: 'link', assignedTo: 'general' }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAttachment, setNewAttachment] = useState({
    name: '',
    type: 'file',
    assignedTo: 'general'
  });
  
  const [lessons, setLessons] = useState([
    'general',
    'Lesson 1: Introduction',
    'Lesson 2: Core Concepts',
    'Lesson 3: Advanced Topics'
  ]);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      // Extract lessons from course structure
      const extractedLessons = ['general'];
      const resources = [];
      
      initialData.forEach(section => {
        // Add lessons from sections
        if (section.lessons && section.lessons.length > 0) {
          section.lessons.forEach(lesson => {
            extractedLessons.push(lesson.title);
          });
        }
        
        // Extract resources if they exist in the structure
        if (section.resources && section.resources.length > 0) {
          section.resources.forEach(resource => {
            resources.push({
              ...resource,
              assignedTo: resource.assignedTo || section.title
            });
          });
        }
      });
      
      setLessons(extractedLessons);
      
      // If resources were found in initialData, use them; otherwise keep default
      if (resources.length > 0) {
        setAttachments(resources);
      }
    }
  }, [initialData]);


  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText className="file-icon-pdf" size={20} />;
      case 'ppt': return <FileSpreadsheet className="file-icon-ppt" size={20} />;
      case 'link': return <ExternalLink className="file-icon-link" size={20} />;
      default: return <File className="file-icon-generic" size={20} />;
    }
  };
  
  const handleAddAttachment = () => {
    if (!newAttachment.name) return;
    
    setAttachments([
      ...attachments,
      {
        id: attachments.length + 1,
        ...newAttachment,
        size: newAttachment.type !== 'link' ? '0 MB' : undefined
      }
    ]);
    
    setNewAttachment({
      name: '',
      type: 'file',
      assignedTo: 'general'
    });
    
    setShowAddForm(false);
  };
  
  const handleRemoveAttachment = (id) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };
  
  return (
    <div className="attachments-container">
      <div className="header">
        <h2>
          <Upload size={24} />
          Attachments & Resources
        </h2>
        
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary btn-icon"
        >
          <Plus size={18} />
          Add Resource
        </button>
      </div>
      
      {showAddForm && (
        <div className="add-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Resource Type</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="resourceType"
                    checked={newAttachment.type === 'file'}
                    onChange={() => setNewAttachment({...newAttachment, type: 'file'})}
                  />
                  <span>File Upload</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="resourceType"
                    checked={newAttachment.type === 'link'}
                    onChange={() => setNewAttachment({...newAttachment, type: 'link'})}
                  />
                  <span>External Link</span>
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Assign To</label>
              <select 
                className="form-select"
                value={newAttachment.assignedTo}
                onChange={(e) => setNewAttachment({...newAttachment, assignedTo: e.target.value})}
              >
                {lessons.map(lesson => (
                  <option key={lesson} value={lesson}>{lesson === 'general' ? 'General Course Resources' : lesson}</option>
                ))}
              </select>
            </div>
          </div>
          
          {newAttachment.type === 'file' ? (
            <div>
              <label className="form-label">Upload File</label>
              <div className="file-upload-area">
                <input 
                  type="file" 
                  className="hidden" 
                  id="fileUpload"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setNewAttachment({...newAttachment, name: e.target.files[0].name});
                    }
                  }}
                />
                <label htmlFor="fileUpload">
                  <Upload className="upload-icon" />
                  <p className="upload-text">
                    {newAttachment.name ? newAttachment.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="upload-hint">
                    PDF, PPT, DOCX, XLSX, or other files (max 25MB)
                  </p>
                </label>
              </div>
            </div>
          ) : (
            <div>
              <label className="form-label">External Link</label>
              <div className="link-input-group">
                <div className="link-input-icon">
                  <Link size={18} />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/resource"
                  className="link-input"
                  value={newAttachment.name}
                  onChange={(e) => setNewAttachment({...newAttachment, name: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <div className="form-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleAddAttachment}
            >
              Add Resource
            </button>
          </div>
        </div>
      )}
      
      {attachments.length === 0 ? (
        <div className="empty-state">
          <Upload className="upload-icon" />
          <p>No attachments or resources added yet</p>
          <p>Add PDFs, slides, links, and other resources for your students</p>
        </div>
      ) : (
        <table className="attachments-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attachments.map(attachment => (
              <tr key={attachment.id}>
                <td>
                  <div className="file-name">
                    {getFileIcon(attachment.type)}
                    <span>{attachment.name}</span>
                  </div>
                </td>
                <td>
                  {attachment.type === 'link' ? 'External Link' : attachment.type.toUpperCase()}
                  {attachment.size && <span className="file-size">({attachment.size})</span>}
                </td>
                <td>
                  {attachment.assignedTo === 'general' ? 'General Course Resources' : attachment.assignedTo}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleRemoveAttachment(attachment.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}