import React from "react";
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, GripVertical } from "lucide-react";
import { Draggable, Droppable } from '@hello-pangea/dnd';
import Lesson from "./Lesson"; 

const Module = ({ 
  module, 
  moduleIndex, 
  onToggleModule, 
  onEditModule, 
  onDeleteModule, 
  onAddLesson, 
  onEditLesson, 
  onDeleteLesson 
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
            <div className="lessons-container">
              <Droppable
                droppableId={module.id}
                type="LESSON"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="lessons-list"
                  >
                    {module.lessons.map((lesson, lessonIndex) => (
                      <Lesson 
                        key={lesson.id}
                        lesson={lesson}
                        lessonIndex={lessonIndex}
                        moduleId={module.id}
                        onEditLesson={onEditLesson}
                        onDeleteLesson={onDeleteLesson}
                      />
                    ))}
                    {provided.placeholder}
                    
                    <button
                      onClick={() => onAddLesson(module.id)}
                      className="btn-add-lesson"
                    >
                      <Plus size={16} className="icon-plus" />
                      Add Lesson
                    </button>
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Module;