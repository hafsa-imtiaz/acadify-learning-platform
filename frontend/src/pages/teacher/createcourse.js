import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import CourseBasicInfoForm from "../../components/teacher/create/BasicInfoForm";
import StructureBuilder from "../../components/teacher/create/CourseStructureBuilder";
import CourseResourcesUploader from "../../components/teacher/create/CourseResourcesUploader";
import CourseSettings from "../../components/teacher/create/CourseSettings";
import PublishPreview from "../../components/teacher/create/PublishPreview";
import TeacherLayout from '../../components/teacher/sidebar';
import "../../css/teacher/create/createcourse.css";

const TABS = [
  "Basic Info",
  "Structure",
  "Resources",
  "Settings",
  "Preview & Publish"
];

const CreateEditCourse = () => {
  const { courseId } = useParams(); // Get courseId from URL parameters
  const location = useLocation();
  const isEditMode = !!courseId; // If courseId exists, we're in edit mode
  
  const [activeTab, setActiveTab] = useState(0);
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(isEditMode);

  // Fetch course data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      // Replace with your actual API call
      /*
      fetchCourseData(courseId)
        .then(data => {
          setCourseData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch course data:", error);
          setIsLoading(false);
        });
        */
        setIsLoading(false);
    }
  }, [courseId, isEditMode]);

  // Mock function - replace with your actual API call
  const fetchCourseData = async (id) => {
    // Replace with your actual API endpoint
    const response = await fetch(`/api/courses/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch course data');
    }
    return await response.json();
  };

  const handleSave = (formData) => {
    if (isEditMode) {
      // Update existing course
      // Replace with your actual API call
      updateCourse(courseId, formData);
    } else {
      // Create new course
      // Replace with your actual API call
      createCourse(formData);
    }
  };

  // Mock functions - replace with your actual API calls
  const updateCourse = async (id, data) => {
    // Implementation here
  };

  const createCourse = async (data) => {
    // Implementation here
  };

  const renderTabContent = () => {
    if (isLoading) {
      return <div className="loading">Loading course data...</div>;
    }

    switch (activeTab) {
      case 0:
        return <CourseBasicInfoForm initialData={courseData} onSave={handleSave} isEditMode={isEditMode} />;
      case 1:
        return <StructureBuilder initialData={courseData?.structure} onSave={handleSave} isEditMode={isEditMode} />;
      case 2:
        return <CourseResourcesUploader initialData={courseData?.resources} onSave={handleSave} isEditMode={isEditMode} />;
      case 3:
        return <CourseSettings initialData={courseData?.settings} onSave={handleSave} isEditMode={isEditMode} />;
      case 4:
        return <PublishPreview courseData={courseData} onPublish={handleSave} isEditMode={isEditMode} />;
      default:
        return null;
    }
  };

  const pageTitle = isEditMode ? "Edit Course" : "Create a New Course";

  return (
    <TeacherLayout>
      <div className="create-course-container">
        <h2 className="page-title">{pageTitle}</h2>
        <div className="tabs">
          {TABS.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </TeacherLayout>
  );
};

export default CreateEditCourse;