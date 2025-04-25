import React, { useState } from 'react';
import CourseSummaryCard from '../../components/teacher/TeacherDashboard/CourseSummaryCard';
import PerformanceAnalytics from '../../components/teacher/TeacherDashboard/PerformanceAnalytics';
import UpcomingItems from '../../components/teacher/TeacherDashboard/UpcomingItems';
import ActivityFeed from '../../components/teacher/TeacherDashboard/ActivityFeed';
import QuickActions from '../../components/teacher/TeacherDashboard/QuickActions';
import Sidebar from '../../components/teacher/sidebar';
import { Bell, ChevronDown, Search, Settings } from 'lucide-react';
import '../../css/teacher/TeacherDashboard.css';

const TeacherDashboard = () => {
  
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default TeacherCourses;