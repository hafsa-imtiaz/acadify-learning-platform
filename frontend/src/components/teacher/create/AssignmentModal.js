import React, { useState, useEffect } from "react";
import { X, Calendar, Trash2, Plus, Paperclip, FileQuestion } from "lucide-react";
import styles from "../../../css/teacher/create/assignment-modal.module.css";

const AssignmentModal = ({ currentAssignment, onSave, onDelete, onClose }) => {
  const initialState = {
    title: "",
    description: "",
    dueDate: "",
    points: 10,
    submissionType: "text",
    status: "draft",
    assignmentType: "standard", // standard, quiz
    attachments: [],
    quizSettings: {
      timeLimit: 0, // 0 means no time limit
      allowMultipleAttempts: false,
      shuffleQuestions: false,
      passingScore: 60
    }
  };

  const [assignment, setAssignment] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [newAttachment, setNewAttachment] = useState({ name: "", url: "" });

  // Initialize with current assignment data if editing
  useEffect(() => {
    if (currentAssignment) {
      setAssignment({
        ...initialState,
        ...currentAssignment,
        dueDate: currentAssignment.dueDate || "",
        attachments: currentAssignment.attachments || [],
        assignmentType: currentAssignment.assignmentType || "standard",
        quizSettings: {
          ...initialState.quizSettings,
          ...(currentAssignment.quizSettings || {})
        }
      });
    } else {
      // Reset form when adding new assignment
      setAssignment(initialState);
    }
    // Reset errors when modal opens
    setErrors({});
    setIsDeleting(false);
  }, [currentAssignment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePointsChange = (e) => {
    const points = parseInt(e.target.value, 10);
    if (!isNaN(points) && points >= 0) {
      setAssignment(prev => ({
        ...prev,
        points
      }));
      
      if (errors.points) {
        setErrors(prev => ({ ...prev, points: "" }));
      }
    }
  };

  const handleQuizSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    const settingValue = type === 'checkbox' ? checked : 
                         type === 'number' ? parseInt(value, 10) : value;
    
    setAssignment(prev => ({
      ...prev,
      quizSettings: {
        ...prev.quizSettings,
        [name]: settingValue
      }
    }));
  };

  const handleAttachmentChange = (e) => {
    const { name, value } = e.target;
    setNewAttachment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addAttachment = () => {
    if (newAttachment.name && newAttachment.url) {
      setAssignment(prev => ({
        ...prev,
        attachments: [...prev.attachments, { ...newAttachment, id: Date.now() }]
      }));
      setNewAttachment({ name: "", url: "" });
    }
  };

  const removeAttachment = (attachmentId) => {
    setAssignment(prev => ({
      ...prev,
      attachments: prev.attachments.filter(attachment => attachment.id !== attachmentId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!assignment.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (assignment.submissionType !== "none" && !assignment.description.trim()) {
      newErrors.description = "Description is required for assignments with submission";
    }
    
    if (assignment.points < 0) {
      newErrors.points = "Points must be a positive number";
    }

    if (assignment.assignmentType === "quiz") {
      if (assignment.quizSettings.passingScore < 0 || assignment.quizSettings.passingScore > 100) {
        newErrors.passingScore = "Passing score must be between 0 and 100";
      }
      
      if (assignment.quizSettings.timeLimit < 0) {
        newErrors.timeLimit = "Time limit cannot be negative";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const assignmentToSave = {
        ...assignment,
        id: currentAssignment?.id || `assignment-${Date.now()}`
      };
      
      onSave(assignmentToSave);
    }
  };

  const handleDelete = () => {
    if (isDeleting && currentAssignment?.id) {
      onDelete(currentAssignment.id);
    } else {
      setIsDeleting(true);
    }
  };

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            {currentAssignment ? "Edit Assignment" : "Add New Assignment"}
          </h3>
          <button 
            className={styles.btnClose} 
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {/* Assignment Type Selector */}
          <div className={styles.assignmentTypes}>
            <div className={styles.typeSelector}>
              <button
                type="button"
                className={`${styles.typeButton} ${assignment.assignmentType === 'standard' ? styles.active : ''}`}
                onClick={() => setAssignment(prev => ({ ...prev, assignmentType: 'standard' }))}
              >
                <Paperclip size={18} />
                <span>Standard Assignment</span>
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${assignment.assignmentType === 'quiz' ? styles.active : ''}`}
                onClick={() => setAssignment(prev => ({ ...prev, assignmentType: 'quiz' }))}
              >
                <FileQuestion size={18} />
                <span>Quiz</span>
              </button>
            </div>
          </div>

          {/* Basic Assignment Info */}
          <div className={styles.formRow}>
            <label htmlFor="title" className={styles.formLabel}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={assignment.title}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.title ? styles.inputError : ''}`}
              placeholder="Assignment Title"
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>
          
          <div className={styles.formRow}>
            <label htmlFor="description" className={styles.formLabel}>Description</label>
            <textarea
              id="description"
              name="description"
              value={assignment.description}
              onChange={handleChange}
              className={`${styles.formTextarea} ${errors.description ? styles.inputError : ''}`}
              placeholder="Describe what students need to do for this assignment..."
              rows={4}
            />
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}
          </div>
          
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <label htmlFor="dueDate" className={styles.formLabel}>Due Date</label>
              <div className={styles.dateInputWrapper}>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={assignment.dueDate}
                  onChange={handleChange}
                  className={styles.formInput}
                />
                <Calendar size={16} className={styles.dateIcon} />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <label htmlFor="points" className={styles.formLabel}>Points</label>
              <input
                type="number"
                id="points"
                name="points"
                value={assignment.points}
                onChange={handlePointsChange}
                className={`${styles.formInput} ${errors.points ? styles.inputError : ''}`}
                min="0"
              />
              {errors.points && <span className={styles.errorText}>{errors.points}</span>}
            </div>
          </div>
          
          {/* Quiz Settings */}
          {assignment.assignmentType === 'quiz' && (
            <div className={styles.quizSettings}>
              <h4 className={styles.sectionTitle}>Quiz Settings</h4>
              
              <div className={styles.formGrid}>
                <div className={styles.formRow}>
                  <label htmlFor="timeLimit" className={styles.formLabel}>
                    Time Limit (minutes, 0 for no limit)
                  </label>
                  <input
                    type="number"
                    id="timeLimit"
                    name="timeLimit"
                    value={assignment.quizSettings.timeLimit}
                    onChange={handleQuizSettingChange}
                    className={styles.formInput}
                    min="0"
                  />
                </div>
                
                <div className={styles.formRow}>
                  <label htmlFor="passingScore" className={styles.formLabel}>
                    Passing Score (%)
                  </label>
                  <input
                    type="number"
                    id="passingScore"
                    name="passingScore"
                    value={assignment.quizSettings.passingScore}
                    onChange={handleQuizSettingChange}
                    className={`${styles.formInput} ${errors.passingScore ? styles.inputError : ''}`}
                    min="0"
                    max="100"
                  />
                  {errors.passingScore && <span className={styles.errorText}>{errors.passingScore}</span>}
                </div>
              </div>
              
              <div className={styles.formCheckboxRow}>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="allowMultipleAttempts"
                    name="allowMultipleAttempts"
                    checked={assignment.quizSettings.allowMultipleAttempts}
                    onChange={handleQuizSettingChange}
                    className={styles.formCheckbox}
                  />
                  <label htmlFor="allowMultipleAttempts" className={styles.checkboxLabel}>
                    Allow Multiple Attempts
                  </label>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="shuffleQuestions"
                    name="shuffleQuestions"
                    checked={assignment.quizSettings.shuffleQuestions}
                    onChange={handleQuizSettingChange}
                    className={styles.formCheckbox}
                  />
                  <label htmlFor="shuffleQuestions" className={styles.checkboxLabel}>
                    Shuffle Questions
                  </label>
                </div>
              </div>
              
              <div className={styles.quizNotice}>
                <p>Note: After creating the quiz, you'll be able to add questions from the quiz editor.</p>
              </div>
            </div>
          )}
          
          {/* Standard Assignment Settings */}
          {assignment.assignmentType === 'standard' && (
            <>
              <div className={styles.formGrid}>
                <div className={styles.formRow}>
                  <label htmlFor="submissionType" className={styles.formLabel}>Submission Type</label>
                  <select
                    id="submissionType"
                    name="submissionType"
                    value={assignment.submissionType}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    <option value="text">Text Entry</option>
                    <option value="file">File Upload</option>
                    <option value="link">External URL</option>
                    <option value="none">No Submission (For Reading/Review)</option>
                  </select>
                </div>
                
                <div className={styles.formRow}>
                  <label htmlFor="status" className={styles.formLabel}>Status</label>
                  <select
                    id="status"
                    name="status"
                    value={assignment.status}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              
              {/* Assignment Attachments */}
              <div className={styles.attachmentsSection}>
                <h4 className={styles.sectionTitle}>Attachments</h4>
                
                {assignment.attachments && assignment.attachments.length > 0 ? (
                  <ul className={styles.attachmentsList}>
                    {assignment.attachments.map(attachment => (
                      <li key={attachment.id} className={styles.attachmentItem}>
                        <div className={styles.attachmentInfo}>
                          <Paperclip size={14} className={styles.attachmentIcon} />
                          <span className={styles.attachmentName}>{attachment.name}</span>
                          <span className={styles.attachmentUrl}>{attachment.url}</span>
                        </div>
                        <button 
                          type="button" 
                          className={styles.btnRemoveAttachment}
                          onClick={() => removeAttachment(attachment.id)}
                          aria-label="Remove attachment"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.noAttachments}>No attachments added yet.</p>
                )}
                
                <div className={styles.addAttachment}>
                  <div className={styles.attachmentInputs}>
                    <input
                      type="text"
                      name="name"
                      value={newAttachment.name}
                      onChange={handleAttachmentChange}
                      className={styles.formInput}
                      placeholder="Attachment name"
                    />
                    <input
                      type="url"
                      name="url"
                      value={newAttachment.url}
                      onChange={handleAttachmentChange}
                      className={styles.formInput}
                      placeholder="Attachment URL"
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.btnAddAttachment}
                    onClick={addAttachment}
                    disabled={!newAttachment.name || !newAttachment.url}
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </>
          )}
          
          <div className={styles.modalFooter}>
            <div className={styles.leftActions}>
              {currentAssignment && (
                isDeleting ? (
                  <div className={styles.deleteConfirmation}>
                    <span>Are you sure?</span>
                    <button 
                      type="button" 
                      className={styles.buttonConfirmDelete}
                      onClick={handleDelete}
                    >
                      Yes, Delete
                    </button>
                    <button 
                      type="button" 
                      className={styles.buttonCancelDelete}
                      onClick={cancelDelete}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    className={styles.buttonDelete} 
                    onClick={handleDelete}
                    aria-label="Delete assignment"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )
              )}
            </div>
            <div className={styles.rightActions}>
              <button 
                type="button" 
                className={styles.buttonSecondary} 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.buttonPrimary}
              >
                {currentAssignment ? "Save Changes" : "Add Assignment"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentModal;