import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/student-login');
  };

  const handleFacultyLogin = () => {
    navigate('/faculty-login');
  };

  return (
    <div className="login-container">
      <img 
        src="https://raw.githubusercontent.com/Golgrax/forthem-assets/refs/heads/main/students/backgrounds/school/image.png?width=2514" 
        alt="School Building" 
        className="building-image"
      />
      
      <div className="login-content">
        <img 
          src="https://raw.githubusercontent.com/Golgrax/forthem-assets/refs/heads/main/students/logo/login-logo/image.png?width=300" 
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
