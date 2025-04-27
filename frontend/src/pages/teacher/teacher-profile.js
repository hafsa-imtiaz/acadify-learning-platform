import React, { useState, useRef, useEffect } from 'react';
import { Camera, Linkedin, Twitter, Globe, Instagram, Mail, Book, Award, Briefcase, GraduationCap, MapPin, Phone } from 'lucide-react';
import axios from 'axios';
import styles from '../../css/teacher/teacher-profile.module.css';
import TeacherLayout from '../../components/teacher/sidebar';
import DefaultProfileImage from '../../assets/Profile/default-pfp.jpeg'; // Fallback image

const InstructorProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    // User schema fields
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    bio: '',
    profilePicture: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      website: '',
      instagram: '',
      github: '',
      youtube: '',
      facebook: ''
    },
    
    // Teacher schema fields
    specialization: '',
    teachingExperience: '',
    qualifications: [],
    professionalTitle: '',
    areasOfExpertise: [],
    currentInstitution: '',
    previousInstitutions: [],
    department: '',
    profileVisibility: 'Public',
    teachingMethodology: [],
    teachingStyle: ''
  });

  const [profileImage, setProfileImage] = useState(DefaultProfileImage);
  const [previewImage, setPreviewImage] = useState('../../');
  const fileInputRef = useRef(null);
  const [newExpertise, setNewExpertise] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Load data from localStorage on component mount and when tab changes
  useEffect(() => {
    loadProfileData();
  }, []);

  // Function to load profile data from localStorage
  const loadProfileData = () => {
    try {
      setLoading(true);
      
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user')) || {};
      // Get teacher data from localStorage
      const teacherData = JSON.parse(localStorage.getItem('roleDetails')) || {};
      console.log(teacherData);
      
      if (!userData || Object.keys(userData).length === 0) {
        setError('User data not found. Please login again.');
        setLoading(false);
        return;
      }

      // Combine data from both sources
      setProfile({
        // User schema fields
        fullName: userData.fullName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
        bio: userData.bio || '',
        profilePicture: userData.profilePicture || '',
        socialLinks: userData.socialLinks || {
          linkedin: '',
          twitter: '',
          website: '',
          instagram: '',
          github: '',
          youtube: '',
          facebook: ''
        },
        
        // Teacher schema fields from roleDetails
        specialization: teacherData?.specialization || '',
        teachingExperience: teacherData?.teachingExperience || '',
        qualifications: teacherData?.qualifications || [],
        professionalTitle: teacherData?.professionalTitle || '',
        areasOfExpertise: teacherData?.areasOfExpertise || [],
        currentInstitution: teacherData?.currentInstitution || '',
        previousInstitutions: teacherData?.previousInstitutions || [],
        department: teacherData?.department || '',
        profileVisibility: teacherData?.profileVisibility || 'Public',
        teachingMethodology: teacherData?.teachingMethodology || [],
        teachingStyle: teacherData?.teachingStyle || ''
      });

      // Set profile picture if available
      if (userData.profilePicture) {
        setPreviewImage(userData.profilePicture);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error loading profile data:', err);
      setError('Failed to load profile data from local storage');
      setLoading(false);
    }
  };

  // Change tab handler with loading of relevant data
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // This ensures fresh data is loaded when switching tabs
    loadProfileData();
  };

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
    if (newExpertise.trim() && !profile.areasOfExpertise.includes(newExpertise.trim())) {
      setProfile(prev => ({
        ...prev,
        areasOfExpertise: [...prev.areasOfExpertise, newExpertise.trim()]
      }));
      setNewExpertise('');
    }
  };

  const removeExpertise = (index) => {
    setProfile(prev => ({
      ...prev,
      areasOfExpertise: prev.areasOfExpertise.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please login again.');
        setIsSaving(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };

      // Handle profile image upload if changed
      if (profileImage) {
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        
        const imgConfig = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
          }
        };
        
        // This would be a separate endpoint to handle image upload
        await axios.post(`/api/user/profile-image/${userData._id}`, formData, imgConfig);
      }

      // Split data into user and teacher objects
      const userData = {
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
        bio: profile.bio,
        socialLinks: profile.socialLinks
      };
      
      const teacherData = {
        specialization: profile.specialization,
        teachingExperience: profile.teachingExperience,
        qualifications: profile.qualifications,
        professionalTitle: profile.professionalTitle,
        areasOfExpertise: profile.areasOfExpertise,
        currentInstitution: profile.currentInstitution,
        previousInstitutions: profile.previousInstitutions,
        department: profile.department,
        profileVisibility: profile.profileVisibility,
        teachingMethodology: profile.teachingMethodology,
        teachingStyle: profile.teachingStyle
      };

      // Send update request with both user and teacher data
      const res = await axios.put(`/api/teachers/${userData._id}`, {
        userData,
        teacherData
      }, config);
      
      // Update localStorage with new data
      const existingUser = JSON.parse(localStorage.getItem('user')) || {};
      const updatedUser = { ...existingUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      const existingTeacher = JSON.parse(localStorage.getItem('roleDetails')) || {};
      const updatedTeacher = { ...existingTeacher, ...teacherData };
      localStorage.setItem('roleDetails', JSON.stringify(updatedTeacher));
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err) {
      alert("ERROR: ", err);
      setError(err.response?.data?.msg || 'Failed to update profile');
      setIsSaving(false);
    }
  };

  if (loading) return (
    <TeacherLayout>
      <div className="text-center py-10">Loading your profile...</div>
    </TeacherLayout>
  );
  
  if (error) return (
    <TeacherLayout>
      <div className="text-center py-10 text-red-500">{error}</div>
    </TeacherLayout>
  );

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
              onClick={() => handleTabChange('personal')}
            >
              Personal Information
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'professional' ? styles.tabButtonActive : ''}`}
              onClick={() => handleTabChange('professional')}
            >
              Professional Details
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'social' ? styles.tabButtonActive : ''}`}
              onClick={() => handleTabChange('social')}
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
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="professionalTitle">Professional Title</label>
                    <input
                      type="text"
                      id="professionalTitle"
                      name="professionalTitle"
                      value={profile.professionalTitle}
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
                    <label htmlFor="phoneNumber"><Phone size={16} /> Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Your contact number"
                      value={profile.phoneNumber}
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
                    <label htmlFor="teachingExperience"><Briefcase size={16} /> Teaching Experience</label>
                    <select
                      id="teachingExperience"
                      name="teachingExperience"
                      value={profile.teachingExperience}
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
                    value={Array.isArray(profile.qualifications) ? profile.qualifications.join(', ') : profile.qualifications}
                    onChange={(e) => {
                      // Split by comma and trim whitespace
                      const quals = e.target.value.split(',').map(qual => qual.trim());
                      setProfile(prev => ({
                        ...prev,
                        qualifications: quals
                      }));
                    }}
                  />
                  <p className={styles.inputHelpText}>Separate multiple qualifications with commas</p>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="currentInstitution">Current Institution</label>
                  <input
                    type="text"
                    id="currentInstitution"
                    name="currentInstitution"
                    placeholder="University or institution where you currently teach"
                    value={profile.currentInstitution}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="Your department or faculty"
                    value={profile.department}
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
                    {profile.areasOfExpertise.map((item, index) => (
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
                
                <div className={styles.formGroup}>
                  <label htmlFor="teachingStyle">Teaching Style</label>
                  <textarea
                    id="teachingStyle"
                    name="teachingStyle"
                    placeholder="Describe your teaching approach and methodology"
                    value={profile.teachingStyle}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="profileVisibility">Profile Visibility</label>
                  <select
                    id="profileVisibility"
                    name="profileVisibility"
                    value={profile.profileVisibility}
                    onChange={handleInputChange}
                    className={styles.selectField}
                  >
                    <option value="Public">Public - Visible to everyone</option>
                    <option value="Students Only">Students Only - Visible to enrolled students</option>
                    <option value="Private">Private - Limited visibility</option>
                  </select>
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
                        value={profile.socialLinks?.linkedin || ''}
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
                        value={profile.socialLinks?.twitter || ''}
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
                        value={profile.socialLinks?.instagram || ''}
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
                      value={profile.socialLinks?.website || ''}
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
                      readOnly
                    />
                    <p className={styles.inputHelpText}>This email will be visible to students. Email can only be changed in account settings.</p>
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