import React from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../icons/DashboardIcon.svg';
import { ReactComponent as MasterlistIcon } from '../icons/MasterlistIcon.svg';
import { ReactComponent as ScheduleIcon } from '../icons/ScheduleIcon.svg';
import { ReactComponent as CloseIcon } from '../icons/CloseIcon.svg';

const TransfereeSidebar = ({ isMenuOpen, handleNavigation, navItems, toggleMenu }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getNavIcon = (iconType) => {
    switch (iconType) {
      case 'dashboard':
        return <DashboardIcon className="nav-icon" />;
      case 'masterlist':
        return <MasterlistIcon className="nav-icon" />;
      case 'schedule':
        return <ScheduleIcon className="nav-icon" />;
      default:
        return <DashboardIcon className="nav-icon" />;
    }
  };

  return (
    <>
      <div className={`sidebar transferee-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="close-icon" onClick={toggleMenu}>
          <CloseIcon />
        </div>
        <div className="sidebar-header">
          <img
            src="https://raw.githubusercontent.com/Golgrax/forthem-assets/refs/heads/main/students/logo/image.png?width=174"
            alt="School Logo"
            className="sidebar-logo"
          />
          <div className="sidebar-text">
            <div className="sidebar-school-name">STO. NIÑO ELEMENTARY SCHOOL</div>
            <div className="sidebar-system-name">Student Access System</div>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${isActive(item.path) ? 'active transferee' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              {getNavIcon(item.icon)}
              <span className="nav-text">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      {isMenuOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default TransfereeSidebar;