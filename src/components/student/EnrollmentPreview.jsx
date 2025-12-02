import React, { useMemo } from 'react';
import formDefinition from './enrollment-form-data.json';
import { enrollmentHtml } from './enrollmentHtml.js';
import '../../style/enrollmentPreview.css';

const EnrollmentPreview = ({ formData }) => {

  const previewHtml = useMemo(() => {
    if (!formData) {
      return '';
    }

    const CHECK_SVG = `<svg viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;"><path d="M13.78 3.22a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06L5.5 9.94l7.22-7.22a.75.75 0 0 1 1.06 0z"/></svg>`;

    const doc = new DOMParser().parseFromString(enrollmentHtml, "text/html");

    // Create and inject responsiveness styles
    const responsiveStyle = doc.createElement('style');
    responsiveStyle.textContent = 'body {\n  text-align: center;\n  background: #f0f2f5; /* A light gray background for contrast */\n  padding: 20px 0;\n}\n.pf {\n  margin: 0 auto;\n  transform-origin: top center;\n}\n@media (max-width: 920px) { .pf { transform: scale(0.9); } }\n@media (max-width: 820px) { .pf { transform: scale(0.8); } }\n@media (max-width: 720px) { .pf { transform: scale(0.7); } }\n@media (max-width: 620px) { .pf { transform: scale(0.6); } }\n@media (max-width: 520px) { .pf { transform: scale(0.5); } }';
    doc.head.appendChild(responsiveStyle);

    const overlayWrapper = doc.createElement('div');
    overlayWrapper.id = 'overlay-layer';
    overlayWrapper.style.position = 'absolute';
    overlayWrapper.style.top = '0';
    overlayWrapper.style.left = '0';
    overlayWrapper.style.width = '100%';
    overlayWrapper.style.height = '100%';
    overlayWrapper.style.pointerEvents = 'none';
    overlayWrapper.style.zIndex = '10000';

    let overlayBoxesHtml = '';

    formDefinition.groups.forEach(group => {
      group.boxes.forEach(box => {
        let valueToSet = '';
        let isChecked = false;
        const key = box.name.toLowerCase().replace(/\s/g, '');
        
        // Data mapping logic...
        if (group.name === '3' || group.name === '4') { // Address
            const isCurrent = group.name === '3';
            const addrMapping = { 'housenumber': 'HouseNo', 'street': 'Sitio', 'barangay': 'Barangay', 'city': 'Municipality', 'province': 'Province', 'country': 'Country', 'zipcode': 'ZipCode' };
            const formDataKey = addrMapping[key];
            if(formDataKey) valueToSet = formData[ (isCurrent ? 'current' : 'permanent') + formDataKey ] || '';
        } else if (box.name.startsWith('bd')) {
            if (formData.birthday) {
                const parts = formData.birthday.split('-'); // YYYY-MM-DD
                if (parts.length === 3) {
                    if (box.name === 'bdMM') valueToSet = parts[1];
                    if (box.name === 'bdDD') valueToSet = parts[2];
                    if (box.name === 'bdYYYY') valueToSet = parts[0];
                }
            }
        } else if (box.name === 'from' || box.name === 'to') {
             if (formData.schoolYear) {
                const years = formData.schoolYear.split('-');
                if (box.name === 'from') valueToSet = years[0] || '';
                if (box.name === 'to' && years.length > 1) valueToSet = years[1] || '';
            }
        } else {
             const genericMapping = {
                'gradelevel': 'gradeLevel', 'lastname': 'lastName', 'firstname': 'firstName', 'middlename': 'middleName',
                'extensionname': 'extensionName', 'age': 'age', 'lrn': 'learnerReferenceNo', 'placeofbirth': 'placeOfBirth',
                'mothertonge': 'motherTongue', '4ps': 'householdIdNo', 'ifyesindigenous': 'ifIndigenous', 'fathersurname': 'fatherLastName',
                'fatherfirstname': 'fatherFirstName', 'fathermiddlename': 'fatherMiddleName', 'fathercontactnumber': 'fatherContactNumber',
                'mothersurname': 'motherLastName', 'motherfirstname': 'motherFirstName', 'mothermiddlename': 'motherMiddleName',
                'mothercontactnumber': 'motherContactNumber', 'guardiansurname': 'guardianLastName', 'guardianfirstname': 'guardianFirstName',
                'guardianmiddlename': 'guardianMiddleName', 'guardiancontactnumber': 'guardianContactNumber', 'lastcompleted': 'lastGradeLevelCompleted',
                'lastschoolattended': 'lastSchoolAttended', 'lastschoolyear': 'lastSchoolYearCompleted', 'schoolid': 'lastSchoolId',
            };
            if (genericMapping[key]) {
              const formValue = formData[genericMapping[key]];
              valueToSet = formValue !== null && formValue !== undefined ? formValue : '';
            }
        }

        let content;
        if (box.type === 'checkbox') {
            if (key === 'male' && formData.sex === 'Male') isChecked = true;
            if (key === 'female' && formData.sex === 'Female') isChecked = true;
            if (key === 'lrnyes' && formData.learnerReferenceNo) isChecked = true;
            if (key === 'lrnno' && !formData.learnerReferenceNo) isChecked = true;
            if (key === 'indigenousyes' && formData.isIndigenous) isChecked = true;
            if (key === 'indigenousno' && !formData.isIndigenous) isChecked = true;
            if (key === '4psyes' && formData.is4psBeneficiary) isChecked = true;
            if (key === '4psno' && !formData.is4psBeneficiary) isChecked = true;
            if (key === 'currentaddyes' && formData.permanentHouseNo === formData.currentHouseNo) isChecked = true;
            if (key === 'currentaddno' && formData.permanentHouseNo !== formData.currentHouseNo) isChecked = true;

            content = isChecked ? CHECK_SVG : '';
        } else {
            const displayValue = valueToSet || '';
            content = `<div class="overlay-box-value" style="white-space: nowrap; transform-origin: left center; font-size: 14px;">${displayValue}</div>`;
        }

        overlayBoxesHtml += `<div id="${box.id}" style="position: absolute; left: ${box.x}px; top: ${box.y}px; width: ${box.width}px; height: ${box.height}px; background-color: #FFFFFF; box-sizing: border-box; display: flex; align-items: center; justify-content: flex-start; padding: 2px; overflow: hidden; font-family: sans-serif; font-weight: 600; color: #000; border: 2px solid #000;">${content}</div>\n`;
      });
    });

    overlayWrapper.innerHTML = overlayBoxesHtml;
    
    const pageFrame = doc.querySelector('.pf');
    if (pageFrame) {
      pageFrame.appendChild(overlayWrapper);
    }

    return new XMLSerializer().serializeToString(doc);

  }, [formData]);

  return (
    <div className="enrollment-preview-container">
      {previewHtml ? (
        <iframe 
          className="enrollment-preview-iframe"
          srcDoc={previewHtml}
          title="Enrollment Preview"
        />
      ) : (
        <div>Loading Preview...</div>
      )}
    </div>
  );
};

export default EnrollmentPreview;