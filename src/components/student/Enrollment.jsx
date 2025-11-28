import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { ReactComponent as CheckIcon } from '../icons/CheckIcon.svg';
import { ReactComponent as EditIcon } from '../icons/EditIcon.svg';
import '../../style/enrollmentForm.css';
import EnrollmentPreview from './EnrollmentPreview';

const Enrollment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const [formData, setFormData] = useState({
        // Learner's Information
        schoolYear: '',
        gradeLevel: '',
        learnerReferenceNo: '',
        birthday: '',
        sex: '',
        age: '',
        lastName: '',
        firstName: '',
        middleName: '',
        extensionName: '',
        placeOfBirth: '',
        // Current Address
        currentHouseNo: '',
        currentSitio: '',
        currentBarangay: '',
        currentMunicipality: '',
        currentProvince: '',
        currentCountry: '',
        currentZipCode: '',
        // Permanent Address
        permanentHouseNo: '',
        permanentSitio: '',
        permanentBarangay: '',
        permanentMunicipality: '',
        permanentProvince: '',
        permanentCountry: '',
        permanentZipCode: '',
        // Parent/Guardian Information
        fatherLastName: '',
        fatherFirstName: '',
        fatherMiddleName: '',
        fatherExtensionName: '',
        fatherContactNumber: '',
        motherLastName: '',
        motherFirstName: '',
        motherMiddleName: '',
        motherExtensionName: '',
        motherContactNumber: '',
        guardianLastName: '',
        guardianFirstName: '',
        guardianMiddleName: '',
        guardianExtensionName: '',
        guardianContactNumber: ''
      });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchEnrollmentData = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`/api/enrollment?userId=${user.id}`);
          const data = await response.json();
          if (data.enrollment) {
            const enrollmentData = JSON.parse(data.enrollment.enrollment_data);
            setFormData(prev => ({
                ...prev,
                ...enrollmentData.learner_info,
                ...enrollmentData.current_address,
                ...enrollmentData.permanent_address,
                fatherLastName: enrollmentData.parent_info.father.lastName,
                fatherFirstName: enrollmentData.parent_info.father.firstName,
                fatherMiddleName: enrollmentData.parent_info.father.middleName,
                fatherExtensionName: enrollmentData.parent_info.father.extensionName,
                fatherContactNumber: enrollmentData.parent_info.father.contactNumber,
                motherLastName: enrollmentData.parent_info.mother.lastName,
                motherFirstName: enrollmentData.parent_info.mother.firstName,
                motherMiddleName: enrollmentData.parent_info.mother.middleName,
                motherExtensionName: enrollmentData.parent_info.mother.extensionName,
                motherContactNumber: enrollmentData.parent_info.mother.contactNumber,
                guardianLastName: enrollmentData.parent_info.guardian.lastName,
                guardianFirstName: enrollmentData.parent_info.guardian.firstName,
                guardianMiddleName: enrollmentData.parent_info.guardian.middleName,
                guardianExtensionName: enrollmentData.parent_info.guardian.extensionName,
                guardianContactNumber: enrollmentData.parent_info.guardian.contactNumber,
            }));
          }
        } catch (error) {
          console.error('Error fetching enrollment data:', error);
        }
      }
    };
    fetchEnrollmentData();
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3 && !isEnrolled) {
      await handleSubmitEnrollment();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDownloadCertificate = () => {
    const link = document.createElement('a');
    link.href = '/static/media/educationform.png'; // Path to the image
    link.download = 'Enrollment_Certificate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCertificateClick = () => {
    setShowDocument(true);
  };

  const handleEditClick = (section) => {
    setEditingSection(section);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingSection(null);
  };

  const handleSaveEdit = () => {
    setShowEditModal(false);
    setEditingSection(null);
  };

      const handleSubmitEnrollment = async () => {
        if (!user || !user.id) {
          setError('You must be logged in to enroll.');
          return;
        }

        // Validate required fields
        const requiredFields = [
          'firstName', 'lastName', 'schoolYear', 'gradeLevel', 
          'birthday', 'sex', 'age', 'placeOfBirth'
        ];
        
        const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
        
        if (missingFields.length > 0) {
          setError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
          return;
        }

        try {
          setLoading(true);
          setError(null);

      const enrollmentData = {
        student_name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim(),
        student_address: `${formData.currentHouseNo} ${formData.currentSitio}, ${formData.currentBarangay}, ${formData.currentMunicipality}, ${formData.currentProvince} ${formData.currentZipCode}`,
        parent_name: `${formData.fatherFirstName} ${formData.fatherMiddleName} ${formData.fatherLastName}`.trim(),
        parent_address: `${formData.permanentHouseNo} ${formData.permanentSitio}, ${formData.permanentBarangay}, ${formData.permanentMunicipality}, ${formData.permanentProvince} ${formData.permanentZipCode}`,
        userId: user.id,
        // Additional enrollment details
        learner_info: {
          schoolYear: formData.schoolYear,
          gradeLevel: formData.gradeLevel,
          learnerReferenceNo: formData.learnerReferenceNo,
          birthday: formData.birthday,
          sex: formData.sex,
          age: formData.age,
          placeOfBirth: formData.placeOfBirth
        },
        current_address: {
          houseNo: formData.currentHouseNo,
          sitio: formData.currentSitio,
          barangay: formData.currentBarangay,
          municipality: formData.currentMunicipality,
          province: formData.currentProvince,
          country: formData.currentCountry,
          zipCode: formData.currentZipCode
        },
        permanent_address: {
          houseNo: formData.permanentHouseNo,
          sitio: formData.permanentSitio,
          barangay: formData.permanentBarangay,
          municipality: formData.permanentMunicipality,
          province: formData.permanentProvince,
          country: formData.currentCountry,
          zipCode: formData.currentZipCode
        },
        parent_info: {
          father: {
            lastName: formData.fatherLastName,
            firstName: formData.fatherFirstName,
            middleName: formData.fatherMiddleName,
            extensionName: formData.fatherExtensionName,
            contactNumber: formData.fatherContactNumber
          },
          mother: {
            lastName: formData.motherLastName,
            firstName: formData.motherFirstName,
            middleName: formData.motherMiddleName,
            extensionName: formData.motherExtensionName,
            contactNumber: formData.motherContactNumber
          },
          guardian: {
            lastName: formData.guardianLastName,
            firstName: formData.guardianFirstName,
            middleName: formData.guardianMiddleName,
            extensionName: formData.guardianExtensionName,
            contactNumber: formData.guardianContactNumber
          }
        }
      };

      const response = await fetch('/api/enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });

      if (response.ok) {
        setIsEnrolled(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to submit enrollment');
      }
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    if (showDocument) {
      return (
        <div className="enrollment-form-document">
          <img 
            src="https://raw.githubusercontent.com/Golgrax/forthem-assets/main/students/enrollment/enrollment-form.png" 
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
          <button className="certificate-button" onClick={handleDownloadCertificate}>
              <svg className="certificate-icon" width="22" height="27" viewBox="0 0 22 27" fill="none">
                <path d="M19.25 27C19.9793 27 20.6788 26.7155 21.1945 26.2092C21.7103 25.7028 22 25.0161 22 24.3V8.3098C22 8.1756 21.9461 8.04704 21.8503 7.95302L13.8959 0.143218C13.8024 0.0514271 13.6766 0 13.5456 0H2.75C2.02065 0 1.32118 0.284463 0.805456 0.790812C0.289731 1.29716 0 1.98392 0 2.7V24.3C0 25.0161 0.289731 25.7028 0.805456 26.2092C1.32118 26.7155 2.02065 27 2.75 27H19.25ZM12.375 3.89162C12.375 3.44837 12.909 3.2243 13.2253 3.53483L18.3774 8.59322C18.6968 8.90685 18.4747 9.45 18.0271 9.45H12.875C12.5989 9.45 12.375 9.22614 12.375 8.95V3.89162ZM4.125 8.6C4.125 8.32386 4.34886 8.1 4.625 8.1H7.75C8.02614 8.1 8.25 8.32386 8.25 8.6V10.3C8.25 10.5761 8.02614 10.8 7.75 10.8H4.625C4.34886 10.8 4.125 10.5761 4.125 10.3V8.6ZM4.125 14C4.125 13.7239 4.34886 13.5 4.625 13.5H17.375C17.6511 13.5 17.875 13.7239 17.875 14V15.7C17.875 15.9761 17.6511 16.2 17.375 16.2H4.625C4.34886 16.2 4.125 15.9761 4.125 15.7V14ZM4.125 19.4C4.125 19.1239 4.34886 18.9 4.625 18.9H17.375C17.6511 18.9 17.875 19.1239 17.875 19.4V21.1C17.875 21.3761 17.6511 21.6 17.375 21.6H4.625C4.34886 21.6 4.125 21.3761 4.125 21.1V19.4Z" fill="white"/>
              </svg>
              Download Certificate
            </button>
          </div>
        </div>
      );
    }

    switch(currentStep) {
      case 1:
        return (
          <div className="enrollment-form-new with-scroll">
            <div className="form-header-new">
              <div className="form-title-new">LEARNER'S INFORMATION</div>
            </div>
            <div className="form-content-scrollable-new">
              <div className="form-section-new">
                <div className="section-title-new">Basic Information</div>
                <div className="section-edit-icon-new">
                  <button 
                    className="edit-icon-btn-new" 
                    onClick={() => handleEditClick('basicInfo')}
                    title="Edit Basic Information"
                  >
                    <EditIcon />
                  </button>
                </div>
                <div className="form-row-new basic-info-new">
                      <div className="form-group-new">
                        <div className="form-label-new">School Year</div>
                        <div className="form-value-new">{formData.schoolYear || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Grade level to Enroll</div>
                        <div className="form-value-new">{formData.gradeLevel || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Learner Reference No.</div>
                        <div className="form-value-new">{formData.learnerReferenceNo || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Birthday (mm/dd/yyyy)</div>
                        <div className="form-value-new">{formData.birthday || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Sex</div>
                        <div className="form-value-new">{formData.sex || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Age</div>
                        <div className="form-value-new">{formData.age || 'Not provided'}</div>
                      </div>
                </div>
              </div>

              <div className="form-section-new">
                <div className="section-title-new">Learner's Name</div>
                <div className="section-edit-icon-new">
                  <button 
                    className="edit-icon-btn-new" 
                    onClick={() => handleEditClick('learnerName')}
                    title="Edit Learner's Name"
                  >
                    <EditIcon />
                  </button>
                </div>
                    <div className="form-row-new">
                      <div className="form-group-new">
                        <div className="form-label-new">Last Name</div>
                        <div className="form-value-new">{formData.lastName || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">First Name</div>
                        <div className="form-value-new">{formData.firstName || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Middle Name</div>
                        <div className="form-value-new">{formData.middleName || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Extension Name e.g. Jr., III (If applicable)</div>
                        <div className="form-value-new">{formData.extensionName || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Place of Birth (Municipality City)</div>
                        <div className="form-value-new">{formData.placeOfBirth || 'Not provided'}</div>
                      </div>
                    </div>
              </div>

              <div className="form-section-new">
                <div className="section-title-new">Current Address</div>
                <div className="section-edit-icon-new">
                  <button 
                    className="edit-icon-btn-new" 
                    onClick={() => handleEditClick('currentAddress')}
                    title="Edit Current Address"
                  >
                    <EditIcon />
                  </button>
                </div>
                    <div className="form-row-new">
                      <div className="form-group-new">
                        <div className="form-label-new">House No.</div>
                        <div className="form-value-new">{formData.currentHouseNo || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Sitio/Street Name</div>
                        <div className="form-value-new">{formData.currentSitio || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Barangay</div>
                        <div className="form-value-new">{formData.currentBarangay || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Municipality/City</div>
                        <div className="form-value-new">{formData.currentMunicipality || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Province</div>
                        <div className="form-value-new">{formData.currentProvince || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Country</div>
                        <div className="form-value-new">{formData.currentCountry || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Zip Code</div>
                        <div className="form-value-new">{formData.currentZipCode || 'Not provided'}</div>
                      </div>
                    </div>
              </div>

              <div className="form-section-new">
                <div className="section-title-new">Permanent Address</div>
                <div className="section-edit-icon-new">
                  <button 
                    className="edit-icon-btn-new" 
                    onClick={() => handleEditClick('permanentAddress')}
                    title="Edit Permanent Address"
                  >
                    <EditIcon />
                  </button>
                </div>
                    <div className="form-row-new">
                      <div className="form-group-new">
                        <div className="form-label-new">House No.</div>
                        <div className="form-value-new">{formData.permanentHouseNo || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Sitio/Street Name</div>
                        <div className="form-value-new">{formData.permanentSitio || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Barangay</div>
                        <div className="form-value-new">{formData.permanentBarangay || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Municipality/City</div>
                        <div className="form-value-new">{formData.permanentMunicipality || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Province</div>
                        <div className="form-value-new">{formData.permanentProvince || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Country</div>
                        <div className="form-value-new">{formData.permanentCountry || 'Not provided'}</div>
                      </div>
                      <div className="form-group-new">
                        <div className="form-label-new">Zip Code</div>
                        <div className="form-value-new">{formData.permanentZipCode || 'Not provided'}</div>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="enrollment-form-new with-scroll">
            <div className="form-header-new">
              <div className="form-title-new">PARENT/GUARDIAN'S INFORMATION</div>
            </div>
            <div className="form-content-scrollable-new">
              <div className="form-section-new">
                <div className="section-title-new">Father's Name</div>
                <div className="section-edit-icon-new">
                  <button 
                    className="edit-icon-btn-new" 
                    onClick={() => handleEditClick('fatherInfo')}
                    title="Edit Father's Information"
                  >
                    <EditIcon />
                  </button>
                </div>
                <div className="form-row-new">
                  <div className="form-group-new">
                    <div className="form-label-new">Last Name</div>
                    <div className="form-value-new">{formData.fatherLastName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">First Name</div>
                    <div className="form-value-new">{formData.fatherFirstName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">Middle Name</div>
                    <div className="form-value-new">{formData.fatherMiddleName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">Extension Name e.g. Jr., III (If applicable)</div>
                    <div className="form-value-new">{formData.fatherExtensionName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">Contact Number</div>
                    <div className="form-value-new">{formData.fatherContactNumber || 'Not provided'}</div>
                  </div>
                </div>
              </div>

              <div className="form-section-new">
                <div className="section-title-new">Mother's Name</div>
                <div className="section-edit-icon-new">
                  <button 
                    className="edit-icon-btn-new" 
                    onClick={() => handleEditClick('motherInfo')}
                    title="Edit Mother's Information"
                  >
                    <EditIcon />
                  </button>
                </div>
                <div className="form-row-new">
                  <div className="form-group-new">
                    <div className="form-label-new">Last Name</div>
                    <div className="form-value-new">{formData.motherLastName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">First Name</div>
                    <div className="form-value-new">{formData.motherFirstName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">Middle Name</div>
                    <div className="form-value-new">{formData.motherMiddleName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">Extension Name e.g. Jr., III (If applicable)</div>
                    <div className="form-value-new">{formData.motherExtensionName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">Contact Number</div>
                    <div className="form-value-new">{formData.motherContactNumber || 'Not provided'}</div>
                  </div>
                </div>
              </div>

              <div className="form-section-new">
                <div className="section-title-new">Guardian's Name</div>
                <div className="section-edit-icon-new">
                  <button 
                    className="edit-icon-btn-new" 
                    onClick={() => handleEditClick('guardianInfo')}
                    title="Edit Guardian's Information"
                  >
                    <EditIcon />
                  </button>
                </div>
                <div className="form-row-new">
                  <div className="form-group-new">
                    <div className="form-label-new">Last Name</div>
                    <div className="form-value-new">{formData.guardianLastName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">First Name</div>
                    <div className="form-value-new">{formData.guardianFirstName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">Middle Name</div>
                    <div className="form-value-new">{formData.guardianMiddleName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">Extension Name e.g. Jr., III (If applicable)</div>
                    <div className="form-value-new">{formData.guardianExtensionName || 'Not provided'}</div>
                  </div>
                  <div className="form-group-new">
                    <div className="form-label-new">Contact Number</div>
                    <div className="form-value-new">{formData.guardianContactNumber || 'Not provided'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return <EnrollmentPreview formData={formData} />;

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
            {error && (
              <div className="error-message" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffe6e6', border: '1px solid #ff9999', borderRadius: '4px' }}>
                {error}
              </div>
            )}
            {renderStepContent()}
          </div>

          {!isEnrolled && !showDocument && (
            <div className="form-actions">
              {currentStep > 1 && (
                <button className="btn btn-secondary" onClick={handleBack} disabled={loading}>
                  Back
                </button>
              )}
              <button className="btn btn-primary" onClick={handleNext} disabled={loading}>
                {loading ? 'Submitting...' : currentStep === 3 ? 'Submit Enrollment' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
                <div className="edit-modal-header">
                  <h3>Edit {editingSection === 'basicInfo' ? 'Basic Information' : 
                            editingSection === 'learnerName' ? "Learner's Name" : 
                            editingSection === 'currentAddress' ? 'Current Address' : 
                            editingSection === 'permanentAddress' ? 'Permanent Address' : 
                            editingSection === 'fatherInfo' ? "Father's Information" :
                            editingSection === 'motherInfo' ? "Mother's Information" :
                            editingSection === 'guardianInfo' ? "Guardian's Information" :
                            editingSection === 'parentInfo' ? 'Parent/Guardian Information' : 'Information'}</h3>
                  <button className="close-btn" onClick={handleCloseModal}>×</button>
                </div>
            <div className="edit-modal-content">
              {editingSection === 'basicInfo' && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>School Year</label>
                    <input 
                      type="text" 
                      value={formData.schoolYear}
                      onChange={(e) => handleInputChange('schoolYear', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Grade Level</label>
                    <input 
                      type="text" 
                      value={formData.gradeLevel}
                      onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Learner Reference No.</label>
                    <input 
                      type="text" 
                      value={formData.learnerReferenceNo}
                      onChange={(e) => handleInputChange('learnerReferenceNo', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Birthday</label>
                    <input 
                      type="text" 
                      value={formData.birthday}
                      onChange={(e) => handleInputChange('birthday', e.target.value)}
                    />
                  </div>
                      <div className="form-group">
                        <label>Sex</label>
                        <select 
                          value={formData.sex}
                          onChange={(e) => handleInputChange('sex', e.target.value)}
                        >
                          <option value="">Select Sex</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                  <div className="form-group">
                    <label>Age</label>
                    <input 
                      type="number" 
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {editingSection === 'learnerName' && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Middle Name</label>
                    <input 
                      type="text" 
                      value={formData.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Extension Name</label>
                    <input 
                      type="text" 
                      value={formData.extensionName}
                      onChange={(e) => handleInputChange('extensionName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Place of Birth</label>
                    <input 
                      type="text" 
                      value={formData.placeOfBirth}
                      onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {editingSection === 'currentAddress' && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>House No.</label>
                    <input 
                      type="text" 
                      value={formData.currentHouseNo}
                      onChange={(e) => handleInputChange('currentHouseNo', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sitio/Street Name</label>
                    <input 
                      type="text" 
                      value={formData.currentSitio}
                      onChange={(e) => handleInputChange('currentSitio', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Barangay</label>
                    <input 
                      type="text" 
                      value={formData.currentBarangay}
                      onChange={(e) => handleInputChange('currentBarangay', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Municipality/City</label>
                    <input 
                      type="text" 
                      value={formData.currentMunicipality}
                      onChange={(e) => handleInputChange('currentMunicipality', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Province</label>
                    <input 
                      type="text" 
                      value={formData.currentProvince}
                      onChange={(e) => handleInputChange('currentProvince', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input 
                      type="text" 
                      value={formData.currentCountry}
                      onChange={(e) => handleInputChange('currentCountry', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input 
                      type="text" 
                      value={formData.currentZipCode}
                      onChange={(e) => handleInputChange('currentZipCode', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {editingSection === 'permanentAddress' && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>House No.</label>
                    <input 
                      type="text" 
                      value={formData.permanentHouseNo}
                      onChange={(e) => handleInputChange('permanentHouseNo', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sitio/Street Name</label>
                    <input 
                      type="text" 
                      value={formData.permanentSitio}
                      onChange={(e) => handleInputChange('permanentSitio', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Barangay</label>
                    <input 
                      type="text" 
                      value={formData.permanentBarangay}
                      onChange={(e) => handleInputChange('permanentBarangay', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Municipality/City</label>
                    <input 
                      type="text" 
                      value={formData.permanentMunicipality}
                      onChange={(e) => handleInputChange('permanentMunicipality', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Province</label>
                    <input 
                      type="text" 
                      value={formData.permanentProvince}
                      onChange={(e) => handleInputChange('permanentProvince', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input 
                      type="text" 
                      value={formData.permanentCountry}
                      onChange={(e) => handleInputChange('permanentCountry', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input 
                      type="text" 
                      value={formData.permanentZipCode}
                      onChange={(e) => handleInputChange('permanentZipCode', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {editingSection === 'fatherInfo' && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      value={formData.fatherLastName}
                      onChange={(e) => handleInputChange('fatherLastName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      value={formData.fatherFirstName}
                      onChange={(e) => handleInputChange('fatherFirstName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Middle Name</label>
                    <input 
                      type="text" 
                      value={formData.fatherMiddleName}
                      onChange={(e) => handleInputChange('fatherMiddleName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Extension Name</label>
                    <input 
                      type="text" 
                      value={formData.fatherExtensionName}
                      onChange={(e) => handleInputChange('fatherExtensionName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input 
                      type="text" 
                      value={formData.fatherContactNumber}
                      onChange={(e) => handleInputChange('fatherContactNumber', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {editingSection === 'motherInfo' && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      value={formData.motherLastName}
                      onChange={(e) => handleInputChange('motherLastName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      value={formData.motherFirstName}
                      onChange={(e) => handleInputChange('motherFirstName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Middle Name</label>
                    <input 
                      type="text" 
                      value={formData.motherMiddleName}
                      onChange={(e) => handleInputChange('motherMiddleName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Extension Name</label>
                    <input 
                      type="text" 
                      value={formData.motherExtensionName}
                      onChange={(e) => handleInputChange('motherExtensionName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input 
                      type="text" 
                      value={formData.motherContactNumber}
                      onChange={(e) => handleInputChange('motherContactNumber', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {editingSection === 'guardianInfo' && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      value={formData.guardianLastName}
                      onChange={(e) => handleInputChange('guardianLastName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      value={formData.guardianFirstName}
                      onChange={(e) => handleInputChange('guardianFirstName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Middle Name</label>
                    <input 
                      type="text" 
                      value={formData.guardianMiddleName}
                      onChange={(e) => handleInputChange('guardianMiddleName', e.target.value)}
                    />
              </div>
                  <div className="form-group">
                    <label>Extension Name</label>
                    <input 
                      type="text" 
                      value={formData.guardianExtensionName}
                      onChange={(e) => handleInputChange('guardianExtensionName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input 
                      type="text" 
                      value={formData.guardianContactNumber}
                      onChange={(e) => handleInputChange('guardianContactNumber', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="edit-modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollment;
