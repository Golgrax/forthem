import React from 'react';
import '../../style/enrollmentPreview.css';
import educationForm from '../../assets/backgrounds/school/educationform.png';

const EnrollmentPreview = ({ formData }) => {
  return (
    <div className="enrollment-preview-container">
      <img src={educationForm} alt="Enrollment Form" className="enrollment-preview-background" />
      <div className="enrollment-preview-content">
        {/* School Year / Grade Level to Enroll */}
        <div className="form-field" style={{ top: '150px', left: '110px' }}>{formData.schoolYear}</div>
        <div className="form-field" style={{ top: '178px', left: '110px' }}>{formData.gradeLevel}</div>
        
        {/* Learner Information */}
        <div className="form-field" style={{ top: '275px', left: '110px' }}>{formData.lastName}</div>
        <div className="form-field" style={{ top: '275px', left: '330px' }}>{formData.firstName}</div>
        <div className="form-field" style={{ top: '275px', left: '550px' }}>{formData.middleName}</div>
        <div className="form-field" style={{ top: '302px', left: '110px' }}>{formData.extensionName}</div>
        <div className="form-field" style={{ top: '248px', left: '560px' }}>{formData.learnerReferenceNo}</div>
        <div className="form-field" style={{ top: '275px', left: '760px' }}>{formData.placeOfBirth}</div>
        <div className="form-field" style={{ top: '302px', left: '560px' }}>{formData.birthday}</div>
        <div className="form-field" style={{ top: '328px', left: '560px' }}>{formData.sex}</div>
        <div className="form-field" style={{ top: '328px', left: '710px' }}>{formData.age}</div>

        {/* Current Address */}
        <div className="form-field" style={{ top: '408px', left: '110px' }}>{formData.currentHouseNo}</div>
        <div className="form-field" style={{ top: '408px', left: '320px' }}>{formData.currentSitio}</div>
        <div className="form-field" style={{ top: '408px', left: '560px' }}>{formData.currentBarangay}</div>
        <div className="form-field" style={{ top: '435px', left: '110px' }}>{formData.currentMunicipality}</div>
        <div className="form-field" style={{ top: '435px', left: '320px' }}>{formData.currentProvince}</div>
        <div className="form-field" style={{ top: '435px', left: '560px' }}>{formData.currentCountry}</div>
        <div className="form-field" style={{ top: '435px', left: '760px' }}>{formData.currentZipCode}</div>

        {/* Permanent Address */}
        <div className="form-field" style={{ top: '515px', left: '110px' }}>{formData.permanentHouseNo}</div>
        <div className="form-field" style={{ top: '515px', left: '320px' }}>{formData.permanentSitio}</div>
        <div className="form-field" style={{ top: '515px', left: '560px' }}>{formData.permanentBarangay}</div>
        <div className="form-field" style={{ top: '542px', left: '110px' }}>{formData.permanentMunicipality}</div>
        <div className="form-field" style={{ top: '542px', left: '320px' }}>{formData.permanentProvince}</div>
        <div className="form-field" style={{ top: '542px', left: '560px' }}>{formData.permanentCountry}</div>
        <div className="form-field" style={{ top: '542px', left: '760px' }}>{formData.permanentZipCode}</div>

        {/* Parent/Guardian Information */}
        <div className="form-field" style={{ top: '640px', left: '110px' }}>{formData.fatherLastName}</div>
        <div className="form-field" style={{ top: '640px', left: '320px' }}>{formData.fatherFirstName}</div>
        <div className="form-field" style={{ top: '640px', left: '550px' }}>{formData.fatherMiddleName}</div>
        <div className="form-field" style={{ top: '640px', left: '760px' }}>{formData.fatherContactNumber}</div>

        <div className="form-field" style={{ top: '695px', left: '110px' }}>{formData.motherLastName}</div>
        <div className="form-field" style={{ top: '695px', left: '320px' }}>{formData.motherFirstName}</div>
        <div className="form-field" style={{ top: '695px', left: '550px' }}>{formData.motherMiddleName}</div>
        <div className="form-field" style={{ top: '695px', left: '760px' }}>{formData.motherContactNumber}</div>

        <div className="form-field" style={{ top: '750px', left: '110px' }}>{formData.guardianLastName}</div>
        <div className="form-field" style={{ top: '750px', left: '320px' }}>{formData.guardianFirstName}</div>
        <div className="form-field" style={{ top: '750px', left: '550px' }}>{formData.guardianMiddleName}</div>
        <div className="form-field" style={{ top: '750px', left: '760px' }}>{formData.guardianContactNumber}</div>

      </div>
    </div>
  );
};

export default EnrollmentPreview;
