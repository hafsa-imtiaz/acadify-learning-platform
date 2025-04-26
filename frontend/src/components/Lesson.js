import React from "react";
import { Edit2, Trash2, GripVertical, Video, FileText, Paperclip, Clock } from "lucide-react";
import { Draggable } from '@hello-pangea/dnd';
import styles from '../css/teacher/lesson.module.css';

const Lesson = ({ lesson, lessonIndex, moduleId, onEditLesson, onDeleteLesson }) => {
  const getLessonTypeIcon = (lessonType) => {
    switch (lessonType) {
      case 'video':
        return <Video size={14} className={styles.lessonTypeIcon} />;
      case 'text':
        return <FileText size={14} className={styles.lessonTypeIcon} />;
      case 'attachment':
        return <Paperclip size={14} className={styles.lessonTypeIcon} />;
      default:
        return <FileText size={14} className={styles.lessonTypeIcon} />;
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
          className={styles.lessonItem}
        >
          <div 
            className={styles.lessonDragHandle}
            {...provided.dragHandleProps}
          >
            <GripVertical size={16} />
          </div>
          
          <div className={styles.lessonInfo}>
            <div className={styles.lessonHeader}>
              {getLessonTypeIcon(lesson.type)}
              <div className={styles.lessonTitle}>{lesson.title}</div>
            </div>
            
            {lesson.description && (
              <div className={styles.lessonDescription}>{lesson.description}</div>
            )}
            
            <div className={styles.lessonMetadata}>
              {lesson.duration && (
                <div className={styles.lessonDuration}>
                  <Clock size={12} />
                  <span>{lesson.duration}</span>
                </div>
              )}
              
              {lesson.resourceCount > 0 && (
                <div className={styles.lessonResources}>
                  <Paperclip size={12} />
                  <span>{lesson.resourceCount} resource{lesson.resourceCount !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.lessonActions}>
            <button
              onClick={() => onEditLesson(lesson, moduleId)}
              className={styles.btnIconEdit}
              aria-label="Edit lesson"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onDeleteLesson(lesson.id, moduleId)}
              className={styles.btnIconDelete}
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