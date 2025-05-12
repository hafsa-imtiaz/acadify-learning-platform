import React, { useState } from 'react';
import '../../css/Sign-Up/RegisterTeacherPage.css';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function TeacherRegisterPage() {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    qualifications: '',
    experience: '',
    phone: '',
    address: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
  
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
  
    // Check password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }
  
    // Prepare the data for the API request
    const teacherData = {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
      address: formData.address,
      specialization: formData.specialization,
      qualifications: formData.qualifications.split(','), // Assuming multiple qualifications separated by commas
      teachingExperience: formData.experience,
      profilePicture: '', // Add if you're handling profile picture upload
      bio: '', // Optional field
      gender: formData.gender, // Optional field
      dateOfBirth: formData.dob, // Optional field
    };
  
    try {
      // Make API call to register teacher
      const response = await fetch('http://localhost:5000/api/auth/register/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Registration was successful
        setSuccessMessage('Registration successful! Redirecting to dashboard...');
        console.log('Teacher registered successfully:', data);
        
        // Store token and user info in local storage if the API returned them
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        if (data.teacherDetails) {
          localStorage.setItem('roleDetails', JSON.stringify(data.teacherDetails));
        }
        
        // Wait a moment before redirecting
        setTimeout(() => {
          navigate('/teacher/dashboard');
        }, 1500);
      } else {
        // Handle server-side errors (e.g., validation errors)
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during registration:', error);
      setError('Server error during registration. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerpage">
    <Navbar />
    <div className="teacher-register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>Teacher Registration</h2>
            <p>Join our community of educators and start your teaching journey</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Your contact number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="Your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="input-field textarea"
                />
              </div>

              <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />

                </div>

                <div className="form-group">
                  <label htmlFor="experience">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="0ther">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Professional Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="specialization">Subject Specialization</label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Specialization</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Arts">Arts</option>
                    <option value="Physical Education">Physical Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Teaching Experience</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="qualifications">Qualifications</label>
                <input
                  id="qualifications"
                  type="text"
                  name="qualifications"
                  placeholder="Your highest qualification"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Account Security</h3>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="password-hint">
                  Password should be at least 8 characters long
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkbox-text">
                  I agree to the <a href="/terms" className="terms-link">Terms of Service</a> and <a href="/privacy" className="terms-link">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || !formData.agreeTerms}
            >
              {isLoading ? 'Processing...' : 'Create Account'}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default TeacherRegisterPage;