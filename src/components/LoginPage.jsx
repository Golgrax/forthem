import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/student.css';
import schoolBuilding from '../assets/backgrounds/login-background.png';
import schoolLogo from '../assets/logo/login-logo/image.png';

const LoginPage = () => {
  const navigate = useNavigate();

  // I-load ang student CSS para sa login page

  const handleStudentLogin = () => {
    navigate('/student-login');
  };

  const handleFacultyLogin = () => {
    navigate('/faculty-login');
  };

  return (
    <div className="login-container">
      <img 
        src={schoolBuilding} 
        alt="School Building" 
        className="building-image"
      />
      
      <div className="login-content">
        <img 
          src={schoolLogo} 
          alt="School Logo" 
          className="school-logo"
        />
        
        <div>
          <div className="school-title">Sto. Niño Elementary School</div>
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
