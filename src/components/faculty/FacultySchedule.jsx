import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import Header from '../Header';
import '../../style/faculty.css';

const FacultySchedule = () => {
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
          <div className="schedule-wrapper">
            <div className="schedule-table">
              <div className="schedule-header">
                <div className="time-header">TIME<br/>ALLOTMENT</div>
                <div className="day-header">MONDAY</div>
                <div className="day-header">TUESDAY</div>
                <div className="day-header">WEDNESDAY</div>
                <div className="day-header">THURSDAY</div>
                <div className="day-header">FRIDAY</div>
              </div>

              <div className="schedule-body">
                <div className="schedule-row">
                  <div className="time-cell">8:00 - 9:00</div>
                  <div className="subject-cell">MATH</div>
                  <div className="subject-cell">SCIENCE</div>
                  <div className="subject-cell">FILIPINO</div>
                  <div className="subject-cell">ENGLISH</div>
                  <div className="subject-cell">MAPEH</div>
                </div>
                <div className="schedule-row">
                  <div className="time-cell">9:00 - 10:00</div>
                  <div className="subject-cell">SCIENCE</div>
                  <div className="subject-cell">MATH</div>
                  <div className="subject-cell">ENGLISH</div>
                  <div className="subject-cell">FILIPINO</div>
                  <div className="subject-cell">AP</div>
                </div>
                <div className="schedule-row break-row">
                  <div className="time-cell">10:00 - 10:15</div>
                  <div className="subject-cell break-cell" colSpan={5}>BREAK</div>
                </div>
                <div className="schedule-row">
                  <div className="time-cell">10:15 - 11:15</div>
                  <div className="subject-cell">ENGLISH</div>
                  <div className="subject-cell">FILIPINO</div>
                  <div className="subject-cell">MATH</div>
                  <div className="subject-cell">SCIENCE</div>
                  <div className="subject-cell">GMRC</div>
                </div>
                <div className="schedule-row">
                  <div className="time-cell">11:15 - 12:00</div>
                  <div className="subject-cell">FILIPINO</div>
                  <div className="subject-cell">ENGLISH</div>
                  <div className="subject-cell">AP</div>
                  <div className="subject-cell">GMRC</div>
                  <div className="subject-cell">EPP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultySchedule;