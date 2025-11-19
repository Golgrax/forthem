import React, { useState } from 'react';
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
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const fullName = user?.role === 'faculty' ? 'Jane Cruz' : 'John Doe';
  const lrn = '136754200001';

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
            
            {user && (
              <div className="profile-content">
                <div className="profile-picture-section">
                  <img 
                    src={'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} 
                    alt="Profile" 
                    className="profile-preview"
                  />
                  <div className="picture-info">
                    <h3>{fullName}</h3>
                    <p>{lrn}</p>
                  </div>
                </div>

                <div className="profile-info">
                  <div className="info-item">
                    <strong>Sex at Birth:</strong> <span className="info-value">{'Male'}</span>
                  </div>
                  <div className="info-item">
                    <strong>Date of Birth:</strong> <span className="info-value">{'January 1, 2000'}</span>
                  </div>
                  <div className="info-item">
                    <strong>Place of Birth:</strong> <span className="info-value">{'Manila'}</span>
                  </div>
                </div>

                <div className="profile-info">
                  <h4>Parent/Guardian's Information</h4>
                  <div className="info-item">
                    <strong>Full Name:</strong> <span className="info-value">{'Juan Dela Cruz'}</span>
                  </div>
                  <div className="info-item">
                    <strong>Contact Number:</strong> <span className="info-value">{'09123456789'}</span>
                  </div>
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