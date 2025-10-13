import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { ReactComponent as CheckIcon } from '../icons/CheckIcon.svg';
import { ReactComponent as EditIcon } from '../icons/EditIcon.svg';

const Enrollment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3 && !isEnrolled) {
      setIsEnrolled(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCertificateClick = () => {
    setShowDocument(true);
  };

  const renderStepContent = () => {
    if (showDocument) {
      return (
        <div className="enrollment-form-document">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/96505abbd937387eec56935ab2863bed112cbf86?width=2786" 
            alt="Basic Education Enrollment Form" 
            className="enrollment-document-image"
          />
        </div>
      );
    }

    if (isEnrolled) {
      return (
        <div className="confirmation-container">
          <div className="confirmation-box">
            <div className="success-icon-wrapper">
              <svg className="success-icon" width="74" height="74" viewBox="0 0 75 75" fill="none">
              <path d="M74.375 37.1875C74.375 40.6539 71.8814 43.2537 69.6801 45.548C68.4283 46.8562 67.1334 48.2043 66.6453 49.3896C66.1937 50.4754 66.1672 52.275 66.1406 54.0182C66.0908 57.2588 66.0377 60.9311 63.4844 63.4844C60.9311 66.0377 57.2588 66.0908 54.0182 66.1406C52.275 66.1672 50.4754 66.1937 49.3896 66.6453C48.2043 67.1334 46.8562 68.4283 45.548 69.6801C43.2537 71.8814 40.6539 74.375 37.1875 74.375C33.7211 74.375 31.1213 71.8814 28.827 69.6801C27.5187 68.4283 26.1707 67.1334 24.9854 66.6453C23.8996 66.1937 22.1 66.1672 20.3568 66.1406C17.1162 66.0908 13.4439 66.0377 10.8906 63.4844C8.3373 60.9311 8.28418 57.2588 8.23438 54.0182C8.20781 52.275 8.18125 50.4754 7.72969 49.3896C7.2416 48.2043 5.94668 46.8562 4.69492 45.548C2.49355 43.2537 0 40.6539 0 37.1875C0 33.7211 2.49355 31.1213 4.69492 28.827C5.94668 27.5187 7.2416 26.1707 7.72969 24.9854C8.18125 23.8996 8.20781 22.1 8.23438 20.3568C8.28418 17.1162 8.3373 13.4439 10.8906 10.8906C13.4439 8.3373 17.1162 8.28418 20.3568 8.23438C22.1 8.20781 23.8996 8.18125 24.9854 7.72969C26.1707 7.2416 27.5187 5.94668 28.827 4.69492C31.1213 2.49355 33.7211 0 37.1875 0C40.6539 0 43.2537 2.49355 45.548 4.69492C46.8562 5.94668 48.2043 7.2416 49.3896 7.72969C50.4754 8.18125 52.275 8.20781 54.0182 8.23438C57.2588 8.28418 60.9311 8.3373 63.4844 10.8906C66.0377 13.4439 66.0908 17.1162 66.1406 20.3568C66.1672 22.1 66.1937 23.8996 66.6453 24.9854C67.1334 26.1707 68.4283 27.5187 69.6801 28.827C71.8814 31.1213 74.375 33.7211 74.375 37.1875Z" fill="#06B228"/>
              <path d="M14.6667 31.5L6 22.8333L3.5 25.3333L14.6667 36.5L36.5 14.6667L34 12.1667L14.6667 31.5Z" fill="white"/>
              </svg>
            </div>
            <div className="confirmation-message">You are officially enrolled.</div>
            <button className="certificate-button" onClick={handleCertificateClick}>
              <svg className="certificate-icon" width="22" height="27" viewBox="0 0 22 27" fill="none">
                <path d="M19.25 27C19.9793 27 20.6788 26.7155 21.1945 26.2092C21.7103 25.7028 22 25.0161 22 24.3V8.3098C22 8.1756 21.9461 8.04704 21.8503 7.95302L13.8959 0.143218C13.8024 0.0514271 13.6766 0 13.5456 0H2.75C2.02065 0 1.32118 0.284463 0.805456 0.790812C0.289731 1.29716 0 1.98392 0 2.7V24.3C0 25.0161 0.289731 25.7028 0.805456 26.2092C1.32118 26.7155 2.02065 27 2.75 27H19.25ZM12.375 3.89162C12.375 3.44837 12.909 3.2243 13.2253 3.53483L18.3774 8.59322C18.6968 8.90685 18.4747 9.45 18.0271 9.45H12.875C12.5989 9.45 12.375 9.22614 12.375 8.95V3.89162ZM4.125 8.6C4.125 8.32386 4.34886 8.1 4.625 8.1H7.75C8.02614 8.1 8.25 8.32386 8.25 8.6V10.3C8.25 10.5761 8.02614 10.8 7.75 10.8H4.625C4.34886 10.8 4.125 10.5761 4.125 10.3V8.6ZM4.125 14C4.125 13.7239 4.34886 13.5 4.625 13.5H17.375C17.6511 13.5 17.875 13.7239 17.875 14V15.7C17.875 15.9761 17.6511 16.2 17.375 16.2H4.625C4.34886 16.2 4.125 15.9761 4.125 15.7V14ZM4.125 19.4C4.125 19.1239 4.34886 18.9 4.625 18.9H17.375C17.6511 18.9 17.875 19.1239 17.875 19.4V21.1C17.875 21.3761 17.6511 21.6 17.375 21.6H4.625C4.34886 21.6 4.125 21.3761 4.125 21.1V19.4Z" fill="white"/>
              </svg>
              Certificate of Registration
            </button>
          </div>
        </div>
      );
    }

    switch(currentStep) {
      case 1:
        return (
          <div className="enrollment-form with-scroll">
            <div className="form-header">
              <div className="form-title">LEARNER'S INFORMATION</div>
            </div>
            <div className="form-content-scrollable">
              <div className="form-row basic-info">
                <div className="form-group">
                  <div className="form-label">School Year</div>
                  <div className="form-value">2025 - 2026</div>
                </div>
                <div className="form-group">
                  <div className="form-label">Grade level to Enroll</div>
                  <div className="form-value">Grade 5</div>
                </div>
                <div className="form-group">
                  <div className="form-label">Learner Reference No.</div>
                  <div className="form-value">137591411505</div>
                </div>
                <div className="form-group">
                  <div className="form-label">Birthday (mm/dd/yyyy)</div>
                  <div className="form-value">01/27/2018</div>
                </div>
                <div className="form-group">
                  <div className="form-label">Sex</div>
                  <div className="form-value">Male</div>
                </div>
                <div className="form-group">
                  <div className="form-label">Age</div>
                  <div className="form-value">7</div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-title">Learner's Name</div>
                <div className="form-row">
                  <div className="form-group">
                    <div className="form-label">Last Name</div>
                    <div className="form-value">Dela Cruz</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">First Name</div>
                    <div className="form-value">Jay Andrei</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Middle Name</div>
                    <div className="form-value">Ramos</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Extension Name e.g. Jr., III (If applicable)</div>
                    <div className="form-value"></div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Place of Birth (Municipality City)</div>
                    <div className="form-value">Parañaque City</div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-title">Current Address</div>
                <div className="section-edit-icon">
                  <EditIcon />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <div className="form-label">House No.</div>
                    <div className="form-value">10</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Sitio/Street Name</div>
                    <div className="form-value">Purok 2</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Barangay</div>
                    <div className="form-value">Santo Niño</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Municipality/City</div>
                    <div className="form-value">Parañaque City</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Province</div>
                    <div className="form-value">Metro Manila</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Country</div>
                    <div className="form-value">Philippines</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Zip Code</div>
                    <div className="form-value">1704</div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-title">Permanent Address</div>
                <div className="form-row">
                  <div className="form-group">
                    <div className="form-label">House No.</div>
                    <div className="form-value">10</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Sitio/Street Name</div>
                    <div className="form-value">Purok 2</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Barangay</div>
                    <div className="form-value">Santo Niño</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Municipality/City</div>
                    <div className="form-value">Parañaque City</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Province</div>
                    <div className="form-value">Metro Manila</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Country</div>
                    <div className="form-value">Philippines</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Zip Code</div>
                    <div className="form-value">1704</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="enrollment-form with-scroll">
            <div className="form-header">
              <div className="form-title">PARENT/GUARDIAN'S INFORMATION</div>
            </div>
            <div className="form-content-scrollable">
              <div className="form-section">
                <div className="section-title">Father's Name</div>
                <div className="section-edit-icon">
                  <EditIcon />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <div className="form-label">Last Name</div>
                    <div className="form-value">Dela Cruz</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">First Name</div>
                    <div className="form-value">Juan Carlos</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Middle Name</div>
                    <div className="form-value">Villanueva</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Extension Name e.g. Jr., III (If applicable)</div>
                    <div className="form-value"></div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Contact Number</div>
                    <div className="form-value">09298376146</div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-title">Mother's Name</div>
                <div className="section-edit-icon">
                  <EditIcon />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <div className="form-label">Last Name</div>
                    <div className="form-value">Dela Cruz</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">First Name</div>
                    <div className="form-value">Elena</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Middle Name</div>
                    <div className="form-value">Ramos</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Extension Name e.g. Jr., III (If applicable)</div>
                    <div className="form-value"></div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Contact Number</div>
                    <div className="form-value">09298376146</div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-title">Guardian's Name</div>
                <div className="section-edit-icon">
                  <EditIcon />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <div className="form-label">Last Name</div>
                    <div className="form-value">Dela Cruz</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">First Name</div>
                    <div className="form-value">Elena</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Middle Name</div>
                    <div className="form-value">Ramos</div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Extension Name e.g. Jr., III (If applicable)</div>
                    <div className="form-value"></div>
                  </div>
                  <div className="form-group">
                    <div className="form-label">Contact Number</div>
                    <div className="form-value">09298376146</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="enrollment-form-document">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/96505abbd937387eec56935ab2863bed112cbf86?width=2786"
              alt="Certificate of Registration Preview"
              className="enrollment-document-image"
            />
          </div>
        );

      default:
        return null;
    }
  };

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
          <div className="enrollment-progress">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="progress-step">
                  <div className={`step-circle ${step <= currentStep || isEnrolled ? 'active' : 'inactive'} ${step < currentStep || (step === currentStep && isEnrolled) ? 'completed' : ''}`}>
                    {step}
                  </div>
                  <div className={`step-label ${step === currentStep && !isEnrolled ? 'active' : step < currentStep || (step === currentStep && isEnrolled) ? 'completed' : 'inactive'}`}>
                    {step === 1 && "Learner's\nInformation"}
                    {step === 2 && "Parent/Guardian's\nInformation"}
                    {step === 3 && "Confirmation"}
                  </div>
                </div>
                {step < 3 && <div className={`progress-line ${step < currentStep || (step === 2 && isEnrolled) ? 'active' : step === currentStep && !isEnrolled ? 'gradient' : 'inactive'}`}></div>}
              </React.Fragment>
            ))}
            <div className={`progress-line ${isEnrolled ? 'active' : currentStep === 3 && !isEnrolled ? 'gradient' : 'inactive'}`}></div>
            <div className="progress-step">
              <div className={`step-circle ${isEnrolled ? 'active completed' : 'inactive'}`}>
                {isEnrolled ? <CheckIcon /> : <CheckIcon />}
              </div>
              <div className={`step-label ${isEnrolled ? 'active' : 'inactive'}`}>
                Done
              </div>
            </div>
          </div>

          <div className={`enrollment-step-content ${currentStep === 3 || isEnrolled || showDocument ? 'full-height-step' : 'scrollable-step'}`}> 
            {renderStepContent()}
          </div>

          {!isEnrolled && !showDocument && (
            <div className="form-actions">
              {currentStep > 1 && (
                <button className="btn btn-secondary" onClick={handleBack}>
                  Back
                </button>
              )}
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enrollment;