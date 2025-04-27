import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Sign-Up/Register.css'; // We'll create this CSS file
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function Register() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []); 

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token expired, clear storage
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          setIsLoggedIn(false);
        } else {
          // Token is valid, check the role and redirect
          const storedUser = JSON.parse(localStorage.getItem('user'));
          setIsLoggedIn(true); // User is logged in
          if (storedUser.role === 'Teacher') {
            navigate('/teacher/dashboard'); // Redirect to Teacher dashboard
          } else if (storedUser.role === 'Student') {
            navigate('/student/dashboard'); // Redirect to Student dashboard
          }
        }
      } catch (error) {
        console.error("Invalid token or error decoding", error);
        // Clear invalid token from storage
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }
  }, [navigate]);

  const [hoveredRole, setHoveredRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // Function to navigate to the correct registration page
  const navigateToRegister = (role) => {
    setSelectedRole(role);
    
    // Small delay for transition effect
    setTimeout(() => {
      if (role === 'student') {
        navigate('/register/student'); // Student registration page
      } else {
        navigate('/register/teacher'); // Teacher registration page
      }
    }, 500);
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div class="registerpage">
    <Navbar />
    <div className="role-selection-container">
      <div className="role-selection-content">
        <h1 className="role-title">Choose Your Role</h1>
        <p className="role-subtitle">Select whether you are a student or teacher to begin your learning journey</p>

        <div className="role-boxes">
          <div
            className={`role-box student-box ${hoveredRole === 'student' ? 'hovered' : ''} ${selectedRole === 'student' ? 'selected' : ''}`}
            onClick={() => navigateToRegister('student')}
            onMouseEnter={() => setHoveredRole('student')}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div className="role-icon student-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <h2>I am a Student</h2>
            <p>Access courses, track your progress, and earn certificates</p>
            <ul className="role-features">
              <li><i className="fas fa-check"></i> Enroll in courses</li>
              <li><i className="fas fa-check"></i> Join live sessions</li>
              <li><i className="fas fa-check"></i> Receive personalized feedback</li>
            </ul>
            <button className="role-button" onClick={() => navigate("/register/student")}>
            Register as Student  
            <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          <div
            className={`role-box teacher-box ${hoveredRole === 'teacher' ? 'hovered' : ''} ${selectedRole === 'teacher' ? 'selected' : ''}`}
            onClick={() => navigateToRegister('teacher')}
            onMouseEnter={() => setHoveredRole('teacher')}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div className="role-icon teacher-icon">
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <h2>I am a Teacher</h2>
            <p>Create courses, engage with students, and share your expertise</p>
            <ul className="role-features">
              <li><i className="fas fa-check"></i> Build custom courses</li>
              <li><i className="fas fa-check"></i> Host interactive sessions</li>
              <li><i className="fas fa-check"></i> Monitor student progress</li>
            </ul>
            <button className="role-button" onClick={() => navigate("/register/teacher")}>
              Register as Teacher
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="additional-options">
          <p>Already have an account? <a href="/login">Sign in</a></p>
          <p>Want to learn more? <a href="/about">About us</a></p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Register;