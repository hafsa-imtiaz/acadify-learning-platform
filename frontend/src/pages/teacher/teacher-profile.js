import React, { useState, useRef } from 'react';
import { Camera, Linkedin, Twitter, Globe, Instagram, Mail, Book, Award, Briefcase, GraduationCap, MapPin, Phone } from 'lucide-react';
import styles from '../../css/teacher/teacher-profile.module.css';
import TeacherLayout from '../../components/teacher/sidebar';

const InstructorProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.edu',
    phone: '+1 (555) 123-4567',
    address: '123 University Avenue, Cambridge, MA 02138',
    title: 'Professor of Computer Science',
    bio: 'I have over 10 years of experience teaching programming and software development. My research focuses on machine learning applications in education technology.',
    specialization: 'Computer Science',
    qualifications: 'Ph.D. in Computer Science, MIT',
    experience: '5-10 years',
    expertise: ['Machine Learning', 'Python', 'Data Science', 'Software Engineering', 'Educational Technology'],
    socialLinks: {
      linkedin: 'sarahjohnson',
      twitter: 'sarahj_tech',
      website: 'sarahjohnson.edu',
      instagram: 'sarahj.code',
    }
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('/api/placeholder/250/250');
  const fileInputRef = useRef(null);
  const [newExpertise, setNewExpertise] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const addExpertise = () => {
    if (newExpertise.trim() && !profile.expertise.includes(newExpertise.trim())) {
      setProfile(prev => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise.trim()]
      }));
      setNewExpertise('');
    }
  };

  const removeExpertise = (index) => {
    setProfile(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <TeacherLayout>
      <div className={styles.instructorProfilePage}>
        <div className={styles.profileBackground}></div>
        
        <div className={styles.instructorProfileContainer}>
          <div className={styles.profileHeader}>
            <h1>Instructor Profile</h1>
            <p>Manage how you appear to students and optimize your teaching profile</p>
          </div>

          <div className={styles.profileTabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'personal' ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Information
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'professional' ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab('professional')}
            >
              Professional Details
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'social' ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab('social')}
            >
              Social & Contact
            </button>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            {/* Personal Information Tab */}
            <div className={`${styles.profileTabContent} ${activeTab === 'personal' ? styles.profileTabContentActive : ''}`}>
              <div className={styles.profileCard}>
                <div className={styles.profileSectionHeader}>
                  <h2>Profile Information</h2>
                  <p>Update your personal details and how students will see you</p>
                </div>
                
                <div className={styles.profilePhotoSection}>
                  <div className={styles.profilePhotoContainer}>
                    <div className={styles.profilePhotoWrapper}>
                      <img src={previewImage} alt="Profile" className={styles.profilePhoto} />
                      <button 
                        type="button" 
                        className={styles.photoChangeOverlay}
                        onClick={triggerFileInput}
                      >
                        <Camera size={24} />
                        <span>Change</span>
                      </button>
                    </div>
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className={styles.hiddenInput}
                    />
                  </div>
                  <div className={styles.photoGuidelines}>
                    <h3>Photo Guidelines:</h3>
                    <ul>
                      <li>Professional headshot recommended</li>
                      <li>Clear, high quality image (min 250x250px)</li>
                      <li>Neutral background preferred</li>
                      <li>JPG, PNG formats accepted (max 5MB)</li>
                    </ul>
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="title">Professional Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={profile.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Professor of Computer Science, Software Engineer"
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="bio">Bio / About Me</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    placeholder="Share your professional background, teaching philosophy, and areas of interest..."
                    rows={4}
                  />
                  <p className={styles.inputHelpText}>Write a compelling bio that highlights your expertise and teaching style (200-400 characters recommended).</p>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone"><Phone size={16} /> Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Your contact number"
                      value={profile.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="address"><MapPin size={16} /> Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Your location"
                      value={profile.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Details Tab */}
            <div className={`${styles.profileTabContent} ${activeTab === 'professional' ? styles.profileTabContentActive : ''}`}>
              <div className={styles.profileCard}>
                <div className={styles.profileSectionHeader}>
                  <h2>Professional Credentials</h2>
                  <p>Showcase your expertise, qualifications, and teaching experience</p>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="specialization"><Book size={16} /> Subject Specialization</label>
                    <select
                      id="specialization"
                      name="specialization"
                      value={profile.specialization}
                      onChange={handleInputChange}
                      className={styles.selectField}
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
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="experience"><Briefcase size={16} /> Teaching Experience</label>
                    <select
                      id="experience"
                      name="experience"
                      value={profile.experience}
                      onChange={handleInputChange}
                      className={styles.selectField}
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
                
                <div className={styles.formGroup}>
                  <label htmlFor="qualifications"><GraduationCap size={16} /> Qualifications</label>
                  <input
                    type="text"
                    id="qualifications"
                    name="qualifications"
                    placeholder="Your highest academic qualification"
                    value={profile.qualifications}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className={styles.expertiseSection}>
                  <label><Award size={16} /> Areas of Expertise</label>
                  <div className={styles.expertiseInputGroup}>
                    <input
                      type="text"
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      placeholder="Add a skill or subject (e.g., 'Python', 'Data Science')"
                    />
                    <button 
                      type="button" 
                      onClick={addExpertise}
                      className={styles.addExpertiseBtn}
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className={styles.expertiseTags}>
                    {profile.expertise.map((item, index) => (
                      <div key={index} className={styles.expertiseTag}>
                        <span>{item}</span>
                        <button 
                          type="button" 
                          onClick={() => removeExpertise(index)}
                          className={styles.removeTagBtn}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social & Contact Tab */}
            <div className={`${styles.profileTabContent} ${activeTab === 'social' ? styles.profileTabContentActive : ''}`}>
              <div className={styles.profileCard}>
                <div className={styles.profileSectionHeader}>
                  <h2>Connect With Students</h2>
                  <p>Add your social media and contact details for students to reach you</p>
                </div>
                
                <div className={styles.socialLinksContainer}>
                  <div className={`${styles.formGroup} ${styles.socialGroup}`}>
                    <label>
                      <Linkedin size={18} className={`${styles.socialIcon} ${styles.socialIconLinkedin}`} />
                      LinkedIn
                    </label>
                    <div className={styles.socialInputWrapper}>
                      <span className={styles.socialPrefix}>linkedin.com/in/</span>
                      <input
                        type="text"
                        name="linkedin"
                        value={profile.socialLinks.linkedin}
                        onChange={handleSocialLinkChange}
                        placeholder="username"
                      />
                    </div>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.socialGroup}`}>
                    <label>
                      <Twitter size={18} className={`${styles.socialIcon} ${styles.socialIconTwitter}`} />
                      Twitter/X
                    </label>
                    <div className={styles.socialInputWrapper}>
                      <span className={styles.socialPrefix}>twitter.com/</span>
                      <input
                        type="text"
                        name="twitter"
                        value={profile.socialLinks.twitter}
                        onChange={handleSocialLinkChange}
                        placeholder="username"
                      />
                    </div>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.socialGroup}`}>
                    <label>
                      <Instagram size={18} className={`${styles.socialIcon} ${styles.socialIconInstagram}`} />
                      Instagram
                    </label>
                    <div className={styles.socialInputWrapper}>
                      <span className={styles.socialPrefix}>instagram.com/</span>
                      <input
                        type="text"
                        name="instagram"
                        value={profile.socialLinks.instagram}
                        onChange={handleSocialLinkChange}
                        placeholder="username"
                      />
                    </div>
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.socialGroup}`}>
                    <label>
                      <Globe size={18} className={`${styles.socialIcon} ${styles.socialIconWebsite}`} />
                      Personal Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={profile.socialLinks.website}
                      onChange={handleSocialLinkChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div className={`${styles.formGroup} ${styles.socialGroup}`}>
                    <label>
                      <Mail size={18} className={`${styles.socialIcon} ${styles.socialIconEmail}`} />
                      Public Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                    <p className={styles.inputHelpText}>This email will be visible to students. Use your institutional or professional email.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.formActions}>
              <button type="button" className={styles.secondaryButton}>Cancel</button>
              <button 
                type="submit" 
                className={isSaving ? `${styles.primaryButton} ${styles.primaryButtonDisabled}` : styles.primaryButton}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
            
            {saveSuccess && (
              <div className={styles.successMessage}>
                <span>✓</span> Profile successfully updated!
              </div>
            )}
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default InstructorProfilePage;