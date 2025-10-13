import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Assignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subject = location.state?.subject || 'SCIENCE';
  const [activeTab, setActiveTab] = useState('assignment');
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
          <div className="assignment-container">
            <div className="assignment-header">
              <div className="header-left">
                <span className="header-subject">{subject}</span>
                <div className="header-tabs">
                  <span
                    className={`header-tab ${activeTab === 'assignment' ? 'active' : ''}`}
                    onClick={() => setActiveTab('assignment')}
                  >
                    Assignment
                  </span>
                  <span
                    className={`header-tab ${activeTab === 'files' ? 'active' : ''}`}
                    onClick={() => setActiveTab('files')}
                  >
                    Files
                  </span>
                </div>
              </div>
            </div>
            <div className="assignment-content">
              <div className="assignment-card-container">
                <h2 className="assignment-card-title">Assignment 1 - Property of Matters</h2>
                <div className="assignment-card-meta">
                  <span>Due August 26,2025</span>
                  <span>11:59 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;