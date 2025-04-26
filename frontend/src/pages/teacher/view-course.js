import React, { useState } from "react";
import { Book, Layers, FileText, Users, BarChart2, Settings } from "lucide-react";

// Import components
import Overview from "../../components/teacher/view/Overview";
import CourseContent from "../../components/teacher/view/CourseContent";
import DiscussionForum from "../../components/teacher/view/DiscussionForum";
import Students from "../../components/teacher/view/Students";
import AnalyticsAndFeedback from "../../components/teacher/view/AnalyticsAndFeedback";
import SettingsTab from "../../components/teacher/view/SettingsTab";
import TeacherLayout from '../../components/teacher/sidebar';
import '../../css/teacher/view/view-course.css';

const ViewCourse = () => {
  const [activeTab, setActiveTab] = useState(0);

  const TABS = [
    { name: "Overview", icon: Book },
    { name: "Modules", icon: Layers },
    { name: "Discussion Forum", icon: FileText },
    { name: "Students", icon: Users },
    { name: "Analytics", icon: BarChart2 },
    //{ name: "Settings", icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Overview />;
      case 1:
        return <CourseContent />;
      case 2:
        return <DiscussionForum />;
      case 3:
        return <Students />;
      case 4:
        return <AnalyticsAndFeedback />;
      case 5:
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <TeacherLayout>
      <div className="view-course-container">
        <div className="content-wrapper">
          <div className="course-header">
            <h1 className="course-title">Advanced Web Development with React</h1>
            <div className="action-buttons">
              <button className="btn btn-outline">
                Preview
              </button>
              <button className="btn btn-primary">
                Publish
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tabs-container">
            <nav className="tabs-nav">
              {TABS.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={index}
                    className={`tab-button ${activeTab === index ? "active" : ""}`}
                    onClick={() => setActiveTab(index)}
                  >
                    <Icon className="tab-button-icon" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default ViewCourse;