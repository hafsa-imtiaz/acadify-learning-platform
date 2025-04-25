import React from "react";
import { Edit2, Trash2, GripVertical, Video, FileText, Paperclip, Clock } from "lucide-react";
import { Draggable } from '@hello-pangea/dnd';

const Lesson = ({ lesson, lessonIndex, moduleId, onEditLesson, onDeleteLesson }) => {
  const getLessonTypeIcon = (lessonType) => {
    switch (lessonType) {
      case 'video':
        return <Video size={14} className="lesson-type-icon" />;
      case 'text':
        return <FileText size={14} className="lesson-type-icon" />;
      case 'attachment':
        return <Paperclip size={14} className="lesson-type-icon" />;
      default:
        return <FileText size={14} className="lesson-type-icon" />;
    }
  };

  return (
    <Draggable
      draggableId={lesson.id}
      index={lessonIndex}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="lesson-item"
        >
          <div 
            className="lesson-drag-handle"
            {...provided.dragHandleProps}
          >
            <GripVertical size={16} />
          </div>
          
          <div className="lesson-info">
            <div className="lesson-header">
              {getLessonTypeIcon(lesson.type)}
              <div className="lesson-title">{lesson.title}</div>
            </div>
            
            {lesson.description && (
              <div className="lesson-description">{lesson.description}</div>
            )}
            
            <div className="lesson-metadata">
              {lesson.duration && (
                <div className="lesson-duration">
                  <Clock size={12} />
                  <span>{lesson.duration}</span>
                </div>
              )}
              
              {lesson.resourceCount > 0 && (
                <div className="lesson-resources">
                  <Paperclip size={12} />
                  <span>{lesson.resourceCount} resource{lesson.resourceCount !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="lesson-actions">
            <button
              onClick={() => onEditLesson(lesson, moduleId)}
              className="btn-icon-edit"
              aria-label="Edit lesson"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onDeleteLesson(lesson.id, moduleId)}
              className="btn-icon-delete"
              aria-label="Delete lesson"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Lesson;