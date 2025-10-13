import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import Header from '../Header';
import '../../style/faculty.css';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/faculty/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/faculty/masterlist', icon: 'masterlist', label: 'Masterlist' },
    { path: '/faculty/schedule', icon: 'schedule', label: 'Schedule' },
  ];

  return (
    <div className="dashboard-container faculty-dashboard">
      <FacultySidebar
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={navItems}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <Header toggleMenu={toggleMenu} />

        <div className="content-area">
          <div className="faculty-dashboard-wrapper">
            <div className="posted-section">
              <div className="section-header">
                <div className="section-title">POSTED ANNOUNCEMENTS</div>
                <button className="add-button" onClick={() => navigate('/faculty/create-announcement')}>+</button>
              </div>

              <div className="announcement-card faculty-card">
                <div className="announcement-header">
                  <div className="announcement-teacher-info">
                    <img
                      src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174"
                      alt="Faculty Avatar"
                      className="teacher-avatar"
                    />
                    <div className="teacher-name">You</div>
                  </div>
                  <div className="announcement-date">Feb 11 2025</div>
                </div>
                <div className="announcement-text">
                  Hello, V-Molave!
                  Please do your Module 5 for this week's activity.

                  Thank you!
                </div>
              </div>
            </div>

            <div className="posted-section">
              <div className="section-header">
                <div className="section-title">POSTED UPCOMING REMINDERS</div>
                <button className="add-button" onClick={() => navigate('/faculty/create-reminder')}>+</button>
              </div>

              <div className="reminder-card faculty-card">
                <div className="reminder-header">
                  <div className="reminder-teacher-info">
                    <img
                      src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174"
                      alt="Faculty Avatar"
                      className="teacher-avatar"
                    />
                    <div className="teacher-name">You</div>
                    <div className="subject-tags">
                      <span className="subject-tag gmrc">GMRC</span>
                      <span className="subject-tag molave">V - Molave</span>
                      <button className="tag-add-btn">+</button>
                    </div>
                  </div>
                  <div className="reminder-date">DUE ON Sept 24 2025</div>
                </div>
                <div className="reminder-content">
                  <div className="reminder-title">Assignment #1</div>
                  <div className="reminder-text">Be creative and make a family tree in your household.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;