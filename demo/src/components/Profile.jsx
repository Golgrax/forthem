import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import FacultySidebar from './faculty/FacultySidebar';
import FacultyHeader from './faculty/FacultyHeader';
import TransfereeSidebar from './transferee/TransfereeSidebar';
import '../style/student.css';
import '../style/faculty.css';
import '../style/transferee.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [profilePicture, setProfilePicture] = useState(user?.profile_picture || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleSave = async () => {
    setError('');
    setSuccess('');

    try {
      const { mockUpdateUser } = await import('../services/mockData');
      const updatedUserData = await mockUpdateUser(user.id, {
        profile_picture: profilePicture,
        bio: bio,
      });
      login(updatedUserData.user);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile. Please try again later.');
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
    if (user?.role === 'faculty') {
      return [
        { path: '/faculty/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/faculty/masterlist', icon: 'masterlist', label: 'Masterlist' },
        { path: '/faculty/schedule', icon: 'schedule', label: 'Schedule' }
      ];
    } else if (user?.role === 'transferee') {
      return [
        { path: '/transferee/new-enrollee', icon: 'dashboard', label: 'New Enrollee/s' },
        { path: '/transferee/requests', icon: 'masterlist', label: 'Requests' },
        { path: '/transferee/schedule', icon: 'schedule', label: 'Schedule' }
      ];
    } else {
      return [
        { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/enrollment', icon: 'enrollment', label: 'Enrollment' },
        { path: '/schedule', icon: 'schedule', label: 'Schedule' },
        { path: '/modules', icon: 'modules', label: 'Modules' },
        { path: '/grades', icon: 'grades', label: 'Grades' }
      ];
    }
  };

  const SidebarComponent = user?.role === 'faculty' ? FacultySidebar : 
                          user?.role === 'transferee' ? TransfereeSidebar : Sidebar;
  const HeaderComponent = user?.role === 'faculty' ? FacultyHeader : Header;

  return (
    <div className={`dashboard-container ${user?.role === 'faculty' ? 'faculty-container' : user?.role === 'transferee' ? 'transferee-container' : 'student-container'}`}>
      <SidebarComponent
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={getNavItems()}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <HeaderComponent toggleMenu={toggleMenu} />

        <div className="content-area">
          <div className="profile-container">
            <div className="profile-header">
              <h1>Profile</h1>
            </div>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            
            {user && (
              <div className="profile-content">
                <div className="profile-picture-section">
                  <img 
                    src={profilePicture || user.profile_picture || 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/pfp/me.png'} 
                    alt="Profile" 
                    className="profile-preview"
                  />
                  <div className="picture-info">
                    <h3>Profile Picture</h3>
                    <p>Update your profile picture by entering a valid image URL</p>
                  </div>
                </div>

                <div className="profile-form">
                  <div className="form-group">
                    <label htmlFor="profilePicture">Profile Picture URL:</label>
                    <input
                      type="url"
                      id="profilePicture"
                      value={profilePicture}
                      onChange={(e) => setProfilePicture(e.target.value)}
                      className="input-field"
                      placeholder="Enter profile picture URL"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="input-field textarea-field"
                      placeholder="Tell us about yourself..."
                      rows="4"
                    />
                  </div>

                  <button onClick={handleSave} className="btn-primary">
                    Save Changes
                  </button>
                </div>

                <div className="profile-info">
                  <div className="info-item">
                    <strong>Username:</strong> {user.username}
                  </div>
                  <div className="info-item">
                    <strong>Role:</strong> {user.role}
                  </div>
                  {bio && (
                    <div className="info-item">
                      <strong>Bio:</strong> 
                      <div className="bio-content">{bio}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;