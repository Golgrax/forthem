import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Dashboard = () => {
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
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/enrollment', icon: 'enrollment', label: 'Enrollment' },
    { path: '/schedule', icon: 'schedule', label: 'Schedule' },
    { path: '/modules', icon: 'modules', label: 'Modules' },
    { path: '/grades', icon: 'grades', label: 'Grades' }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={navItems}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <Header toggleMenu={toggleMenu} />

        <div className="content-area">
          <div className="dashboard-content-wrapper">
            <div className="welcome-section">
              <div className="welcome-text">Welcome, Jay Andrei!</div>
              <img
                src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=602"
                alt="Welcome"
                className="welcome-image"
              />
            </div>

            <div className="announcements-section">
              <div className="announcements-title">CLASS ANNOUNCEMENTS</div>
              <div className="announcement-card">
                <div className="announcement-header">
                  <div className="announcement-teacher-info">
                    <img
                      src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/teacher.png?raw=true?width=174"
                      alt="Teacher Avatar"
                      className="teacher-avatar"
                    />
                    <div className="teacher-name">Teacher Ann</div>
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

            <div className="reminder-section">
              <div className="reminder-title">REMINDER</div>

              <div className="subject-reminder">
                <div className="subject-name">SCIENCE</div>
                <div className="assignments-list">
                  <div className="assignment-item">
                    <div className="assignment-circle"></div>
                    <div className="assignment-details">
                      <div className="assignment-name">Assignment #1</div>
                      <div className="assignment-date">Sept 23 2025</div>
                    </div>
                  </div>
                  <div className="assignment-item">
                    <div className="assignment-circle"></div>
                    <div className="assignment-details">
                      <div className="assignment-name">Assignment #2</div>
                      <div className="assignment-date">Sept 24 2025</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="subject-reminder">
                <div className="subject-name">MAPEH</div>
                <div className="assignments-list">
                  <div className="assignment-item">
                    <div className="assignment-circle"></div>
                    <div className="assignment-details">
                      <div className="assignment-name">Assignment #1</div>
                      <div className="assignment-date">Sept 24 2025</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="subject-reminder">
                <div className="subject-name">GMRC</div>
                <div className="assignments-list">
                  <div className="assignment-item">
                    <div className="assignment-circle"></div>
                    <div className="assignment-details">
                      <div className="assignment-name">Assignment #1</div>
                      <div className="assignment-date">Sept 24 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;