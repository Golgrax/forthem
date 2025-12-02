import React, { useEffect, useState } from 'react';
import formDefinition from './enrollment-form-data.json';
import '../../style/enrollmentPreview.css';

const EnrollmentPreview = ({ formData }) => {
  const [previewHtml, setPreviewHtml] = useState('');

  useEffect(() => {
    const generatePreview = async () => {
      if (!formData) return;

      try {
        const response = await fetch('/enrollment-form.html');
        let html = await response.text();

        const cssOverride = `
          <style>
            html, body { 
              overflow: visible !important; height: auto !important; width: auto !important;
              margin: 0 !important; padding: 0 !important; background: transparent !important;
              text-align: left !important;
            }
            #page-container, .pf, .pc {
              position: relative !important; overflow: visible !important; height: auto !important;
              width: auto !important; margin: 0 !important; padding: 0 !important;
              left: 0 !important; top: 0 !important; box-shadow: none !important;
            }
            #sidebar, .loading-indicator { display: none !important; }
            .pf { margin: 0 !important; box-shadow: none !important; left: 0 !important; }
            .pc { margin: 0 !important; }
            center, [align="center"] { text-align: left !important; }
            @media print {
              @page { margin: 0; }
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              #overlay-layer div { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        `;

        const resizeScript = `
          <script>
            (function() {
              function resizeBoxes() {
                var boxes = document.querySelectorAll('.overlay-box-value');
                boxes.forEach(function(el) {
                  var parent = el.parentElement;
                  if (!parent) return;
                  el.style.transform = 'none';
                  var parentWidth = parent.clientWidth - 4; // Padding
                  var contentWidth = el.scrollWidth;
                  if (contentWidth > parentWidth && contentWidth > 0) {
                     var scale = parentWidth / contentWidth;
                     el.style.transform = 'scale(' + scale + ')';
                  }
                });
              }
              window.addEventListener('load', resizeBoxes);
              window.addEventListener('resize', resizeBoxes);
            })();
          </script>
        `;

        const CHECK_SVG = `<svg viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;"><path d="M13.78 3.22a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06L5.5 9.94l7.22-7.22a.75.75 0 0 1 1.06 0z"/></svg>`;

        let overlayHtml = '';
        formDefinition.groups.forEach(group => {
          group.boxes.forEach(box => {
            let valueToSet = '';
            let isChecked = false;

            if (group.name === '3' || group.name === '4') { // Address
                const isCurrent = group.name === '3';
                const addrMapping = { 'housenumber': 'HouseNo', 'street': 'Sitio', 'barangay': 'Barangay', 'city': 'Municipality', 'province': 'Province', 'country': 'Country', 'zip code': 'ZipCode' };
                const key = addrMapping[box.name.toLowerCase()];
                if(key) valueToSet = formData[ (isCurrent ? 'current' : 'permanent') + key ] || '';
            } else if (box.name.startsWith('bd')) {
                if (formData.birthday) {
                    const parts = formData.birthday.split('-'); // MM-DD-YYYY
                    if (parts.length === 3) {
                        if (box.name === 'bdMM') valueToSet = parts[0];
                        if (box.name === 'bdDD') valueToSet = parts[1];
                        if (box.name === 'bdYYYY') valueToSet = parts[2];
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
                const key = box.name.toLowerCase().replace(/\s/g, '');
                if (genericMapping[key]) valueToSet = formData[genericMapping[key]] || '';
            }

            let content = `<div class="overlay-box-value" style="white-space: nowrap; transform-origin: left center;">${valueToSet || box.value || ''}</div>`;

            if (box.type === 'checkbox') {
                const key = box.name.toLowerCase();
                if (key === 'male' && formData.sex === 'Male') isChecked = true;
                if (key === 'female' && formData.sex === 'Female') isChecked = true;
                if (key === 'lrnyes' && formData.learnerReferenceNo) isChecked = true;
                if (key === 'lrnno' && !formData.learnerReferenceNo) isChecked = true;
                if (key === 'indigenousyes' && formData.isIndigenous) isChecked = true;
                if (key === 'indigenousno' && !formData.isIndigenous) isChecked = true;
                if (key === '4psyes' && formData.is4psBeneficiary) isChecked = true;
                if (key === '4psno' && !formData.is4psBeneficiary) isChecked = true;
                if (key === 'currentaddyes' && formData.permanentHouseNo === formData.currentHouseNo && formData.permanentSitio === formData.currentSitio) isChecked = true;
                if (key === 'currentaddno' && (formData.permanentHouseNo !== formData.currentHouseNo || formData.permanentSitio !== formData.currentSitio)) isChecked = true;


                content = isChecked ? CHECK_SVG : '';
            }

            overlayHtml += `  <div id="${box.id}" style="position: absolute; left: ${box.x}px; top: ${box.y}px; width: ${box.width}px; height: ${box.height}px; border: 2px solid #000; background-color: transparent; box-sizing: border-box; display: flex; align-items: center; justify-content: flex-start; padding-left: 2px; overflow: hidden; font-family: sans-serif; font-size: 12px; font-weight: 500; color: #000;">${content}</div>\n`;
          });
        });
        
        const overlayWrapper = `<div id="overlay-layer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10000;">
${overlayHtml}</div>`;

        if (html.includes('</head>')) {
            html = html.replace('</head>', `${cssOverride}</head>`);
        } else {
            html = cssOverride + html;
        }

        const bodyCloseIndex = html.lastIndexOf('</body>');
        if (bodyCloseIndex > -1) {
            html = html.slice(0, bodyCloseIndex) + overlayWrapper + resizeScript + '</body>' + html.slice(bodyCloseIndex + 7);
        } else {
            html += overlayWrapper + resizeScript;
        }
        
        setPreviewHtml(html);

      } catch (error) {
        console.error("Failed to generate enrollment preview:", error);
        setPreviewHtml('<p>Error loading preview. Please try again.</p>');
      }
    };

    generatePreview();
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
