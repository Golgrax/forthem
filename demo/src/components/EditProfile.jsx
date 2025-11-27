import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import TransfereeSidebar from './transferee/TransfereeSidebar';



const EditProfile = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    department: '',
    position: '',
    studentId: '',
    yearLevel: '',
    course: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        department: user.department || '',
        position: user.position || '',
        studentId: user.studentId || '',
        yearLevel: user.yearLevel || '',
        course: user.course || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Burahin ang mga error kapag nagsimulang mag-type ang user
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // I-simulate ang API call - sa totoong app, ia-update nito ang backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // I-update ang konteksto ng user gamit ang bagong data
      const updatedUser = {
        ...user,
        ...formData
      };
      
      login(updatedUser);
      setSuccess('Profile updated successfully!');
      
      // I-clear ang success message pagkatapos ng 3 segundo
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

  const getRoleSpecificFields = () => {
    switch (user?.role) {
      case 'student':
        return (
          <>
            <div className="form-group">
              <label htmlFor="studentId">Student ID</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter student ID"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="yearLevel">Year Level</label>
              <select
                id="yearLevel"
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleInputChange}
                className="input-field"
                disabled={isLoading}
              >
                <option value="">Select year level</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="course">Course/Program</label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter course or program"
                disabled={isLoading}
              />
            </div>
          </>
        );
      case 'faculty':
        return (
          <>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter department"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter position"
                disabled={isLoading}
              />
            </div>
          </>
        );
      case 'transferee':
        return (
          <>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter department"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter position"
                disabled={isLoading}
              />
            </div>
          </>
        );
      default:
        return null;
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
      default:
        return 'dashboard-container';
    }
  };

  const getContentClass = () => {
    switch (user?.role) {
      case 'transferee':
        return 'transferee-content';
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
          <div className="profile-container">
            <div className="profile-header">
              <h1 className="profile-title">Edit Profile</h1>
              <p className="profile-subtitle">Update your personal information</p>
            </div>

            <form onSubmit={handleSubmit} className="profile-form">
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

              <div className="form-section">
                <h3 className="section-title">Basic Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Enter first name"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Enter last name"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter username"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter email address"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter phone number"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">
                  {user?.role === 'student' ? 'Academic Information' : 'Professional Information'}
                </h3>
                
                {getRoleSpecificFields()}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
