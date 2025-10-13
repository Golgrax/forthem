import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransfereeSidebar from './TransfereeSidebar';
import Header from '../Header';
import '../../style/transferee.css';

const Requests = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [requests, setRequests] = useState([
    {
      id: 1,
      studentName: 'Maria Santos',
      previousSchool: 'San Juan Elementary School',
      gradeLevel: 'Grade 5',
      dateSubmitted: 'Feb 15, 2025',
      status: 'pending'
    },
    {
      id: 2,
      studentName: 'Juan Dela Cruz',
      previousSchool: 'Manila Central School',
      gradeLevel: 'Grade 4',
      dateSubmitted: 'Feb 14, 2025',
      status: 'pending'
    },
    {
      id: 3,
      studentName: 'Ana Garcia',
      previousSchool: 'Quezon City Elementary',
      gradeLevel: 'Grade 6',
      dateSubmitted: 'Feb 13, 2025',
      status: 'pending'
    }
  ]);

  const handleApprove = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const handleReject = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <div className="requests-content">
            <h1 className="welcome-title">Transferee Requests</h1>

            {requests.filter(req => req.status === 'pending').length === 0 ? (
              <p className="welcome-description">No pending requests at the moment.</p>
            ) : (
              requests.map(request => (
                <div key={request.id} className="request-card">
                  <div className="request-header">
                    <h2 className="request-student">{request.studentName}</h2>
                    <span className="request-date">{request.dateSubmitted}</span>
                  </div>

                  <div className="request-info">
                    <p className="request-detail">
                      <strong>Previous School:</strong> {request.previousSchool}
                    </p>
                    <p className="request-detail">
                      <strong>Grade Level:</strong> {request.gradeLevel}
                    </p>
                    <p className="request-detail">
                      <strong>Status:</strong> {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </p>
                  </div>

                  {request.status === 'pending' && (
                    <div className="request-actions">
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(request.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleReject(request.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;