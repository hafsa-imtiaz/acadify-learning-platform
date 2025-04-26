import React, { useState, useEffect } from 'react';
import { Lock, Bell, CreditCard, Mail, Eye, EyeOff, Save, AlertTriangle, CheckCircle, BellOff } from 'lucide-react';
import styles from '../../css/teacher/teacher-settings.module.css';
import TeacherLayout from '../../components/teacher/sidebar';

const InstructorSettingsPage = () => {
  // Initialize activeTab based on URL hash or default to 'account'
  const [activeTab, setActiveTab] = useState('account');
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  
  // Use effect to handle URL hash changes for tab navigation
  useEffect(() => {
    // Set initial tab based on hash in URL if present
    const hash = window.location.hash.replace('#', '');
    if (['account', 'notifications', 'payment'].includes(hash)) {
      setActiveTab(hash);
    }

    // Add event listener for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (['account', 'notifications', 'payment'].includes(newHash)) {
        setActiveTab(newHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Function to change tabs and update URL hash
  const changeTab = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };
  
  const [accountSettings, setAccountSettings] = useState({
    email: 'sarah.johnson@example.edu',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    studentMessages: true,
    courseEnrollments: true,
    assignmentSubmissions: true,
    courseReviews: true,
    platformUpdates: false,
    marketingEmails: false,
  });
  
  const [payoutSettings, setPayoutSettings] = useState({
    payoutMethod: 'bankTransfer',
    accountName: 'Sarah Johnson',
    bankName: 'National Bank',
    accountNumber: '••••••••4567',
    routingNumber: '••••••1234',
    paypalEmail: '',
    payoutFrequency: 'monthly',
    minimumPayout: '100',
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePayoutChange = (e) => {
    const { name, value } = e.target;
    setPayoutSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePayoutMethod = (method) => {
    setPayoutSettings(prev => ({
      ...prev,
      payoutMethod: method
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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    if (accountSettings.newPassword.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setChangePasswordOpen(false);
    
    // Reset password fields
    setAccountSettings(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <TeacherLayout>
      <div className={styles.settingsContainer}>
        <div className={styles.settingsHeader}>
          <h1 className={styles.settingsTitle}>Account Settings</h1>
          <p className={styles.settingsDescription}>
            Manage your account preferences, notifications, and payment settings
          </p>
        </div>
  
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'account' ? styles.activeTab : ''}`}
            onClick={() => changeTab('account')}
          >
            Account
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'notifications' ? styles.activeTab : ''}`}
            onClick={() => changeTab('notifications')}
          >
            Notifications
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'payment' ? styles.activeTab : ''}`}
            onClick={() => changeTab('payment')}
          >
            Payment
          </button>
        </div>
  
        <div className={styles.tabContent}>
          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <form onSubmit={handleSubmit} className={styles.settingsForm}>
              <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Account Information</h2>
                  <p className={styles.sectionDescription}>
                    Update your email and manage password security
                  </p>
                </div>
              
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <Mail size={16} /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={accountSettings.email}
                    onChange={handleAccountChange}
                    className={styles.formInput}
                  />
                  <p className={styles.formHelp}>
                    This is the email used for account login and important notifications.
                  </p>
                </div>
              
                <div className={styles.formGroup}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.subsectionTitle}>Password & Security</h3>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => setChangePasswordOpen(!changePasswordOpen)}
                    >
                      {changePasswordOpen ? 'Cancel' : 'Change Password'}
                    </button>
                  </div>
                
                  {!changePasswordOpen && (
                    <div className={styles.currentPasswordDisplay}>
                      <div className={styles.passwordField}>
                        <span className={styles.passwordLabel}>Password</span>
                        <span className={styles.passwordDots}>••••••••••••</span>
                      </div>
                      <p className={styles.passwordLastUpdated}>Last updated 3 months ago</p>
                    </div>
                  )}
                
                  {changePasswordOpen && (
                    <div className={styles.passwordChangeForm}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Current Password</label>
                        <div className={styles.passwordInput}>
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={accountSettings.currentPassword}
                            onChange={handleAccountChange}
                            className={styles.formInput}
                          />
                          <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                          >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    
                      <div className={styles.passwordFields}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>New Password</label>
                          <div className={styles.passwordInput}>
                            <input
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              value={accountSettings.newPassword}
                              onChange={handleAccountChange}
                              className={styles.formInput}
                            />
                            <button
                              type="button"
                              className={styles.passwordToggle}
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              aria-label={showNewPassword ? "Hide password" : "Show password"}
                            >
                              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Confirm Password</label>
                          <div className={styles.passwordInput}>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={accountSettings.confirmPassword}
                              onChange={handleAccountChange}
                              className={styles.formInput}
                            />
                            <button
                              type="button"
                              className={styles.passwordToggle}
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    
                      <div className={styles.passwordRequirements}>
                        <h4 className={styles.requirementsTitle}>Password Requirements:</h4>
                        <ul className={styles.requirementsList}>
                          <li className={`${styles.requirement} ${accountSettings.newPassword.length >= 8 ? styles.met : ''}`}>
                            At least 8 characters
                          </li>
                          <li className={`${styles.requirement} ${/[A-Z]/.test(accountSettings.newPassword) ? styles.met : ''}`}>
                            At least one uppercase letter
                          </li>
                          <li className={`${styles.requirement} ${/[a-z]/.test(accountSettings.newPassword) ? styles.met : ''}`}>
                            At least one lowercase letter
                          </li>
                          <li className={`${styles.requirement} ${/\d/.test(accountSettings.newPassword) ? styles.met : ''}`}>
                            At least one number
                          </li>
                          <li className={`${styles.requirement} ${/[^A-Za-z0-9]/.test(accountSettings.newPassword) ? styles.met : ''}`}>
                            At least one special character
                          </li>
                        </ul>
                      </div>
                    
                      <div className={styles.formActions}>
                        <button type="button" onClick={handlePasswordChange} className={styles.primaryButton}>
                          {isSaving ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              
                <div className={styles.dangerZone}>
                  <h3 className={styles.dangerTitle}>Danger Zone</h3>
                  <div className={styles.dangerContent}>
                    <div className={styles.dangerInfo}>
                      <h4 className={styles.dangerAction}>Delete Account</h4>
                      <p className={styles.dangerDescription}>
                        Permanently remove your account and all your courses from the platform. This action cannot be undone.
                      </p>
                    </div>
                    <button type="button" className={styles.dangerButton}>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <form onSubmit={handleSubmit} className={styles.settingsForm}>
              <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Notification Preferences</h2>
                  <p className={styles.sectionDescription}>
                    Control which notifications you receive from the platform
                  </p>
                </div>
              
                <div className={styles.notificationGroups}>
                  <div className={styles.notificationGroup}>
                    <h3 className={styles.groupTitle}>Course & Student Notifications</h3>
                    
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4 className={styles.notificationTitle}>Student Messages</h4>
                        <p className={styles.notificationDescription}>
                          Get notified when students send you direct messages
                        </p>
                      </div>
                      <label className={styles.toggle}>
                        <input 
                          type="checkbox" 
                          name="studentMessages" 
                          checked={notificationSettings.studentMessages} 
                          onChange={handleNotificationChange} 
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4 className={styles.notificationTitle}>Course Enrollments</h4>
                        <p className={styles.notificationDescription}>
                          Get notified when new students enroll in your courses
                        </p>
                      </div>
                      <label className={styles.toggle}>
                        <input 
                          type="checkbox" 
                          name="courseEnrollments" 
                          checked={notificationSettings.courseEnrollments} 
                          onChange={handleNotificationChange} 
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4 className={styles.notificationTitle}>Assignment Submissions</h4>
                        <p className={styles.notificationDescription}>
                          Get notified when students submit assignments for grading
                        </p>
                      </div>
                      <label className={styles.toggle}>
                        <input 
                          type="checkbox" 
                          name="assignmentSubmissions" 
                          checked={notificationSettings.assignmentSubmissions} 
                          onChange={handleNotificationChange} 
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4 className={styles.notificationTitle}>Course Reviews</h4>
                        <p className={styles.notificationDescription}>
                          Get notified when students leave reviews on your courses
                        </p>
                      </div>
                      <label className={styles.toggle}>
                        <input 
                          type="checkbox" 
                          name="courseReviews" 
                          checked={notificationSettings.courseReviews} 
                          onChange={handleNotificationChange} 
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                
                  <div className={styles.notificationGroup}>
                    <h3 className={styles.groupTitle}>Platform Notifications</h3>
                    
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4 className={styles.notificationTitle}>Platform Updates</h4>
                        <p className={styles.notificationDescription}>
                          Get notified about new features and platform improvements
                        </p>
                      </div>
                      <label className={styles.toggle}>
                        <input 
                          type="checkbox" 
                          name="platformUpdates" 
                          checked={notificationSettings.platformUpdates} 
                          onChange={handleNotificationChange} 
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4 className={styles.notificationTitle}>Marketing Communications</h4>
                        <p className={styles.notificationDescription}>
                          Receive tips, best practices, and promotional content
                        </p>
                      </div>
                      <label className={styles.toggle}>
                        <input 
                          type="checkbox" 
                          name="marketingEmails" 
                          checked={notificationSettings.marketingEmails} 
                          onChange={handleNotificationChange} 
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                
                  <div className={styles.notificationActions}>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => {
                        setNotificationSettings({
                          studentMessages: true,
                          courseEnrollments: true,
                          assignmentSubmissions: true,
                          courseReviews: true,
                          platformUpdates: true,
                          marketingEmails: true
                        });
                      }}>
                      <Bell size={16} /> Enable All
                    </button>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => {
                        setNotificationSettings({
                          studentMessages: false,
                          courseEnrollments: false,
                          assignmentSubmissions: false,
                          courseReviews: false,
                          platformUpdates: false,
                          marketingEmails: false
                        });
                      }}>
                      <BellOff size={16} /> Disable All
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  {isSaving ? 'Saving...' : (
                    <>
                      <Save size={16} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Payment Settings Tab */}
          {activeTab === 'payment' && (
            <form onSubmit={handleSubmit} className={styles.settingsForm}>
              <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Payment Settings</h2>
                  <p className={styles.sectionDescription}>
                    Manage how you receive payments for your courses
                  </p>
                </div>
              
                <div className={styles.paymentMethodSelector}>
                  <h3 className={styles.subsectionTitle}>Choose Payment Method</h3>
                  <div className={styles.paymentOptions}>
                    <button
                      type="button"
                      className={`${styles.paymentOption} ${payoutSettings.payoutMethod === 'bankTransfer' ? styles.selectedPayment : ''}`}
                      onClick={() => handleChangePayoutMethod('bankTransfer')}
                    >
                      <div className={styles.paymentOptionIcon}>
                        <CreditCard size={24} />
                      </div>
                      <div className={styles.paymentOptionInfo}>
                        <h4 className={styles.paymentOptionTitle}>Bank Transfer</h4>
                        <p className={styles.paymentOptionDescription}>
                          Direct deposits to your bank account
                        </p>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      className={`${styles.paymentOption} ${payoutSettings.payoutMethod === 'paypal' ? styles.selectedPayment : ''}`}
                      onClick={() => handleChangePayoutMethod('paypal')}
                    >
                      <div className={styles.paymentOptionIcon}>
                        <Mail size={24} />
                        
                      </div>
                      <div className={styles.paymentOptionInfo}>
                        <h4 className={styles.paymentOptionTitle}>PayPal</h4>
                        <p className={styles.paymentOptionDescription}>
                          Send payments to your PayPal account
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              
                {payoutSettings.payoutMethod === 'bankTransfer' && (
                  <div className={styles.bankDetails}>
                    <h3 className={styles.subsectionTitle}>Bank Account Details</h3>
                    
                    <div className={styles.bankDetailsRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Account Holder Name</label>
                        <input
                          type="text"
                          name="accountName"
                          value={payoutSettings.accountName}
                          onChange={handlePayoutChange}
                          className={styles.formInput}
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Bank Name</label>
                        <input
                          type="text"
                          name="bankName"
                          value={payoutSettings.bankName}
                          onChange={handlePayoutChange}
                          className={styles.formInput}
                        />
                      </div>
                    </div>
                    
                    <div className={styles.bankDetailsRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Account Number</label>
                        <div className={styles.secureField}>
                          <input
                            type="text"
                            disabled
                            value={payoutSettings.accountNumber}
                            className={styles.formInput}
                          />
                          <button type="button" className={styles.changeButton}>
                            Change
                          </button>
                        </div>
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Routing Number</label>
                        <div className={styles.secureField}>
                          <input
                            type="text"
                            disabled
                            value={payoutSettings.routingNumber}
                            className={styles.formInput}
                          />
                          <button type="button" className={styles.changeButton}>
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {payoutSettings.payoutMethod === 'paypal' && (
                  <div className={styles.paypalDetails}>
                    <h3 className={styles.subsectionTitle}>PayPal Account Details</h3>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>PayPal Email Address</label>
                      <input
                        type="email"
                        name="paypalEmail"
                        value={payoutSettings.paypalEmail}
                        onChange={handlePayoutChange}
                        placeholder="your-email@example.com"
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                )}
                
                <div className={styles.payoutPreferences}>
                  <h3 className={styles.subsectionTitle}>Payout Preferences</h3>
                  
                  <div className={styles.payoutPreferencesRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Payout Frequency</label>
                      <select
                        name="payoutFrequency"
                        value={payoutSettings.payoutFrequency}
                        onChange={handlePayoutChange}
                        className={styles.formSelect}
                      >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Minimum Payout Amount ($)</label>
                      <input
                        type="number"
                        name="minimumPayout"
                        value={payoutSettings.minimumPayout}
                        onChange={handlePayoutChange}
                        min="10"
                        className={styles.formInput}
                      />
                      <p className={styles.formHelp}>
                        We'll hold your earnings until they reach this amount.
                      </p>
                    </div>
                  </div>
                </div>
              
                <div className={styles.taxInformation}>
                  <div className={styles.taxHeader}>
                    <h3 className={styles.subsectionTitle}>Tax Information</h3>
                    
                    <span className={styles.taxStatus}>
                      <AlertTriangle size={16} /> Incomplete
                    </span>
                  </div>
                  <p className={styles.taxDescription}>
                    Please complete your tax information to receive payouts. We require this information for regulatory compliance.
                  </p>
                  <button type="button" className={styles.primaryButton}>
                    Complete Tax Information
                  </button>
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  {isSaving ? 'Saving...' : (
                    <>
                      <Save size={16} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
        
        {saveSuccess && (
          <div className={styles.successNotification}>
            <CheckCircle size={18} /> Settings successfully updated!
          </div>
        )}
      </div>
    </TeacherLayout>
  );
};
  
export default InstructorSettingsPage;