import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransfereeSidebar from './TransfereeSidebar';
import Header from '../Header';


const NewEnrollee = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/transferee/new-enrollee', icon: 'dashboard', label: 'New Enrollee/s' },
    { path: '/transferee/requests', icon: 'masterlist', label: 'Requests' },
    { path: '/transferee/schedule', icon: 'schedule', label: 'Schedule' },
  ];

  return (
    <div className="dashboard-container transferee-container">
      <TransfereeSidebar
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={navItems}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <Header toggleMenu={toggleMenu} />

        <div className="content-area">
          <div className="new-enrollee-content">
            <div className="enrollee-welcome">
              <h1 className="welcome-title">Welcome to New Enrollee Section</h1>
              <p className="welcome-description">
                This section is dedicated to managing new transferee students. Here you can view enrollment requests,
                process documentation, and manage the onboarding of new students to Sto. Niño Elementary School.
              </p>
              <p className="welcome-description">
                Use the navigation menu to access different sections: view and approve requests, manage schedules,
                and track the enrollment progress of transferee students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEnrollee;