import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, BookOpen } from "lucide-react";
import "../../css/Home/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Logo and company info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <BookOpen className="footer-logo-icon" />
              <span className="footer-logo-text">Acadify</span>
            </div>
            <p className="footer-description">
              Acadify is a premier online learning platform offering expert-led courses in programming, 
              design, business, and more. Learn at your own pace and build the skills you need for your future.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link">
                <Facebook className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <Twitter className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <Instagram className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <Linkedin className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <Youtube className="footer-social-icon" />
              </a>
            </div>
          </div>

          {/* Links - Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">Courses</a></li>
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>

          {/* Links - Categories */}
          <div className="footer-column">
            <h3 className="footer-heading">Categories</h3>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Programming</a></li>
              <li><a href="#" className="footer-link">Design</a></li>
              <li><a href="#" className="footer-link">Business</a></li>
              <li><a href="#" className="footer-link">Data Science</a></li>
              <li><a href="#" className="footer-link">Marketing</a></li>
            </ul>
          </div>

          {/* Links - Support */}
          <div className="footer-column">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Cookie Policy</a></li>
              <li><a href="#" className="footer-link">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Acadify. All rights reserved. (i220959 & i221115)
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Terms</a>
            <a href="#" className="footer-bottom-link">Privacy</a>
            <a href="#" className="footer-bottom-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;