import React, { useState, useRef, useEffect } from "react";
import { Plus, Save } from "lucide-react";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Module from "../../Module";
import LessonModal from "./LessonModal";
import AssignmentModal from "./AssignmentModal";
import styles from "../../../css/teacher/create/StructureBuilder.module.css";

const StructureBuilder = ({ initialData, onSave, isEditMode }) => {
  // Default structure if no initialData is provided
  const defaultModules = [
    {
      id: "module-1",
      title: "Introduction to the Course",
      description: "Overview of what to expect in this course",
      isOpen: true,
      lessons: [
        { 
          id: "lesson-1-1", 
          title: "Welcome & Course Overview", 
          type: "video",
          description: "A warm welcome and overview of what you'll learn",
          duration: "10 min",
          videoUrl: "https://example.com/videos/welcome",
          resources: [
            { name: "Course Syllabus", url: "https://example.com/syllabus.pdf" }
          ],
          resourceCount: 1
        },
        { 
          id: "lesson-1-2", 
          title: "How to Use This Platform", 
          type: "text",
          description: "Learn to navigate the platform effectively",
          duration: "5 min",
          content: "This platform offers various features to enhance your learning...",
          resources: [],
          resourceCount: 0
        },
      ],
      assignments: [
        {
          id: "assignment-1-1",
          title: "Introduction Assignment",
          description: "Tell us about yourself and your goals for this course",
          dueDate: "2025-05-10",
          points: 10,
          submissionType: "text",
          status: "published",
          resources: []
        }
      ]
    },
    {
      id: "module-2",
      title: "Getting Started",
      description: "Fundamental concepts and tools setup",
      isOpen: false,
      lessons: [
        { 
          id: "lesson-2-1", 
          title: "Installation Guide", 
          type: "text",
          description: "Step-by-step guide to install required software",
          duration: "15 min",
          content: "Follow these steps to set up your development environment...",
          resources: [
            { name: "Windows Setup Guide", url: "https://example.com/windows-setup.pdf" },
            { name: "Mac Setup Guide", url: "https://example.com/mac-setup.pdf" }
          ],
          resourceCount: 2
        },
        { 
          id: "lesson-2-2", 
          title: "First Steps", 
          type: "video",
          description: "Your first practical exercise",
          duration: "20 min",
          videoUrl: "https://example.com/videos/first-steps",
          resources: [],
          resourceCount: 0
        },
      ],
      assignments: [
        {
          id: "assignment-2-1",
          title: "Setup Verification",
          description: "Submit a screenshot of your development environment",
          dueDate: "2025-05-15",
          points: 15,
          submissionType: "file",
          status: "draft",
          resources: []
        }
      ]
    }
  ];

  const [modules, setModules] = useState([]);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const nextModuleId = useRef(1);
  const nextLessonIds = useRef({});
  const nextAssignmentIds = useRef({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Initialize with initialData or default structure
  useEffect(() => {
    let moduleData = [];
    
    if (initialData && Array.isArray(initialData)) {
      moduleData = initialData;
    } else if (!isEditMode) {
      // Only use default data for new courses
      moduleData = defaultModules;
    }
    
    // Ensure all modules have assignments array and all assignments have status
    moduleData = moduleData.map(module => ({
      ...module,
      assignments: (module.assignments || []).map(assignment => ({
        ...assignment,
        status: assignment.status || "draft"
      }))
    }));
    
    setModules(moduleData);
    
    // Set the next module ID reference
    if (moduleData.length > 0) {
      const maxModuleId = Math.max(...moduleData.map(m => {
        const idNum = parseInt(m.id.split('-')[1], 10);
        return isNaN(idNum) ? 0 : idNum;
      }));
      nextModuleId.current = maxModuleId + 1;
    }
    
    // Initialize nextLessonIds and nextAssignmentIds for existing modules
    const lessonIds = {};
    const assignmentIds = {};
    moduleData.forEach(module => {
      const moduleIdNum = module.id.split('-')[1];
      
      // Process lessons
      const maxLessonId = Math.max(...module.lessons.map(l => {
        const lessonParts = l.id.split('-');
        const idNum = parseInt(lessonParts[2], 10);
        return isNaN(idNum) ? 0 : idNum;
      }), 0);
      lessonIds[module.id] = maxLessonId + 1;
      
      // Process assignments
      const maxAssignmentId = Math.max(...(module.assignments || []).map(a => {
        const assignmentParts = a.id.split('-');
        const idNum = parseInt(assignmentParts[2], 10);
        return isNaN(idNum) ? 0 : idNum;
      }), 0);
      assignmentIds[module.id] = maxAssignmentId + 1;
    });
    
    nextLessonIds.current = lessonIds;
    nextAssignmentIds.current = assignmentIds;
    
    setHasUnsavedChanges(false);
  }, [initialData, isEditMode]);

  // Mark changes as unsaved when modules change
  useEffect(() => {
    if (modules.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, [modules]);

  const toggleModule = (moduleId) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, isOpen: !module.isOpen } 
        : module
    ));
  };

  const addNewModule = () => {
    const newModuleId = `module-${nextModuleId.current}`;
    nextModuleId.current += 1;
    nextLessonIds.current[newModuleId] = 1;
    nextAssignmentIds.current[newModuleId] = 1;
    
    const newModule = {
      id: newModuleId,
      title: "New Module",
      description: "Module description",
      isOpen: true,
      lessons: [],
      assignments: []
    };
    
    setModules([...modules, newModule]);
  };

  const deleteModule = (moduleId) => {
    // Add confirmation before deleting
    if (window.confirm("Are you sure you want to delete this module? All lessons and assignments within it will be deleted as well.")) {
      setModules(modules.filter(module => module.id !== moduleId));
    }
  };

  const editModule = (moduleId, field, value) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, [field]: value } 
        : module
    ));
  };

  // Lesson management
  const addLesson = (moduleId) => {
    setCurrentLesson(null);
    setCurrentModuleId(moduleId);
    setIsLessonModalOpen(true);
  };

  const editLesson = (lesson, moduleId) => {
    setCurrentLesson({ ...lesson });
    setCurrentModuleId(moduleId);
    setIsLessonModalOpen(true);
  };

  const deleteLesson = (lessonId, moduleId) => {
    // Add confirmation before deleting
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setModules(modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              lessons: module.lessons.filter(lesson => lesson.id !== lessonId) 
            } 
          : module
      ));
    }
  };

  const saveLesson = (lessonData) => {
    // Create a copy of modules to update
    const updatedModules = [...modules];
    
    // Find the current module
    const moduleIndex = updatedModules.findIndex(m => m.id === currentModuleId);
    
    if (moduleIndex !== -1) {
      const module = updatedModules[moduleIndex];
      
      if (!currentLesson) {
        // Adding a new lesson
        const newLessonId = `lesson-${currentModuleId.split('-')[1]}-${nextLessonIds.current[currentModuleId]}`;
        nextLessonIds.current[currentModuleId] += 1;
        
        // Add the new lesson with an ID
        module.lessons.push({
          ...lessonData,
          id: newLessonId,
          resourceCount: lessonData.resources ? lessonData.resources.length : 0
        });
      } else {
        // Editing an existing lesson
        const lessonIndex = module.lessons.findIndex(l => l.id === currentLesson.id);
        if (lessonIndex !== -1) {
          // Update existing lesson
          module.lessons[lessonIndex] = {
            ...lessonData,
            id: currentLesson.id,
            resourceCount: lessonData.resources ? lessonData.resources.length : 0
          };
        }
      }
      
      // Update the state with the modified modules
      setModules(updatedModules);
    }
    
    // Reset and close the modal
    setCurrentLesson(null);
    setCurrentModuleId(null);
    setIsLessonModalOpen(false);
  };

  // Assignment management
  const addAssignment = (moduleId) => {
    setCurrentAssignment(null);
    setCurrentModuleId(moduleId);
    setIsAssignmentModalOpen(true);
  };

  const editAssignment = (assignment, moduleId) => {
    setCurrentAssignment({ ...assignment });
    setCurrentModuleId(moduleId);
    setIsAssignmentModalOpen(true);
  };

  const deleteAssignment = (assignmentId, moduleId) => {
    // Add confirmation before deleting
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setModules(modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              assignments: module.assignments.filter(assignment => assignment.id !== assignmentId) 
            } 
          : module
      ));
    }
  };

  const saveAssignment = (assignmentData) => {
    // Create a copy of modules to update
    const updatedModules = [...modules];
    
    // Find the current module
    const moduleIndex = updatedModules.findIndex(m => m.id === currentModuleId);
    
    if (moduleIndex !== -1) {
      const module = updatedModules[moduleIndex];
      
      if (!currentAssignment) {
        // Adding a new assignment
        const newAssignmentId = `assignment-${currentModuleId.split('-')[1]}-${nextAssignmentIds.current[currentModuleId]}`;
        nextAssignmentIds.current[currentModuleId] += 1;
        
        // Add the new assignment with a generated ID and ensure status field exists
        module.assignments.push({
          ...assignmentData,
          id: newAssignmentId,
          status: assignmentData.status || "draft"
        });
      } else {
        // Editing an existing assignment
        const assignmentIndex = module.assignments.findIndex(a => a.id === currentAssignment.id);
        if (assignmentIndex !== -1) {
          // Update existing assignment
          module.assignments[assignmentIndex] = {
            ...assignmentData,
            id: currentAssignment.id,
            status: assignmentData.status || currentAssignment.status || "draft"
          };
        }
      }
      
      // Update the state with the modified modules
      setModules(updatedModules);
    }
    
    // Reset and close the modal
    setCurrentAssignment(null);
    setCurrentModuleId(null);
    setIsAssignmentModalOpen(false);
  };

  const handleDragEnd = (result) => {
    const { destination, source, type } = result;

    // If dropped outside a droppable area or at the same spot
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Handle module reordering
    if (type === 'MODULE') {
      const reorderedModules = Array.from(modules);
      const [removed] = reorderedModules.splice(source.index, 1);
      reorderedModules.splice(destination.index, 0, removed);
      setModules(reorderedModules);
      return;
    }

    // Handle lesson reordering
    if (type === 'LESSON') {
      // Extract module IDs from the droppable IDs
      const sourceModuleId = source.droppableId.split('-lessons')[0];
      const destModuleId = destination.droppableId.split('-lessons')[0];
      
      // Create a new modules array to avoid direct state mutation
      const newModules = [...modules];
      
      // Find the source and destination modules
      const sourceModule = newModules.find(m => m.id === sourceModuleId);
      const destModule = newModules.find(m => m.id === destModuleId);
      
      if (sourceModule && destModule) {
        // Copy the lessons arrays
        const sourceLessons = [...sourceModule.lessons];
        const destLessons = sourceModuleId === destModuleId ? 
          sourceLessons : [...destModule.lessons];
        
        // Remove the lesson from source and add to destination
        const [movedLesson] = sourceLessons.splice(source.index, 1);
        
        if (sourceModuleId === destModuleId) {
          // If within the same module
          sourceLessons.splice(destination.index, 0, movedLesson);
          sourceModule.lessons = sourceLessons;
        } else {
          // If between different modules
          destLessons.splice(destination.index, 0, movedLesson);
          sourceModule.lessons = sourceLessons;
          destModule.lessons = destLessons;
        }
        
        setModules(newModules);
      }
    }
    
    // Handle assignment reordering
    if (type === 'ASSIGNMENT') {
      // Extract module IDs from the droppable IDs
      const sourceModuleId = source.droppableId.split('-assignments')[0];
      const destModuleId = destination.droppableId.split('-assignments')[0];
      
      // Create a new modules array to avoid direct state mutation
      const newModules = [...modules];
      
      // Find the source and destination modules
      const sourceModule = newModules.find(m => m.id === sourceModuleId);
      const destModule = newModules.find(m => m.id === destModuleId);
      
      if (sourceModule && destModule) {
        // Copy the assignments arrays
        const sourceAssignments = [...sourceModule.assignments];
        const destAssignments = sourceModuleId === destModuleId ? 
          sourceAssignments : [...destModule.assignments];
        
        // Remove the assignment from source and add to destination
        const [movedAssignment] = sourceAssignments.splice(source.index, 1);
        
        if (sourceModuleId === destModuleId) {
          // If within the same module
          sourceAssignments.splice(destination.index, 0, movedAssignment);
          sourceModule.assignments = sourceAssignments;
        } else {
          // If between different modules
          destAssignments.splice(destination.index, 0, movedAssignment);
          sourceModule.assignments = sourceAssignments;
          destModule.assignments = destAssignments;
        }
        
        setModules(newModules);
      }
    }
  };

  const handleSaveStructure = () => {
    if (onSave) {
      // Call the parent onSave function with current modules
      onSave(modules);
      setHasUnsavedChanges(false);
    }
  };
 return (
  <div className={styles.structureBuilder}>
    <div className={styles.structureHeader}>
      <div className={styles.structureHeaderText}>
        <h2 className={styles.structureTitle}>Course Structure</h2>
        <p className={styles.structureSubtitle}>Build your course by adding modules, lessons, and assignments</p>
      </div>
      
      {isEditMode && (
        <button
          className={`${styles.button} ${styles.saveStructureBtn} ${styles.buttonPrimary}`}
          onClick={handleSaveStructure}
          disabled={!hasUnsavedChanges}
        >
          <Save size={16} />
          Save Structure
        </button>
      )}
    </div>
    
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="modules" type="MODULE">
        {(provided) => (
          <div
            className={styles.structureContent}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {modules.length === 0 ? (
              <div className={styles.emptyState}>
                No modules yet. Add your first module to get started.
              </div>
            ) : (
              modules.map((module, moduleIndex) => (
                <Module
                  key={module.id}
                  module={module}
                  moduleIndex={moduleIndex}
                  onToggleModule={toggleModule}
                  onEditModule={editModule}
                  onDeleteModule={deleteModule}
                  onAddLesson={addLesson}
                  onEditLesson={editLesson}
                  onDeleteLesson={deleteLesson}
                  onAddAssignment={addAssignment}
                  onEditAssignment={editAssignment}
                  onDeleteAssignment={deleteAssignment}
                />
              ))
            )}
            {provided.placeholder}
            
            <button
              onClick={addNewModule}
              className={styles.btnAddModule}
            >
              <Plus className="icon-plus" size={18} />
              Add New Module
            </button>
            
            {!isEditMode && (
              <div className={styles.structureActions}>
                <button
                  className={`${styles.button} ${styles.buttonPrimary} ${styles.nextStepBtn}`}
                  onClick={() => {
                    if (onSave) {
                      onSave(modules);
                    }
                  }}
                >
                  Continue to Resources
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    
    {isLessonModalOpen && (
      <LessonModal
        currentLesson={currentLesson}
        onSave={saveLesson}
        onClose={() => setIsLessonModalOpen(false)}
      />
    )}
    
    {isAssignmentModalOpen && (
      <AssignmentModal
        currentAssignment={currentAssignment}
        onSave={saveAssignment}
        onClose={() => setIsAssignmentModalOpen(false)}
      />
    )}
  </div>
);
};

export default StructureBuilder;