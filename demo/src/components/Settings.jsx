import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import TransfereeSidebar from './transferee/TransfereeSidebar';



const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Settings state - role-specific defaults
  const [settings, setSettings] = useState({
    // Accessibility Settings
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
    
    // Display Settings
    theme: 'light', // light, dark, auto
    fontSize: 'medium', // small, medium, large, extra-large
    language: 'en',
    timezone: 'UTC',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    announcementAlerts: true,
    gradeAlerts: user?.role === 'student' ? true : false,
    scheduleReminders: true,
    
    // Privacy Settings
    profileVisibility: 'public', // public, friends, private
    showOnlineStatus: true,
    allowMessages: true,
    dataSharing: false,
    
    // Advanced Settings
    autoSave: true,
    autoLogout: 30, // minutes
    sessionTimeout: 120, // minutes
    debugMode: false,
    analytics: false
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear errors when user makes changes
    if (error) setError('');
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Save settings to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Settings saved successfully!');
      
      // Apply accessibility settings immediately
      applyAccessibilitySettings();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyAccessibilitySettings = () => {
    const root = document.documentElement;
    
    // Apply high contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Apply large text
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    // Apply reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      focusIndicators: true,
      theme: 'light',
      fontSize: 'medium',
      language: 'en',
      timezone: 'UTC',
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      announcementAlerts: true,
      gradeAlerts: user?.role === 'student' ? true : false,
      scheduleReminders: true,
      profileVisibility: 'public',
      showOnlineStatus: true,
      allowMessages: true,
      dataSharing: false,
      autoSave: true,
      autoLogout: 30,
      sessionTimeout: 120,
      debugMode: false,
      analytics: false
    };
    
    setSettings(defaultSettings);
    localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
    applyAccessibilitySettings();
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getNavItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { path: '/student/dashboard', icon: 'dashboard', label: 'Dashboard' },
          { path: '/student/schedule', icon: 'schedule', label: 'Schedule' },
          { path: '/student/grades', icon: 'grades', label: 'Grades' },
          { path: '/student/profile', icon: 'profile', label: 'Profile' }
        ];
      case 'faculty':
        return [
          { path: '/faculty/dashboard', icon: 'dashboard', label: 'Dashboard' },
          { path: '/faculty/schedule', icon: 'schedule', label: 'Schedule' },
          { path: '/faculty/students', icon: 'students', label: 'Students' },
          { path: '/faculty/profile', icon: 'profile', label: 'Profile' }
        ];
      case 'transferee':
        return [
          { path: '/transferee/new-enrollee', icon: 'dashboard', label: 'New Enrollee/s' },
          { path: '/transferee/requests', icon: 'masterlist', label: 'Requests' },
          { path: '/transferee/schedule', icon: 'schedule', label: 'Schedule' },
          { path: '/transferee/profile', icon: 'profile', label: 'Profile' }
        ];
      default:
        return [];
    }
  };

  const getSidebarComponent = () => {
    switch (user?.role) {
      case 'transferee':
        return (
          <TransfereeSidebar
            isMenuOpen={isMenuOpen}
            handleNavigation={handleNavigation}
            navItems={getNavItems()}
            toggleMenu={toggleMenu}
          />
        );
      default:
        return (
          <Sidebar
            isMenuOpen={isMenuOpen}
            handleNavigation={handleNavigation}
            navItems={getNavItems()}
            toggleMenu={toggleMenu}
          />
        );
    }
  };

  const getContainerClass = () => {
    switch (user?.role) {
      case 'transferee':
        return 'dashboard-container transferee-container';
      case 'faculty':
        return 'dashboard-container faculty-container';
      default:
        return 'dashboard-container student-container';
    }
  };

  const getContentClass = () => {
    switch (user?.role) {
      case 'transferee':
        return 'transferee-content';
      case 'faculty':
        return 'faculty-content';
      default:
        return 'content-area';
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className={getContainerClass()}>
      {getSidebarComponent()}
      
      <div className="main-content">
        <Header />
        
        <div className={getContentClass()}>
          <div className="settings-container">
            <div className="settings-header">
              <h1 className="settings-title">Settings</h1>
              <p className="settings-subtitle">Customize your experience and accessibility options</p>
            </div>

            <div className="settings-content">
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {success && (
                <div className="success-message">
                  {success}
                </div>
              )}

              {/* Accessibility Settings */}
              <div className="settings-section">
                <h2 className="section-title">
                  <span className="section-icon">♿</span>
                  Accessibility
                </h2>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="highContrast"
                        checked={settings.highContrast}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      High Contrast Mode
                    </label>
                    <p className="setting-description">Increases color contrast for better visibility</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="largeText"
                        checked={settings.largeText}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Large Text
                    </label>
                    <p className="setting-description">Increases text size throughout the application</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="reducedMotion"
                        checked={settings.reducedMotion}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Reduced Motion
                    </label>
                    <p className="setting-description">Minimizes animations and transitions</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="screenReader"
                        checked={settings.screenReader}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Screen Reader Support
                    </label>
                    <p className="setting-description">Optimizes interface for screen readers</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="keyboardNavigation"
                        checked={settings.keyboardNavigation}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Enhanced Keyboard Navigation
                    </label>
                    <p className="setting-description">Improves keyboard accessibility</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="focusIndicators"
                        checked={settings.focusIndicators}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Focus Indicators
                    </label>
                    <p className="setting-description">Shows clear focus indicators for keyboard navigation</p>
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div className="settings-section">
                <h2 className="section-title">
                  <span className="section-icon">🎨</span>
                  Display & Appearance
                </h2>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label className="setting-label">Theme</label>
                    <select
                      name="theme"
                      value={settings.theme}
                      onChange={handleInputChange}
                      className="setting-select"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">Font Size</label>
                    <select
                      name="fontSize"
                      value={settings.fontSize}
                      onChange={handleInputChange}
                      className="setting-select"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">Language</label>
                    <select
                      name="language"
                      value={settings.language}
                      onChange={handleInputChange}
                      className="setting-select"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">Timezone</label>
                    <select
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleInputChange}
                      className="setting-select"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="settings-section">
                <h2 className="section-title">
                  <span className="section-icon">🔔</span>
                  Notifications
                </h2>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={settings.emailNotifications}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Email Notifications
                    </label>
                    <p className="setting-description">Receive notifications via email</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="pushNotifications"
                        checked={settings.pushNotifications}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Push Notifications
                    </label>
                    <p className="setting-description">Receive browser push notifications</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="announcementAlerts"
                        checked={settings.announcementAlerts}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Announcement Alerts
                    </label>
                    <p className="setting-description">Get notified about new announcements</p>
                  </div>

                  {user?.role === 'student' && (
                    <div className="setting-item">
                      <label className="setting-label">
                        <input
                          type="checkbox"
                          name="gradeAlerts"
                          checked={settings.gradeAlerts}
                          onChange={handleInputChange}
                          className="setting-checkbox"
                        />
                        <span className="checkmark"></span>
                        Grade Alerts
                      </label>
                      <p className="setting-description">Get notified when grades are posted</p>
                    </div>
                  )}

                  {user?.role === 'faculty' && (
                    <div className="setting-item">
                      <label className="setting-label">
                        <input
                          type="checkbox"
                          name="studentSubmissionAlerts"
                          checked={settings.studentSubmissionAlerts || false}
                          onChange={handleInputChange}
                          className="setting-checkbox"
                        />
                        <span className="checkmark"></span>
                        Student Submission Alerts
                      </label>
                      <p className="setting-description">Get notified when students submit assignments</p>
                    </div>
                  )}

                  {user?.role === 'transferee' && (
                    <div className="setting-item">
                      <label className="setting-label">
                        <input
                          type="checkbox"
                          name="enrollmentRequests"
                          checked={settings.enrollmentRequests || false}
                          onChange={handleInputChange}
                          className="setting-checkbox"
                        />
                        <span className="checkmark"></span>
                        Enrollment Request Alerts
                      </label>
                      <p className="setting-description">Get notified about new enrollment requests</p>
                    </div>
                  )}

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="scheduleReminders"
                        checked={settings.scheduleReminders}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Schedule Reminders
                    </label>
                    <p className="setting-description">Get reminded about upcoming classes</p>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="settings-section">
                <h2 className="section-title">
                  <span className="section-icon">🔒</span>
                  Privacy & Security
                </h2>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label className="setting-label">Profile Visibility</label>
                    <select
                      name="profileVisibility"
                      value={settings.profileVisibility}
                      onChange={handleInputChange}
                      className="setting-select"
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="showOnlineStatus"
                        checked={settings.showOnlineStatus}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Show Online Status
                    </label>
                    <p className="setting-description">Let others see when you're online</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="allowMessages"
                        checked={settings.allowMessages}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Allow Messages
                    </label>
                    <p className="setting-description">Allow others to send you messages</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="dataSharing"
                        checked={settings.dataSharing}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Data Sharing
                    </label>
                    <p className="setting-description">Allow anonymous usage data collection</p>
                  </div>
                </div>
              </div>


              {/* Advanced Settings */}
              <div className="settings-section">
                <h2 className="section-title">
                  <span className="section-icon">⚙️</span>
                  Advanced
                </h2>
                <div className="settings-grid">
                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="autoSave"
                        checked={settings.autoSave}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Auto Save
                    </label>
                    <p className="setting-description">Automatically save changes</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">Auto Logout (minutes)</label>
                    <select
                      name="autoLogout"
                      value={settings.autoLogout}
                      onChange={handleInputChange}
                      className="setting-select"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="0">Never</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="debugMode"
                        checked={settings.debugMode}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Debug Mode
                    </label>
                    <p className="setting-description">Enable debug information and logging</p>
                  </div>

                  <div className="setting-item">
                    <label className="setting-label">
                      <input
                        type="checkbox"
                        name="analytics"
                        checked={settings.analytics}
                        onChange={handleInputChange}
                        className="setting-checkbox"
                      />
                      <span className="checkmark"></span>
                      Analytics
                    </label>
                    <p className="setting-description">Help improve the app with usage analytics</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="settings-actions">
                <button
                  type="button"
                  onClick={resetToDefaults}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Reset to Defaults
                </button>
                
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
