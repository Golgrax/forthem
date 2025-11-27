import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import FacultyHeader from './FacultyHeader';


const Masterlist = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load faculty CSS

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { mockGetStudents } = await import('../../services/mockData');
        const data = await mockGetStudents();
        setStudents(data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

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
    { path: '/faculty/grades', icon: 'grades', label: 'Grades' },
  ];

  return (
    <div className="dashboard-container faculty-dashboard faculty-container">
      <FacultySidebar
        isMenuOpen={isMenuOpen}
        handleNavigation={handleNavigation}
        navItems={navItems}
        toggleMenu={toggleMenu}
      />

      <div className="main-content">
        <FacultyHeader toggleMenu={toggleMenu} />

        <div className="content-area">
          <div className="masterlist-wrapper">
            <div className="masterlist-header-section">
              <div className="masterlist-header-text">
                <div className="header-line">Republic of the Philippines</div>
                <div className="header-line">Department of Education</div>
                <div className="header-deped">Region V - Bicol</div>
                <div className="header-line">Division of Camarines Sur</div>
              </div>
              <div className="masterlist-title">MASTERLIST</div>
              <div className="masterlist-sy">S.Y. 2025 - 2026</div>
            </div>

            <div className="masterlist-content">
              <div className="gender-section">
                <div className="gender-header male-header">MALE</div>
                <div className="students-list">
                  {students.filter((_, i) => i % 2 === 0).map(student => (
                    <div key={student.id} className="student-name">{student.username}</div>
                  ))}
                </div>
              </div>
              <div className="gender-section">
                <div className="gender-header female-header">FEMALE</div>
                <div className="students-list">
                  {students.filter((_, i) => i % 2 !== 0).map(student => (
                    <div key={student.id} className="student-name">{student.username}</div>
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