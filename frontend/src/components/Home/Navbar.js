import React, { useState } from 'react';
import { Search, Menu, X, User, BookOpen } from 'lucide-react';
import '../../css/Home/navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-container">
        <div className="navbar-main">
          {/* Logo and brand */}
          <div className="navbar-brand">
            <div className="navbar-logo-container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <BookOpen className="navbar-logo-icon" />
                <span className="navbar-logo-text">Acadify</span>
              </div>
            </div>
            
            {/* Desktop navigation */}
            <div className="navbar-links">
              <div className="navbar-links-list">
                <a href="/" className="navbar-link">
                  Home
                </a>
                <a href="/courses" className="navbar-link">
                  Courses
                </a>
                <a href="#" className="navbar-link">
                  Categories
                </a>
                <a href="/about" className="navbar-link">
                  About
                </a>
              </div>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search for courses..."
              className="navbar-search-input"
            />
            <button className="navbar-search-button" type="button">
              <Search className="navbar-search-icon" />
            </button>
          </div>
          
          {/* User actions */}
          <div className="navbar-actions">
            <a href="/login" className="navbar-login-link">
              Log in
            </a>
            <a href="/register" className="navbar-signup-link">
              Sign up
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="navbar-menu-mobile">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="navbar-menu-toggle"
              aria-label="Open mobile navigation"
            >
              {isMenuOpen ? (
                <X className="navbar-menu-icon" />
              ) : (
                <Menu className="navbar-menu-icon" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-links">
            <a href="/" className="navbar-mobile-link">
              Home
            </a>
            <a href="/courses" className="navbar-mobile-link">
              Courses
            </a>
            <a href="#" className="navbar-mobile-link">
              Categories
            </a>
            <a href="#" className="navbar-mobile-link">
              About
            </a>
            <a href="#" className="navbar-mobile-link">
              Contact
            </a>
          </div>
          <div className="navbar-mobile-user-panel">
            <div className="navbar-mobile-user-info">
              <div className="navbar-mobile-avatar">
                <User className="navbar-mobile-user-icon" />
              </div>
              <div className="navbar-mobile-user-label">Guest User</div>
            </div>
            <div className="navbar-mobile-actions">
              <a href="/login" className="navbar-mobile-login">
                Log in
              </a>
              <a href="/register" className="navbar-mobile-signup">
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;