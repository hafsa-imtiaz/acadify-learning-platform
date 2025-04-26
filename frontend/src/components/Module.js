import React from "react";
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, GripVertical, AlignLeft, AlertTriangle } from "lucide-react";
import { Draggable, Droppable } from '@hello-pangea/dnd';
import Lesson from "./Lesson";
import Assignment from "./Assignment";
import styles from "../css/teacher/create/Module.module.css"

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
          className={styles.moduleItem}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={styles.moduleHeader}>
            <div
              className={styles.dragHandle}
              {...provided.dragHandleProps}
            >
              <GripVertical size={18} />
            </div>
            
            <button 
              onClick={() => onToggleModule(module.id)}
              className={styles.toggleButton}
            >
              {module.isOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
            
            <div className={styles.moduleInfo}>
              <input
                type="text"
                value={module.title}
                onChange={(e) => onEditModule(module.id, 'title', e.target.value)}
                className={styles.moduleTitleInput}
                placeholder="Module Title"
              />
              <input
                type="text"
                value={module.description}
                onChange={(e) => onEditModule(module.id, 'description', e.target.value)}
                className={styles.moduleDescriptionInput}
                placeholder="Module Description"
              />
            </div>
            
            <div className={styles.moduleMeta}>
              <div className={styles.moduleCount}>
                <span className={styles.countItem}>
                  <AlignLeft size={14} />
                  {module.lessons.length} Lesson{module.lessons.length !== 1 ? 's' : ''}
                </span>
                <span className={styles.countItem}>
                  <AlertTriangle size={14} />
                  {module.assignments.length} Assignment{module.assignments.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <div className={styles.moduleActions}>
              <button 
                onClick={() => onDeleteModule(module.id)}
                className={styles.btnIconDelete}
                aria-label="Delete module"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {module.isOpen && (
            <div className={styles.moduleContent}>
              {/* Lessons Section */}
              <div className={styles.contentSection}>
                <div className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>Lessons</h4>
                  <button 
                    onClick={() => onAddLesson(module.id)}
                    className={styles.btnAddItem}
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
                      className={styles.lessonsList}
                    >
                      {module.lessons.length === 0 ? (
                        <div className={styles.emptyListMessage}>
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
              <div className={styles.contentSection}>
                <div className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>Assignments</h4>
                  <button 
                    onClick={() => onAddAssignment(module.id)}
                    className={styles.btnAddItem}
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
                      className={styles.assignmentsList}
                    >
                      {module.assignments.length === 0 ? (
                        <div className={styles.emptyListMessage}>
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