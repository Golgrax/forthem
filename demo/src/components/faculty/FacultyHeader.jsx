import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ReactComponent as ProfileIcon } from '../icons/profile.svg';
import { ReactComponent as SettingsIcon } from '../icons/settings.svg';
import { ReactComponent as LogoutIcon } from '../icons/logout.svg';
import { ReactComponent as NotificationIcon } from '../icons/NotificationIcon.svg';
import { ReactComponent as HamburgerIcon } from '../icons/HamburgerIcon.svg';

const FacultyHeader = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div className="header">
      <div className="mobile-header">
        <HamburgerIcon onClick={toggleMenu} />
      </div>
      <div className="header-icons">
        <NotificationIcon />
        <div className="user-menu-container" ref={userMenuRef}>
          <img
            src={user?.profile_picture}
            alt="User Avatar"
            className="user-avatar"
            onClick={toggleUserMenu}
            style={{ cursor: 'pointer' }}
          />
          {showUserMenu && (
            <div className="user-menu">
              <div className="user-info">
                <div className="user-name">{user?.username}</div>
                <div className="user-role">{user?.role}</div>
              </div>
              <div className="user-menu-divider"></div>
              
              <div className="user-menu-options">
                <button 
                  className="menu-option" 
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate(`/profile`);
                  }}
                >
                  <ProfileIcon className="menu-icon" />
                  Edit Profile
                </button>
                
                <button 
                  className="menu-option" 
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate(`/${user?.role}/settings`);
                  }}
                >
                  <SettingsIcon className="menu-icon" />
                  Settings
                </button>
                
                <div className="menu-divider"></div>
                
                <button className="menu-option logout-option" onClick={handleLogout}>
                  <LogoutIcon className="menu-icon" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyHeader;
