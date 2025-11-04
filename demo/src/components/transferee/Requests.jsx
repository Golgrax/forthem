import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TransfereeSidebar from './TransfereeSidebar';
import Header from '../Header';
import '../../style/transferee.css';


const Requests = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load transferee CSS

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const { mockGetEnrollments } = await import('../../services/mockData');
        const data = await mockGetEnrollments();
        setRequests(data.enrollments);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const { mockUpdateEnrollment } = await import('../../services/mockData');
      await mockUpdateEnrollment(id, 'approved');
      setRequests(requests.filter(req => req.id !== id));
    } catch (error) {
      console.error('Error approving request:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleReject = async (id) => {
    try {
      const { mockUpdateEnrollment } = await import('../../services/mockData');
      await mockUpdateEnrollment(id, 'rejected');
      setRequests(requests.filter(req => req.id !== id));
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('An error occurred. Please try again.');
    }
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
            {requests.map(request => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <div className="request-student">{request.student_name}</div>
                  <div className="request-date">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="request-info">
                  <div className="request-detail">Address: {request.student_address}</div>
                  <div className="request-detail">Parent: {request.parent_name}</div>
                  <div className="request-detail">Parent's Address: {request.parent_address}</div>
                </div>
                <div className="request-actions">
                  <button className="btn-approve" onClick={() => handleApprove(request.id)}>Approve</button>
                  <button className="btn-reject" onClick={() => handleReject(request.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;