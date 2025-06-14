import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Sign-Up/Register';
import RegisterStudent from './pages/Sign-Up/RegisterStudent';
import RegisterTeacher from './pages/Sign-Up/RegisterTeacher';
import BrowseCourses from './pages/Home/BrowseCourses';
import CoursePreview from './pages/CoursePreview';
import AboutSection from './pages/Home/AboutSection';
// teacher
import TeacherDashboard from './pages/teacher/dashboard';
import TeacherCourses from './pages/teacher/MyCourses';
import TeacherCalender from './pages/teacher/MyCalendar';
import CreateEditCourse from './pages/teacher/createcourse';
import ViewCourse from './pages/teacher/view-course';
import HelpCenter from './pages/teacher/HelpCenter';
import TeacherNotifications from './pages/teacher/Notifications';
import TeacherAnalytics from './pages/teacher/Instructor-Analytics';
import TeacherReports from './pages/teacher/Instructor-Reports';
import TeacherProfile from './pages/teacher/teacher-profile'
import ScrollToTop from './components/ScrollToTop';
import TeacherSettings from './pages/teacher/teacher-settings';
import TeacherSessions from './pages/teacher/liveSessions';
import TeacherReviews from './pages/teacher/teacher-reviews'

// student
import StudentLayout from './components/student/StudentLayout';
import Calendar from './components/student/Calendar';
//import StudentCourses from './components/student/StudentCourses';
import CourseView from './components/student/CourseView';
//import LessonView from './components/student/LessonView';
import Assignment from './components/student/Assignment';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/teacher" element={<RegisterTeacher />} />
        <Route path="/courses" element={<BrowseCourses />} />
        <Route path="/courses/:courseId" element={<CoursePreview />} />
        <Route path='/about' element={<AboutSection />} />

        <Route path='/teacher/dashboard' element={<TeacherDashboard />} />
        <Route path='/teacher/courses' element={<TeacherCourses />} />
        <Route path='/teacher/calendar' element={<TeacherCalender />} />
        <Route path='/courses/create' element={<CreateEditCourse />} />
        <Route path="/courses/edit/:courseId" element={<CreateEditCourse />} />
        <Route path="/teacher/course/:courseId" element={<ViewCourse />} />
        <Route path="/teacher/help" element={<HelpCenter />} />
        <Route path="/teacher/notifications" element={<TeacherNotifications />} />
        <Route path='/teacher/analytics' element={<TeacherAnalytics />} />
        <Route path='/teacher/reports' element={<TeacherReports />} />
        <Route path='/teacher/profile' element={<TeacherProfile />} /> 
        <Route path='/teacher/settings' element={<TeacherSettings />} />
        <Route path='/teacher/sessions' element={<TeacherSessions />} />
        <Route path='/teacher/reviews' element={<TeacherReviews />} />

        <Route path='/student' element={<StudentLayout />} /> 
        {/*<Route path='/student/dashboard' element={<StudentDashboard />} />*/}
        {/* <Route path='/student/courses' element={<StudentCourses />} /> */}
        <Route path='/student/course/:courseId' element={<CourseView />} />
        <Route path='/student/calendar' element={<Calendar />} />
        {/*<Route path='/student/course/:courseId' element={<CourseView />} /> */}
        {/* <Route path='/student/course/:courseId/lesson/:lessonId' element={<LessonView />} /> */}
        {/*<Route path='/student/course/:courseId/assignment/:assignmentId' element={<Assignment />} />*/}
        
      </Routes>
    </Router>
  );
}

export default App;
