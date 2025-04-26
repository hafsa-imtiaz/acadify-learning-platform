import React from "react";
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, GripVertical, AlignLeft, AlertTriangle } from "lucide-react";
import { Draggable, Droppable } from '@hello-pangea/dnd';
import Lesson from "./Lesson";
import Assignment from "./Assignment";

const Module = ({
  module,
  moduleIndex,
  onToggleModule,
  onEditModule,
  onDeleteModule,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onAddAssignment,
  onEditAssignment,
  onDeleteAssignment
}) => {
  return (
    <Draggable
      key={module.id}
      draggableId={module.id}
      index={moduleIndex}
    >
      {(provided) => (
        <div 
          className="module-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="module-header">
            <div
              className="drag-handle"
              {...provided.dragHandleProps}
            >
              <GripVertical size={18} />
            </div>
            
            <button 
              onClick={() => onToggleModule(module.id)}
              className="toggle-button"
            >
              {module.isOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
            
            <div className="module-info">
              <input
                type="text"
                value={module.title}
                onChange={(e) => onEditModule(module.id, 'title', e.target.value)}
                className="module-title-input"
                placeholder="Module Title"
              />
              <input
                type="text"
                value={module.description}
                onChange={(e) => onEditModule(module.id, 'description', e.target.value)}
                className="module-description-input"
                placeholder="Module Description"
              />
            </div>
            
            <div className="module-meta">
              <div className="module-count">
                <span className="count-item">
                  <AlignLeft size={14} />
                  {module.lessons.length} Lesson{module.lessons.length !== 1 ? 's' : ''}
                </span>
                <span className="count-item">
                  <AlertTriangle size={14} />
                  {module.assignments.length} Assignment{module.assignments.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <div className="module-actions">
              <button 
                onClick={() => onDeleteModule(module.id)}
                className="btn-icon-delete"
                aria-label="Delete module"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {module.isOpen && (
            <div className="module-content">
              {/* Lessons Section */}
              <div className="content-section">
                <div className="section-header">
                  <h4 className="section-title">Lessons</h4>
                  <button 
                    onClick={() => onAddLesson(module.id)}
                    className="btn-add-item"
                  >
                    <Plus size={14} />
                    Add Lesson
                  </button>
                </div>
                
                <Droppable
                  droppableId={`${module.id}-lessons`}
                  type="LESSON"
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="lessons-list"
                    >
                      {module.lessons.length === 0 ? (
                        <div className="empty-list-message">
                          No lessons added yet. Click "Add Lesson" to create your first lesson.
                        </div>
                      ) : (
                        module.lessons.map((lesson, lessonIndex) => (
                          <Lesson
                            key={lesson.id}
                            lesson={lesson}
                            lessonIndex={lessonIndex}
                            moduleId={module.id}
                            onEditLesson={onEditLesson}
                            onDeleteLesson={onDeleteLesson}
                          />
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              
              {/* Assignments Section */}
              <div className="content-section">
                <div className="section-header">
                  <h4 className="section-title">Assignments</h4>
                  <button 
                    onClick={() => onAddAssignment(module.id)}
                    className="btn-add-item"
                  >
                    <Plus size={14} />
                    Add Assignment
                  </button>
                </div>
                
                <Droppable
                  droppableId={`${module.id}-assignments`}
                  type="ASSIGNMENT"
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="assignments-list"
                    >
                      {module.assignments.length === 0 ? (
                        <div className="empty-list-message">
                          No assignments added yet. Click "Add Assignment" to create your first assignment.
                        </div>
                      ) : (
                        module.assignments.map((assignment, assignmentIndex) => (
                          <Assignment
                            key={assignment.id}
                            assignment={assignment}
                            assignmentIndex={assignmentIndex}
                            moduleId={module.id}
                            onEditAssignment={onEditAssignment}
                            onDeleteAssignment={onDeleteAssignment}
                          />
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Module;