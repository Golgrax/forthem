import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { mockGetAssignments } from '../../services/mockData';
import '../../style/student.css';

const Assignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subject = location.state?.subject || 'SCIENCE';
  const [activeTab, setActiveTab] = useState('assignment');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await mockGetAssignments();
        // Filter by subject if needed
        const filtered = data.assignments.filter(a => 
          a.subject.toLowerCase() === subject.toLowerCase()
        );
        setAssignments(filtered.length > 0 ? filtered : data.assignments);
      } catch (error) {
        setError('Error fetching assignments: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [subject]);

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
          <div className="assignment-container">
            <div className="assignment-header">
              <div className="header-left">
                <span className="header-subject">{subject}</span>
                <div className="header-tabs">
                  <span
                    className={`header-tab ${activeTab === 'assignment' ? 'active' : ''}`}
                    onClick={() => setActiveTab('assignment')}
                  >
                    Assignment
                  </span>
                  <span
                    className={`header-tab ${activeTab === 'files' ? 'active' : ''}`}
                    onClick={() => setActiveTab('files')}
                  >
                    Files
                  </span>
                </div>
              </div>
            </div>
                <div className="assignment-content">
                  {loading ? (
                    <div>Loading assignments...</div>
                  ) : error ? (
                    <div>{error}</div>
                  ) : assignments.length > 0 ? (
                    assignments.map((assignment, index) => (
                      <div key={index} className="assignment-card-container">
                        <h2 className="assignment-card-title">{assignment.title}</h2>
                        <div className="assignment-card-meta">
                          <span>Due {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          <span>{new Date(assignment.dueDate).toLocaleTimeString()}</span>
                        </div>
                        <div className="assignment-description">
                          {assignment.description}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="assignment-card-container">
                      <h2 className="assignment-card-title">Assignment 1 - Property of Matters</h2>
                      <div className="assignment-card-meta">
                        <span>Due August 26,2025</span>
                        <span>11:59 PM</span>
                      </div>
                    </div>
                  )}
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;

