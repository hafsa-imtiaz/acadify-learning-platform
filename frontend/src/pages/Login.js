import React, { useState, useEffect } from 'react';
import '../css/Login.css';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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

  if (isLoggedIn) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Connect to your backend API
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      
      // Handle successful login
      if (response.data && response.data.token) {
        // Store token in localStorage or sessionStorage based on rememberMe
        if (rememberMe) {
          localStorage.setItem('token', response.data.token);
        } else {
          localStorage.setItem('token', response.data.token);
          sessionStorage.setItem('token', response.data.token);
        }
      
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        if (response.data.roleDetails) {
          localStorage.setItem('roleDetails', JSON.stringify(response.data.roleDetails));
        }
        console.log(response.data.roleDetails);
      
        if (response.data.user.role === 'Teacher') {
          navigate('/teacher/dashboard'); 
        } else if (response.data.user.role === 'Student') {
          navigate('/student/dashboard');  
        } else {
          navigate('/home'); 
        }
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  return (
    <div className="loginpage">
    <Navbar />
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Sign in to your account</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password" onClick={handleForgotPassword} className="forgot-password">Forgot your password?</a>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`} 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="social-buttons">
          <button className="social-button" type="button" onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}>
            <i className="fab fa-google"></i> Google
          </button>
          <button className="social-button" type="button" onClick={() => window.location.href = 'http://localhost:5000/api/auth/facebook'}>
            <i className="fab fa-facebook-f"></i> Facebook
          </button>
          <button className="social-button" type="button" onClick={() => window.location.href = 'http://localhost:5000/api/auth/twitter'}>
            <i className="fab fa-twitter"></i> Twitter
          </button>
        </div>
        
        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Login;