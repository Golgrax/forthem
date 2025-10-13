import React from 'react';
import { ReactComponent as NotificationIcon } from './icons/NotificationIcon.svg';
import { ReactComponent as HamburgerIcon } from './icons/HamburgerIcon.svg';

const Header = ({ toggleMenu }) => {
  return (
    <div className="header">
      <div className="mobile-header">
        <HamburgerIcon onClick={toggleMenu} />
      </div>
      <div className="header-icons">
        <NotificationIcon />
        <img
          src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174"
          alt="User Avatar"
          className="user-avatar"
        />
      </div>
    </div>
  );
};

export default Header;