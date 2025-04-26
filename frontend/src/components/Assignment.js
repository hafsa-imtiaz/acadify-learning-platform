import React from "react";
import { Edit2, Trash2, GripVertical, Calendar, Award, AlertTriangle } from "lucide-react";
import { Draggable } from '@hello-pangea/dnd';

const Assignment = ({ assignment, assignmentIndex, moduleId, onEditAssignment, onDeleteAssignment }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="status-badge status-published">Published</span>;
      case 'draft':
        return <span className="status-badge status-draft">Draft</span>;
      case 'scheduled':
        return <span className="status-badge status-scheduled">Scheduled</span>;
      default:
        return <span className="status-badge status-draft">Draft</span>;
    }
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
          className="assignment-item"
        >
          <div 
            className="assignment-drag-handle"
            {...provided.dragHandleProps}
          >
            <GripVertical size={16} />
          </div>
          
          <div className="assignment-info">
            <div className="assignment-header">
              <AlertTriangle size={14} className="assignment-type-icon" />
              <div className="assignment-title">{assignment.title}</div>
              {getStatusBadge(assignment.status)}
            </div>
            
            {assignment.description && (
              <div className="assignment-description">{assignment.description}</div>
            )}
            
            <div className="assignment-metadata">
              {assignment.dueDate && (
                <div className="assignment-due-date">
                  <Calendar size={12} />
                  <span>Due: {assignment.dueDate}</span>
                </div>
              )}
              
              {assignment.points > 0 && (
                <div className="assignment-points">
                  <Award size={12} />
                  <span>{assignment.points} point{assignment.points !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="assignment-actions">
            <button
              onClick={() => onEditAssignment(assignment, moduleId)}
              className="btn-icon-edit"
              aria-label="Edit assignment"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onDeleteAssignment(assignment.id, moduleId)}
              className="btn-icon-delete"
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