import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Module from "../../Module";
import LessonModal from "./LessonModal";
import "../../../css/teacher/create/StructureBuilder.css";

const StructureBuilder = () => {
  const [modules, setModules] = useState([
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
      ]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const nextModuleId = useRef(modules.length + 1);
  const nextLessonIds = useRef({});
  
  // Initialize nextLessonIds for existing modules
  modules.forEach(module => {
    if (!nextLessonIds.current[module.id]) {
      nextLessonIds.current[module.id] = module.lessons.length + 1;
    }
  });

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
    
    const newModule = {
      id: newModuleId,
      title: "New Module",
      description: "Module description",
      isOpen: true,
      lessons: []
    };
    
    setModules([...modules, newModule]);
  };

  const deleteModule = (moduleId) => {
    // Add confirmation before deleting
    if (window.confirm("Are you sure you want to delete this module? All lessons within it will be deleted as well.")) {
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

  const addLesson = (moduleId) => {
    setCurrentLesson(null);
    setCurrentModuleId(moduleId);
    setIsModalOpen(true);
  };

  const editLesson = (lesson, moduleId) => {
    setCurrentLesson({ ...lesson });
    setCurrentModuleId(moduleId);
    setIsModalOpen(true);
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
    setIsModalOpen(false);
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
      const sourceModuleId = source.droppableId;
      const destModuleId = destination.droppableId;
      
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
  };

  return (
    <div className="structure-builder">
      <div className="structure-header">
        <h2 className="structure-title">Course Structure</h2>
        <p className="structure-subtitle">Build your course by adding modules and lessons</p>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="modules" type="MODULE">
          {(provided) => (
            <div 
              className="structure-content" 
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {modules.length === 0 ? (
                <div className="empty-state">
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
                  />
                ))
              )}
              {provided.placeholder}
              
              <button
                onClick={addNewModule}
                className="btn-add-module"
              >
                <Plus className="icon-plus" size={20} />
                Add New Module
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {isModalOpen && (
        <LessonModal 
          currentLesson={currentLesson}
          onSave={saveLesson}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default StructureBuilder;