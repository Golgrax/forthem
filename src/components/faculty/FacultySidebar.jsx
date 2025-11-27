import React from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../icons/DashboardIcon.svg';
import { ReactComponent as MasterlistIcon } from '../icons/MasterlistIcon.svg';
import { ReactComponent as ScheduleIcon } from '../icons/ScheduleIcon.svg';
import { ReactComponent as GradesIcon } from '../icons/GradesIcon.svg';
import { ReactComponent as CloseIcon } from '../icons/CloseIcon.svg';
import schoolLogo from '../../assets/logo/image.png';

const FacultySidebar = ({ isMenuOpen, handleNavigation, navItems, toggleMenu }) => {
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
      case 'grades':
        return <GradesIcon className="nav-icon" />;
      default:
        return <DashboardIcon className="nav-icon" />;
    }
  };

  return (
    <>
      <div className={`sidebar faculty ${isMenuOpen ? 'open' : ''}`}>
        <div className="close-icon" onClick={toggleMenu}>
          <CloseIcon />
        </div>
        <div className="sidebar-header">
          <img
            src={schoolLogo}
            alt="School Logo"
            className="sidebar-logo"
          />
          <div className="sidebar-text">
            <div className="sidebar-school-name">Sto. Niño Elementary School</div>
            <div className="sidebar-system-name">Student Access System</div>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${isActive(item.path) ? 'active faculty' : ''}`}
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

export default FacultySidebar;