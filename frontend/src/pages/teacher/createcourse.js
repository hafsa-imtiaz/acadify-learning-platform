import React, { useState } from "react";
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

const CreateCourse = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <CourseBasicInfoForm />;
      case 1:
        return <StructureBuilder />
      case 2:
        return <CourseResourcesUploader />
      case 3:
        return <CourseSettings />
      case 4:
        return <PublishPreview />
      default:
        return null;
    }
  };

  return (
    <TeacherLayout>
    <div className="create-course-container">
      <h2 className="page-title">Create a New Course</h2>
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

export default CreateCourse;
