import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/student-login');
  };

  const handleFacultyLogin = () => {
    // For demo purposes, faculty login goes to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <img 
        src="https://api.builder.io/api/v1/image/assets/TEMP/af781ced33eb3b1640d9d08ddfb90b39597c5a15?width=2514" 
        alt="School Building" 
        className="building-image"
      />
      
      <div className="login-content">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/f67440401deeb09734fd0bd25c5831aea47eed28?width=300" 
          alt="School Logo" 
          className="school-logo"
        />
        
        <div>
          <div className="school-title">STO. NIÑO ELEMENTARY SCHOOL</div>
          <div className="school-subtitle">Student Access System</div>
        </div>
        
        <div className="login-buttons">
          <button 
            className="student-button"
            onClick={handleStudentLogin}
          >
            Student
          </button>
          
          <button 
            className="faculty-button"
            onClick={handleFacultyLogin}
          >
            Faculty
          </button>
        </div>
        
        <div className="terms-text">
          By using this service, you understood and agree to the SNES Online Services Terms of Use and Privacy Statement.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
