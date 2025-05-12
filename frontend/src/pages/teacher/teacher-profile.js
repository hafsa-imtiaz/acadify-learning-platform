import React, { useState, useRef, useEffect } from 'react';
import { Camera, Linkedin, Twitter, Globe, Instagram, Mail, Book, Award, Briefcase, GraduationCap, MapPin, Phone } from 'lucide-react';
import styles from '../../css/teacher/teacher-profile.module.css';
import TeacherLayout from '../../components/teacher/sidebar';
import axios from 'axios';

const InstructorProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    professionalTitle: '',
    bio: '',
    specialization: '',
    qualifications: [],
    teachingExperience: '',
    areasOfExpertise: [],
    currentInstitution: '',
    department: '',
    teachingMethodology: [],
    teachingStyle: '',
    contactPreference: 'Discussion Forums',
    socialLinks: {
      linkedin: '',
      twitter: '',
      website: '',
      instagram: '',
    }
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('/api/placeholder/250/250');
  const fileInputRef = useRef(null);
  const [newExpertise, setNewExpertise] = useState('');
  const [newMethodology, setNewMethodology] = useState('');
  const [newQualification, setNewQualification] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged in user and teacher details from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedTeacher = JSON.parse(localStorage.getItem('roleDetails'));
  
  // Use stored data or fetch from API if not available
  useEffect(() => {
    if (storedUser && storedUser.userId) {
      if (storedTeacher) {
        // Use teacher and user details from localStorage
        mapDataToState(storedUser, storedTeacher);
        setLoading(false);
      } else {
        // Fallback to API if roleDetails not found
        fetchProfileData(storedUser.userId);
      }
    } else {
      setLoading(false);
      setError('No user found in local storage. Please log in again.');
    }
  }, []);

  // Function to map teacher and user data to component state
  const mapDataToState = (userData, teacherData) => {
    setProfile({
      name: userData.fullName || '',
      email: userData.email || '',
      phone: userData.phoneNumber || '',
      address: userData.address || '',
      professionalTitle: teacherData.professionalTitle || '',
      bio: userData.bio || '',
      specialization: teacherData.specialization || '',
      qualifications: Array.isArray(teacherData.qualifications) ? teacherData.qualifications : [],
      teachingExperience: teacherData.teachingExperience || '',
      areasOfExpertise: teacherData.areasOfExpertise || [],
      currentInstitution: teacherData.currentInstitution || '',
      department: teacherData.department || '',
      teachingMethodology: teacherData.teachingMethodology || [],
      teachingStyle: teacherData.teachingStyle || '',
      contactPreference: teacherData.contactPreference || 'Discussion Forums',
      socialLinks: {
        linkedin: userData.socialLinks?.linkedin || '',
        twitter: userData.socialLinks?.twitter || '',
        website: userData.socialLinks?.website || '',
        instagram: userData.socialLinks?.instagram || '',
      }
    });

    // Set profile image if available
    if (userData.profilePicture) {
      setPreviewImage(userData.profilePicture);
    }
  };

  const fetchProfileData = async (userId) => {
    try {
      setLoading(true);
      // Get both user and teacher data, but handle separately to avoid transaction issues
      try {
        // Updated to match router - using correct endpoint
        const userResponse = await axios.get(`http://localhost:5000/api/user/${userId}`);
        const userData = userResponse.data;
        
        try {
          const teacherResponse = await axios.get(`http://localhost:5000/api/teachers/${userId}`);
          const teacherData = teacherResponse.data;
          
          // Map data to our state
          mapDataToState(userData, teacherData);
        } catch (teacherErr) {
          console.error('Error fetching teacher data:', teacherErr);
          // Still show user data if teacher data fails
          mapDataToState(userData, {});
        }
      } catch (userErr) {
        console.error('Error fetching user data:', userErr);
        setError('Failed to load user profile. Please try again later.');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Failed to load profile. Please try again later.');
      setLoading(false);
    }
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
  
  const addMethodology = () => {
    if (newMethodology.trim() && !profile.teachingMethodology.includes(newMethodology.trim())) {
      setProfile(prev => ({
        ...prev,
        teachingMethodology: [...prev.teachingMethodology, newMethodology.trim()]
      }));
      setNewMethodology('');
    }
  };
  
  const removeMethodology = (index) => {
    setProfile(prev => ({
      ...prev,
      teachingMethodology: prev.teachingMethodology.filter((_, i) => i !== index)
    }));
  };
  
  const addQualification = () => {
    if (newQualification.trim() && !profile.qualifications.includes(newQualification.trim())) {
      setProfile(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification.trim()]
      }));
      setNewQualification('');
    }
  };
  
  const removeQualification = (index) => {
    setProfile(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const uploadProfileImage = async (userId) => {
    if (!profileImage) return null;
    
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);
      
      // Updated to match router - using /users/profile-image/:id endpoint
      const uploadResponse = await axios.post(`http://localhost:5000/api/user/profile-image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update user in localStorage with new profile image
      const updatedUser = uploadResponse.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser.profilePicture;
    } catch (err) {
      console.error('Error uploading profile image:', err);
      throw new Error('Failed to upload profile image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    
    try {
      // Upload profile image if changed
      let profilePictureUrl = previewImage;
      if (profileImage) {
        try {
          profilePictureUrl = await uploadProfileImage(storedUser.userId);
        } catch (uploadErr) {
          console.error('Error uploading image:', uploadErr);
          // Continue with the rest of the updates even if image upload fails
        }
      }
      
      // 1. Update User data first - using direct put without any other params
      try {
        const userData = {
          fullName: profile.name,
          phoneNumber: profile.phone,
          address: profile.address,
          bio: profile.bio,
          socialLinks: {
            linkedin: profile.socialLinks.linkedin,
            twitter: profile.socialLinks.twitter,
            website: profile.socialLinks.website,
            instagram: profile.socialLinks.instagram
          }
        };
        
        // Updated to match router - using /users/:id endpoint
        const userResponse = await axios.put(`http://localhost:5000/api/user/${storedUser.userId}`, userData);
        
        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify(userResponse.data));
      } catch (userErr) {
        console.error('Error updating user data:', userErr);
        setError(`Failed to update user data: ${userErr.response?.data?.message || userErr.message}`);
        setIsSaving(false);
        return; // Stop if user update fails
      }
      
      // 2. Then update teacher data - creating a direct update for each field to avoid transactions
      try {
        // Updated to match the teacher router - using PUT /teachers/:userId endpoint
        const teacherData = {
          teacherData: {
            professionalTitle: profile.professionalTitle,
            specialization: profile.specialization,
            teachingExperience: profile.teachingExperience,
            qualifications: profile.qualifications,
            areasOfExpertise: profile.areasOfExpertise,
            currentInstitution: profile.currentInstitution,
            department: profile.department,
            teachingMethodology: profile.teachingMethodology,
            teachingStyle: profile.teachingStyle,
            contactPreference: profile.contactPreference
          }
        };
        
        const response = await axios.put(`http://localhost:5000/api/teachers/${storedUser.userId}`, teacherData);
        
        // Update teacher details in localStorage
        localStorage.setItem('roleDetails', JSON.stringify(response.data));
      } catch (teacherErr) {
        console.error('Error updating teacher data:', teacherErr);
        setError(`Failed to update teacher data: ${teacherErr.response?.data?.message || teacherErr.message}`);
        setIsSaving(false);
        return;
      }
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(`Failed to save profile: ${err.response?.data?.message || err.message}`);
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <TeacherLayout>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading profile...</p>
        </div>
      </TeacherLayout>
    );
  }

  if (error && !profile.name) {
    return (
      <TeacherLayout>
        <div className={styles.errorContainer}>
          <h2>Error Loading Profile</h2>
          <p>{error}</p>
          <button 
            className={styles.primaryButton}
            onClick={() => fetchProfileData(storedUser.userId)}
          >
            Try Again
          </button>
        </div>
      </TeacherLayout>
    );
  }

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

          {error && (
            <div className={styles.errorMessage}>
              <span>⚠️</span> {error}
            </div>
          )}

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
                  <div className={styles.expertiseInputGroup}>
                    <input
                      type="text"
                      id="newQualification"
                      value={newQualification}
                      onChange={(e) => setNewQualification(e.target.value)}
                      placeholder="Add a qualification (e.g., 'Ph.D. in Computer Science, MIT')"
                    />
                    <button 
                      type="button" 
                      onClick={addQualification}
                      className={styles.addExpertiseBtn}
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className={styles.expertiseTags}>
                    {profile.qualifications.map((item, index) => (
                      <div key={index} className={styles.expertiseTag}>
                        <span>{item}</span>
                        <button 
                          type="button" 
                          onClick={() => removeQualification(index)}
                          className={styles.removeTagBtn}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
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
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="currentInstitution">Current Institution</label>
                    <input
                      type="text"
                      id="currentInstitution"
                      name="currentInstitution"
                      value={profile.currentInstitution}
                      onChange={handleInputChange}
                      placeholder="e.g., Harvard University"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="department">Department</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={profile.department}
                      onChange={handleInputChange}
                      placeholder="e.g., Computer Science Department"
                    />
                  </div>
                </div>
                
                <div className={styles.expertiseSection}>
                  <label>Teaching Methodology</label>
                  <div className={styles.expertiseInputGroup}>
                    <input
                      type="text"
                      value={newMethodology}
                      onChange={(e) => setNewMethodology(e.target.value)}
                      placeholder="Add a teaching method (e.g., 'Project-based learning')"
                    />
                    <button 
                      type="button" 
                      onClick={addMethodology}
                      className={styles.addExpertiseBtn}
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className={styles.expertiseTags}>
                    {profile.teachingMethodology.map((item, index) => (
                      <div key={index} className={styles.expertiseTag}>
                        <span>{item}</span>
                        <button 
                          type="button" 
                          onClick={() => removeMethodology(index)}
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
                    value={profile.teachingStyle}
                    onChange={handleInputChange}
                    placeholder="Describe your teaching style and approach..."
                    rows={3}
                  />
                  <p className={styles.inputHelpText}>Share your unique teaching approach to help students understand what to expect.</p>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="contactPreference">Contact Preference</label>
                  <select
                    id="contactPreference"
                    name="contactPreference"
                    value={profile.contactPreference}
                    onChange={handleInputChange}
                    className={styles.selectField}
                  >
                    <option value="Email">Email</option>
                    <option value="Discussion Forums">Discussion Forums</option>
                    <option value="Both">Both Email and Forums</option>
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
              <button 
                type="button" 
                className={styles.secondaryButton}
                onClick={() => {
                  // Reset to stored data
                  const storedUser = JSON.parse(localStorage.getItem('user'));
                  const storedTeacher = JSON.parse(localStorage.getItem('roleDetails'));
                  if (storedUser && storedTeacher) {
                    mapDataToState(storedUser, storedTeacher);
                  } else {
                    fetchProfileData(storedUser.userId);
                  }
                }}
              >
                Cancel
              </button>
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