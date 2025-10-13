import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Modules = () => {
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

  const modules = [
    {
      subject: 'Science',
      teacher: 'Teacher Santos',
      className: 'science',
      backgroundImage: 'https://api.builder.io/api/v1/image/assets/TEMP/51af17d50f9719552ffa770eb3c2f13cbc916d2c?width=730'
    },
    {
      subject: 'Filipino',
      teacher: 'Teacher Reyes',
      className: 'filipino'
    },
    {
      subject: 'GMRC',
      teacher: 'Teacher Cruz',
      className: 'gmrc'
    },
    {
      subject: 'Mathematics',
      teacher: 'Teacher Fernandez',
      className: 'mathematics'
    },
    {
      subject: 'Araling Panlipunan',
      teacher: 'Teacher Garcia',
      className: 'araling-panlipunan',
      backgroundImage: 'https://api.builder.io/api/v1/image/assets/TEMP/470a65a3418a323d9f5063d10a7d68283fa64907?width=730'
    },
    {
      subject: 'MAPEH',
      teacher: 'Teacher Reyes',
      className: 'mapeh'
    },
    {
      subject: 'EPP',
      teacher: 'Teacher Reyes',
      className: 'epp'
    }
  ];

  const handleModuleClick = (subject) => {
    // Navigate to assignment page with subject context
    navigate('/assignment', { state: { subject } });
  };

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
          <div className="modules-container">
            <div className="modules-grid">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className={`module-card ${module.className}`}
                  onClick={() => handleModuleClick(module.subject)}
                  style={module.backgroundImage ? {
                    backgroundImage: `url(${module.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                  } : {}}
                >
                  <div className="module-subject">{module.subject}</div>
                  <div className="module-teacher">{module.teacher}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;