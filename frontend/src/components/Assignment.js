import React from "react";
import { Edit2, Trash2, GripVertical, Calendar, Award, Clock, FileQuestion, Paperclip } from "lucide-react";
import { Draggable } from '@hello-pangea/dnd';
import styles from "../css/teacher/assignment.module.css";

const Assignment = ({ assignment, assignmentIndex, moduleId, onEditAssignment, onDeleteAssignment }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className={`${styles["status-badge"]} ${styles["status-published"]}`}>Published</span>;
      case 'draft':
        return <span className={`${styles["status-badge"]} ${styles["status-draft"]}`}>Draft</span>;
      case 'scheduled':
        return <span className={`${styles["status-badge"]} ${styles["status-scheduled"]}`}>Scheduled</span>;
      default:
        return <span className={`${styles["status-badge"]} ${styles["status-draft"]}`}>Draft</span>;
    }
  };

  const getAssignmentTypeIcon = (type) => {
    if (type === 'quiz') {
      return <FileQuestion size={14} className={`${styles["assignment-type-icon"]} ${styles.quiz}`} />;
    }
    return <Paperclip size={14} className={`${styles["assignment-type-icon"]} ${styles.standard}`} />;
  };

  return (
    <Draggable
      draggableId={assignment.id}
      index={assignmentIndex}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={styles["assignment-item"]}
        >
          <div 
            className={styles["assignment-drag-handle"]}
            {...provided.dragHandleProps}
          >
            <GripVertical size={16} />
          </div>
          
          <div className={styles["assignment-info"]}>
            <div className={styles["assignment-header"]}>
              {getAssignmentTypeIcon(assignment.assignmentType)}
              <div className={styles["assignment-title"]}>
                {assignment.title}
                {assignment.assignmentType === 'quiz' && 
                  <span className={styles["quiz-badge"]}>Quiz</span>
                }
              </div>
              {getStatusBadge(assignment.status)}
            </div>
            
            {assignment.description && (
              <div className={styles["assignment-description"]}>{assignment.description}</div>
            )}
            
            <div className={styles["assignment-metadata"]}>
              {assignment.dueDate && (
                <div className={styles["assignment-due-date"]}>
                  <Calendar size={12} />
                  <span>Due: {assignment.dueDate}</span>
                </div>
              )}
              
              {assignment.points > 0 && (
                <div className={styles["assignment-points"]}>
                  <Award size={12} />
                  <span>{assignment.points} point{assignment.points !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
            
            {/* Quiz-specific metadata */}
            {assignment.assignmentType === 'quiz' && assignment.quizSettings && (
              <div className={styles["assignment-quiz-info"]}>
                {assignment.quizSettings.timeLimit > 0 && (
                  <div className={styles["assignment-quiz-stat"]}>
                    <Clock size={12} />
                    <span>{assignment.quizSettings.timeLimit} min</span>
                  </div>
                )}
                <div className={styles["assignment-quiz-stat"]}>
                  <span>Pass: {assignment.quizSettings.passingScore}%</span>
                </div>
                {assignment.quizSettings.allowMultipleAttempts && (
                  <div className={styles["assignment-quiz-stat"]}>
                    <span>Multiple attempts</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className={styles["assignment-actions"]}>
            <button
              onClick={() => onEditAssignment(assignment, moduleId)}
              className={styles["btn-icon-edit"]}
              aria-label="Edit assignment"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onDeleteAssignment(assignment.id, moduleId)}
              className={styles["btn-icon-delete"]}
              aria-label="Delete assignment"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Assignment;