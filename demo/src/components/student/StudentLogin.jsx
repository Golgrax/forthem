import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { mockLogin } from '../../services/mockData';
import '../../style/student.css';
import schoolBuilding from '../../assets/backgrounds/school/image.png';
import schoolLogo from '../../assets/logo/login-logo/image.png';

const StudentLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    learnerNumber: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Accept any login - auto-login with demo student
      const data = await mockLogin(formData.learnerNumber || 'demo', formData.password || 'demo');
      if (data.user) {
        login({ ...data.user, role: 'student' });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-login-container">
      <img 
        src={schoolBuilding} 
        alt="School Building" 
        className="building-image"
      />
      
      <div className="login-form-content">
        <img 
          src={schoolLogo} 
          alt="School Logo" 
          className="school-logo"
        />
        
        <div>
          <div className="school-title">Sto. Niño Elementary School</div>
          <div className="school-subtitle">Student Access System</div>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="learnerNumber"
            placeholder="Learner's Reference Number (any input works)"
            className="input-field"
            value={formData.learnerNumber}
            onChange={handleInputChange}
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password (any input works)"
            className="input-field"
            value={formData.password}
            onChange={handleInputChange}
          />
          
          <button 
            type="submit" 
            className="signin-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign-in'}
          </button>
          
          <div className="forgot-password">
            Forgot Password?
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;

