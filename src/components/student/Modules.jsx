import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import '../../style/student.css';

const Modules = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load student CSS

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/modules');
        if (response.ok) {
          const data = await response.json();
          setModules(data.modules);
        } else {
          setError('Failed to fetch modules');
        }
      } catch (error) {
        setError('Error fetching modules: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

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

  const getModuleClassName = (subject) => {
    const subjectMap = {
      'Science': 'science',
      'Filipino': 'filipino',
      'GMRC': 'gmrc',
      'Mathematics': 'mathematics',
      'Araling Panlipunan': 'araling-panlipunan',
      'MAPEH': 'mapeh',
      'EPP': 'epp'
    };
    return subjectMap[subject] || 'default';
  };

  const getModuleBackgroundImage = (subject) => {
    const imageMap = {
      'Science': 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/modules/science.png',
      'Araling Panlipunan': 'https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/modules/araling-panlipunan.png'
    };
    return imageMap[subject];
  };

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
            {loading ? (
              <div>Loading modules...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div className="modules-grid">
                {modules.map((module, index) => (
                  <div
                    key={index}
                    className={`module-card ${getModuleClassName(module.subject)}`}
                    onClick={() => handleModuleClick(module.subject)}
                    style={getModuleBackgroundImage(module.subject) ? {
                      backgroundImage: `url(${getModuleBackgroundImage(module.subject)})`,
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;