import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { mockGetGrades } from '../../services/mockData';
import '../../style/student.css';

const Grades = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      const fetchGrades = async () => {
        try {
          setLoading(true);
          const data = await mockGetGrades(user.id);
          setGrades(data.grades);
        } catch (error) {
          setError('Error fetching grades: ' + error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchGrades();
    }
  }, [user]);

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
          <div className="grades-container">
            {loading ? (
              <div>Loading grades...</div>
            ) : error ? (
              <div>{error}</div>
            ) : grades.length > 0 ? (
              <div className="grades-table">
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((grade, index) => (
                      <tr key={index}>
                        <td>{grade.subject}</td>
                        <td>{grade.grade}</td>
                        <td>{grade.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <img
                src="https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/grades/report-card.png"
                alt="Report Card"
                className="grades-image"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;

