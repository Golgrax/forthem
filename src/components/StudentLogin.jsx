import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    learnerNumber: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, any input will navigate to dashboard
    if (formData.learnerNumber && formData.password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="student-login-container">
      <img 
        src="https://api.builder.io/api/v1/image/assets/TEMP/c4b4e3c4c61e2be26c2691fb84abff2c1606d088?width=2514" 
        alt="School Building" 
        className="building-image"
      />
      
      <div className="login-form-content">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/f67440401deeb09734fd0bd25c5831aea47eed28?width=300" 
          alt="School Logo" 
          className="school-logo"
        />
        
        <div>
          <div className="school-title">STO. NIÑO ELEMENTARY SCHOOL</div>
          <div className="school-subtitle">Student Access System</div>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="learnerNumber"
            placeholder="Learner's Reference Number"
            className="input-field"
            value={formData.learnerNumber}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          
          <button type="submit" className="signin-button">
            Sign-in
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
