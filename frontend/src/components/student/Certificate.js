import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Star, Calendar, Award, Shield } from 'lucide-react';
import { usePageMetadata } from './StudentLayout';
import webImg from '../../assets/certificate.jpg'; 
import '../../css/student/Certificate.css';

const Certificate = () => {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const { setPageMetadata } = usePageMetadata();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const certificateRef = useRef(null);

  // Update page metadata
  useEffect(() => {
    setPageMetadata('Certificate', ['Home', 'Achievements', 'Certificate']);
  }, [setPageMetadata]);

  // Fetch certificate data
  useEffect(() => {
    // This would be an API call in a real app
    setLoading(true);
    setTimeout(() => {
      // Mock certificate data
      const certificateData = {
        201: {
          id: 201,
          title: "Web Development Fundamentals",
          description: "Successfully completed the Web Development Fundamentals course with excellence.",
          issueDate: "2025-03-15",
          validUntil: "2028-03-15",
          credentialID: "WDF-25-2358",
          instructor: "David Miller",
          instructorTitle: "Senior Web Development Instructor",
          institution: "Acadify Learning",
          skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Accessibility"],
          image: webImg,
          hours: 40,
          level: "Intermediate"
        },
        202: {
          id: 202,
          title: "HTML & CSS Masterclass",
          description: "Demonstrated proficiency in advanced HTML and CSS techniques and best practices.",
          issueDate: "2025-02-10",
          validUntil: "2028-02-10",
          credentialID: "HCM-25-1147",
          instructor: "Sarah Johnson",
          instructorTitle: "Lead Front-end Development Instructor",
          institution: "Acadify Learning",
          skills: ["Advanced CSS", "Flexbox", "CSS Grid", "Animations", "SASS/SCSS"],
          image: "https://via.placeholder.com/800x600",
          hours: 35,
          level: "Advanced"
        }
      };

      if (certificateData[certificateId]) {
        setCertificate(certificateData[certificateId]);
      } else {
        // Handle certificate not found
        navigate('/student/achievements');
      }
      setLoading(false);
    }, 800);
  }, [certificateId, navigate]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  // Handle download - in a real app, this would generate a PDF
  const handleDownload = () => {
    alert('Certificate download functionality would be implemented here.');
    // In a real app, you might use html2canvas or jsPDF to generate a PDF
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.title} Certificate`,
        text: `Check out my ${certificate.title} certificate from Acadify Learning!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Copy this link to share your certificate: ' + window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="certificate-container">
        <div className="loading-spinner">Loading certificate...</div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="certificate-container">
        <div className="certificate-not-found">
          <h2>Certificate Not Found</h2>
          <p>The certificate you're looking for doesn't exist or has been removed.</p>
          <Link to="/student/achievements" className="btn-primary">
            Back to Achievements
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-page">
      <div className="certificate-actions">
        <button className="btn-icon" onClick={() => navigate('/student/achievements')}>
          <ArrowLeft size={20} />
          <span>Back to Achievements</span>
        </button>
        
        <div className="action-buttons">
          <button className="btn-icon" onClick={handleDownload}>
            <Download size={20} />
            <span>Download</span>
          </button>
          <button className="btn-icon" onClick={handleShare}>
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="certificate-preview" ref={certificateRef}>
        <div className="certificate-content">
          <div className="certificate-header">
            <div className="certificate-logo">
              <img src="/logo.png" alt="Acadify Logo" />
            </div>
            <h1>Certificate of Completion</h1>
          </div>
          
          <div className="certificate-body">
            <div className="certificate-icon">
              <Award size={48} />
            </div>
            <p className="certificate-recipient">This certifies that</p>
            <h2 className="student-name">John Doe</h2>
            <p className="certificate-description">
              {certificate.description}
            </p>
            
            <div className="certificate-course">
              <h3>{certificate.title}</h3>
              <div className="certificate-details">
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>Issued on {formatDate(certificate.issueDate)}</span>
                </div>
                <div className="detail-item">
                  <Shield size={16} />
                  <span>Credential ID: {certificate.credentialID}</span>
                </div>
              </div>
            </div>
            
            <div className="certificate-signatures">
              <div className="signature">
                <div className="signature-line"></div>
                <p className="signature-name">{certificate.instructor}</p>
                <p className="signature-title">{certificate.instructorTitle}</p>
              </div>
              <div className="signature">
                <div className="signature-line"></div>
                <p className="signature-name">Michael Chen</p>
                <p className="signature-title">CEO, Acadify Learning</p>
              </div>
            </div>
          </div>
          
          <div className="certificate-footer">
            <p>Verify this certificate at acadify.com/verify using credential ID {certificate.credentialID}</p>
          </div>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="certificate-details-section">
        <h3>Certificate Details</h3>
        
        <div className="details-grid">
          <div className="detail-card">
            <h4>Course Information</h4>
            <ul>
              <li>
                <span className="detail-label">Course:</span>
                <span className="detail-value">{certificate.title}</span>
              </li>
              <li>
                <span className="detail-label">Level:</span>
                <span className="detail-value">{certificate.level}</span>
              </li>
              <li>
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{certificate.hours} hours</span>
              </li>
              <li>
                <span className="detail-label">Institution:</span>
                <span className="detail-value">{certificate.institution}</span>
              </li>
            </ul>
          </div>
          
          <div className="detail-card">
            <h4>Credential Information</h4>
            <ul>
              <li>
                <span className="detail-label">Credential ID:</span>
                <span className="detail-value">{certificate.credentialID}</span>
              </li>
              <li>
                <span className="detail-label">Issue Date:</span>
                <span className="detail-value">{formatDate(certificate.issueDate)}</span>
              </li>
              <li>
                <span className="detail-label">Valid Until:</span>
                <span className="detail-value">{formatDate(certificate.validUntil)}</span>
              </li>
              <li>
                <span className="detail-label">Instructor:</span>
                <span className="detail-value">{certificate.instructor}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="skills-section">
          <h4>Skills</h4>
          <div className="skills-list">
            {certificate.skills.map((skill, index) => (
              <span className="skill-badge" key={index}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;