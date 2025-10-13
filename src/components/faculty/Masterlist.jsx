import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import Header from '../Header';
import '../../style/faculty.css';

const Masterlist = () => {
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

  const maleStudents = [
    'Cruz, Rafael Javier Luis I.',
    'Dela Cruz, Andrei Jhay R.',
    'Mendoza, Samuel Eduardo C.',
    'Reyes, Carlos Antonio',
    'Santos, Miguel Alejandro T.'
  ];

  const femaleStudents = [
    'Alvarez, Sofia Renee M.',
    'Flores, Isabella J.',
    'Ladisla, Maria Christina I.',
    'Santos, Ana Gabrielle E.',
    'Torres, Carla Beatriz T.'
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
          <div className="masterlist-wrapper">
            <div className="masterlist-header-section">
              <div className="masterlist-header-text">
                <div className="header-line">Republic of the Philippines</div>
                <div className="header-deped">Department of Education</div>
                <div className="header-line">National Capital Region</div>
                <div className="header-line">Schools Division of Parañaque City</div>
                <div className="masterlist-title">MASTERLIST</div>
                <div className="masterlist-sy">S.Y. 2025-2026</div>
              </div>
            </div>

            <div className="masterlist-content">
              <div className="gender-section">
                <div className="gender-header male-header">MALE</div>
                <div className="students-list">
                  {maleStudents.map((student, index) => (
                    <div key={index} className="student-name">{student}</div>
                  ))}
                </div>
              </div>

              <div className="gender-section">
                <div className="gender-header female-header">FEMALE</div>
                <div className="students-list">
                  {femaleStudents.map((student, index) => (
                    <div key={index} className="student-name">{student}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Masterlist;