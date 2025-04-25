import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Sign-Up/Register';
import RegisterStudent from './pages/Sign-Up/RegisterStudent';
import RegisterTeacher from './pages/Sign-Up/RegisterTeacher';
import BrowseCourses from './pages/BrowseCourses';
import CoursePreview from './pages/CoursePreview';
import AboutSection from './pages/AboutSection';
import TeacherDashboard from './pages/teacher/dashboard';
import TeacherCourses from './pages/teacher/MyCourses';
import TeacherCalender from './pages/teacher/MyCalendar';
import CreateCourse from './pages/teacher/createcourse';

function App() {
  return (
    <Router>
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
        <Route path='/courses/create' element={<CreateCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
