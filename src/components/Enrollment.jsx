import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Enrollment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showDocument, setShowDocument] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
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

  const DashboardIcon = () => (
    <svg className="nav-icon" width="26" height="27" viewBox="0 0 26 27" fill="none">
      <path d="M14.4444 7.72222V1.94444C14.4444 1.53518 14.5831 1.19237 14.8604 0.916C15.1378 0.63963 15.4806 0.500963 15.8889 0.5H24.5556C24.9648 0.5 25.3081 0.638667 25.5854 0.916C25.8628 1.19333 26.001 1.53615 26 1.94444V7.72222C26 8.13148 25.8613 8.47478 25.584 8.75211C25.3067 9.02944 24.9638 9.16763 24.5556 9.16667H15.8889C15.4796 9.16667 15.1368 9.028 14.8604 8.75066C14.5841 8.47333 14.4454 8.13052 14.4444 7.72222ZM0 13.5V1.94444C0 1.53518 0.138667 1.19237 0.416 0.916C0.693333 0.63963 1.03615 0.500963 1.44444 0.5H10.1111C10.5204 0.5 10.8637 0.638667 11.141 0.916C11.4183 1.19333 11.5565 1.53615 11.5556 1.94444V13.5C11.5556 13.9093 11.4169 14.2526 11.1396 14.5299C10.8622 14.8072 10.5194 14.9454 10.1111 14.9444H1.44444C1.03518 14.9444 0.69237 14.8058 0.416 14.5284C0.13963 14.2511 0.000962963 13.9083 0 13.5ZM14.4444 25.0556V13.5C14.4444 13.0907 14.5831 12.7479 14.8604 12.4716C15.1378 12.1952 15.4806 12.0565 15.8889 12.0556H24.5556C24.9648 12.0556 25.3081 12.1942 25.5854 12.4716C25.8628 12.7489 26.001 13.0917 26 13.5V25.0556C26 25.4648 25.8613 25.8081 25.584 26.0854C25.3067 26.3628 24.9638 26.501 24.5556 26.5H15.8889C15.4796 26.5 15.1368 26.3613 14.8604 26.084C14.5841 25.8067 14.4454 25.4638 14.4444 25.0556ZM0 25.0556V19.2778C0 18.8685 0.138667 18.5257 0.416 18.2493C0.693333 17.973 1.03615 17.8343 1.44444 17.8333H10.1111C10.5204 17.8333 10.8637 17.972 11.141 18.2493C11.4183 18.5267 11.5565 18.8695 11.5556 19.2778V25.0556C11.5556 25.4648 11.4169 25.8081 11.1396 26.0854C10.8622 26.3628 10.5194 26.501 10.1111 26.5H1.44444C1.03518 26.5 0.69237 26.3613 0.416 26.084C0.13963 25.8067 0.000962963 25.4638 0 25.0556ZM2.88889 12.0556H8.66667V3.38889H2.88889V12.0556ZM17.3333 23.6111H23.1111V14.9444H17.3333V23.6111ZM17.3333 6.27778H23.1111V3.38889H17.3333V6.27778ZM2.88889 23.6111H8.66667V20.7222H2.88889V23.6111Z" fill="currentColor"/>
    </svg>
  );

  const EnrollmentIcon = () => (
    <svg className="nav-icon" width="27" height="31" viewBox="0 0 27 31" fill="none">
      <path d="M23.9866 13.5625C24.4085 13.5625 24.8002 13.6382 25.1618 13.7896C25.5234 13.9409 25.8449 14.1528 26.1261 14.4253C26.4074 14.6978 26.6183 15.0156 26.7589 15.3789C26.8996 15.7422 26.9799 16.1357 27 16.5596C27 16.9531 26.9247 17.3366 26.774 17.71C26.6233 18.0833 26.4074 18.4113 26.1261 18.6938L15.7158 29.1815C15.4589 29.4403 15.1361 29.624 14.7824 29.7126L12.8717 30.1912C11.4082 30.5578 10.0812 29.2337 10.4447 27.7694L10.926 25.8298C11.0132 25.4788 11.1938 25.158 11.4487 24.9016L21.8622 14.4253C22.1434 14.1427 22.4699 13.9308 22.8415 13.7896C23.2132 13.6483 23.5949 13.5726 23.9866 13.5625ZM24.755 17.3315C24.966 17.1196 25.0714 16.8623 25.0714 16.5596C25.0714 16.2467 24.971 15.9945 24.7701 15.8027C24.5692 15.611 24.308 15.5101 23.9866 15.5C23.846 15.5 23.7104 15.5202 23.5798 15.5605C23.4492 15.6009 23.3337 15.6766 23.2333 15.7876L13.0161 26.0817C12.8792 26.2197 12.7816 26.3933 12.7344 26.5819C12.5365 27.3712 13.2508 28.094 14.0397 27.8944C14.2288 27.8466 14.4013 27.7482 14.5388 27.6099L24.755 17.3315ZM5.78571 12.5938C5.78571 13.1263 5.35399 13.5625 4.82143 13.5625C4.28887 13.5625 3.85714 13.1263 3.85714 12.5938C3.85714 12.0612 4.28887 11.625 4.82143 11.625C5.35399 11.625 5.78571 12.0612 5.78571 12.5938ZM19.2857 12.5938C19.2857 13.1288 18.852 13.5625 18.317 13.5625H8.68303C8.14801 13.5625 7.71429 13.1288 7.71429 12.5938C7.71429 12.0587 8.14801 11.625 8.68304 11.625H18.317C18.852 11.625 19.2857 12.0587 19.2857 12.5938ZM3.85714 18.4062C3.85714 17.8737 4.28887 17.4375 4.82143 17.4375C5.35399 17.4375 5.78571 17.8737 5.78571 18.4062C5.78571 18.9388 5.35399 19.375 4.82143 19.375C4.28887 19.375 3.85714 18.9388 3.85714 18.4062ZM5.78571 6.78125C5.78571 7.31381 5.35399 7.75 4.82143 7.75C4.28887 7.75 3.85714 7.31381 3.85714 6.78125C3.85714 6.24869 4.28887 5.8125 4.82143 5.8125C5.35399 5.8125 5.78571 6.24869 5.78571 6.78125ZM19.2857 6.78125C19.2857 7.31628 18.852 7.75 18.317 7.75H8.68303C8.14801 7.75 7.71429 7.31628 7.71429 6.78125C7.71429 6.24622 8.14801 5.8125 8.68304 5.8125H18.317C18.852 5.8125 19.2857 6.24622 19.2857 6.78125ZM1.92857 23.1875C1.92857 24.2921 2.824 25.1875 3.92857 25.1875H7.36387C7.99368 25.1875 8.45604 25.779 8.30395 26.3902C8.19651 26.8219 7.80879 27.125 7.36387 27.125H2C0.895431 27.125 0 26.2296 0 25.125V2C0 0.895431 0.895431 0 2 0H21.1429C22.2474 0 23.1429 0.89543 23.1429 2V10.5583C23.1429 10.9539 22.8568 11.2827 22.4757 11.389C21.8877 11.5531 21.2143 11.1597 21.2143 10.5492V3.9375C21.2143 2.83293 20.3189 1.9375 19.2143 1.9375H3.92857C2.824 1.9375 1.92857 2.83293 1.92857 3.9375V23.1875ZM7.71429 18.4062C7.71429 17.8712 8.14801 17.4375 8.68304 17.4375H13.1276C13.9895 17.4375 14.4222 18.4788 13.8141 19.0897C13.6323 19.2723 13.3853 19.375 13.1276 19.375H8.68304C8.14801 19.375 7.71429 18.9413 7.71429 18.4062Z" fill="currentColor"/>
    </svg>
  );

  const ScheduleIcon = () => (
    <svg className="nav-icon" width="27" height="30" viewBox="0 0 27 30" fill="none">
      <path d="M13.5 18C13.767 18 14.028 17.912 14.25 17.7472C14.472 17.5824 14.6451 17.3481 14.7472 17.074C14.8494 16.7999 14.8762 16.4983 14.8241 16.2074C14.772 15.9164 14.6434 15.6491 14.4546 15.4393C14.2658 15.2296 14.0252 15.0867 13.7634 15.0288C13.5015 14.9709 13.2301 15.0006 12.9834 15.1142C12.7367 15.2277 12.5259 15.42 12.3775 15.6666C12.2292 15.9133 12.15 16.2033 12.15 16.5C12.15 16.8978 12.2922 17.2794 12.5454 17.5607C12.7986 17.842 13.142 18 13.5 18ZM20.25 18C20.517 18 20.778 17.912 21 17.7472C21.222 17.5824 21.3951 17.3481 21.4972 17.074C21.5994 16.7999 21.6262 16.4983 21.5741 16.2074C21.522 15.9164 21.3934 15.6491 21.2046 15.4393C21.0158 15.2296 20.7752 15.0867 20.5134 15.0288C20.2515 14.9709 19.9801 15.0006 19.7334 15.1142C19.4867 15.2277 19.2759 15.42 19.1275 15.6666C18.9792 15.9133 18.9 16.2033 18.9 16.5C18.9 16.8978 19.0422 17.2794 19.2954 17.5607C19.5486 17.842 19.892 18 20.25 18ZM13.5 24C13.767 24 14.028 23.912 14.25 23.7472C14.472 23.5824 14.6451 23.3481 14.7472 23.074C14.8494 22.7999 14.8762 22.4983 14.8241 22.2074C14.772 21.9164 14.6434 21.6491 14.4546 21.4393C14.2658 21.2296 14.0252 21.0867 13.7634 21.0288C13.5015 20.9709 13.2301 21.0006 12.9834 21.1142C12.7367 21.2277 12.5259 21.42 12.3775 21.6666C12.2292 21.9133 12.15 22.2033 12.15 22.5C12.15 22.8978 12.2922 23.2794 12.5454 23.5607C12.7986 23.842 13.142 24 13.5 24ZM20.25 24C20.517 24 20.778 23.912 21 23.7472C21.222 23.5824 21.3951 23.3481 21.4972 23.074C21.5994 22.7999 21.6262 22.4983 21.5741 22.2074C21.522 21.9164 21.3934 21.6491 21.2046 21.4393C21.0158 21.2296 20.7752 21.0867 20.5134 21.0288C20.2515 20.9709 19.9801 21.0006 19.7334 21.1142C19.4867 21.2277 19.2759 21.42 19.1275 21.6666C18.9792 21.9133 18.9 16.2033 18.9 22.5C18.9 22.8978 19.0422 23.2794 19.2954 23.5607C19.5486 23.842 19.892 24 20.25 24ZM6.75 18C7.017 18 7.27801 17.912 7.50002 17.7472C7.72203 17.5824 7.89506 17.3481 7.99724 17.074C8.09942 16.7999 8.12615 16.4983 8.07406 16.2074C8.02197 15.9164 7.89339 15.6491 7.70459 15.4393C7.51579 15.2296 7.27525 15.0867 7.01337 15.0288C6.7515 14.9709 6.48006 15.0006 6.23338 15.1142C5.9867 15.2277 5.77586 15.42 5.62752 15.6666C5.47918 15.9133 5.4 16.2033 5.4 16.5C5.4 16.8978 5.54223 17.2794 5.79541 17.5607C6.04858 17.842 6.39196 18 6.75 18ZM22.95 3H21.6V1.5C21.6 1.10218 21.4578 0.720644 21.2046 0.43934C20.9514 0.158035 20.608 0 20.25 0C19.892 0 19.5486 0.158035 19.2954 0.43934C19.0422 0.720644 18.9 1.10218 18.9 1.5V3H8.1V1.5C8.1 1.10218 7.95777 0.720644 7.70459 0.43934C7.45142 0.158035 7.10804 0 6.75 0C6.39196 0 6.04858 0.158035 5.79541 0.43934C5.54223 0.720644 5.4 1.10218 5.4 1.5V3H4.05C2.97587 3 1.94574 3.47411 1.18622 4.31802C0.426695 5.16193 0 6.30653 0 7.5V25.5C0 26.6935 0.426695 27.8381 1.18622 28.682C1.94574 29.5259 2.97587 30 4.05 30H22.95C24.0241 30 25.0543 29.5259 25.8138 28.682C26.5733 27.8381 27 26.6935 27 25.5V7.5C27 6.30653 26.5733 5.16193 25.8138 4.31802C25.0543 3.47411 24.0241 3 22.95 3ZM24.3 25.5C24.3 25.8978 24.1578 26.2794 23.9046 26.5607C23.6514 26.842 23.308 27 22.95 27H4.05C3.69196 27 3.34858 26.842 3.09541 26.5607C2.84223 26.2794 2.7 25.8978 2.7 25.5V12H24.3V25.5ZM24.3 9H2.7V7.5C2.7 7.10218 2.84223 6.72064 3.09541 6.43934C3.34858 6.15804 3.69196 6 4.05 6H22.95C23.308 6 23.6514 6.15804 23.9046 6.43934C24.1578 6.72064 24.3 7.10218 24.3 7.5V9ZM6.75 24C7.017 24 7.27801 23.912 7.50002 23.7472C7.72203 23.5824 7.89506 23.3481 7.99724 23.074C8.09942 22.7999 8.12615 22.4983 8.07406 22.2074C8.02197 21.9164 7.89339 21.6491 7.70459 21.4393C7.51579 21.2296 7.27525 21.0867 7.01337 21.0288C6.7515 20.9709 6.48006 21.0006 6.23338 21.1142C5.9867 21.2277 5.77586 21.42 5.62752 21.6666C5.47918 21.9133 5.4 22.2033 5.4 22.5C5.4 22.8978 5.54223 23.2794 5.79541 23.5607C6.04858 23.842 6.39196 24 6.75 24Z" fill="currentColor"/>
    </svg>
  );

  const ModulesIcon = () => (
    <svg className="nav-icon modules-icon" width="35" height="40" viewBox="0 0 35 40" fill="none">
      <path transform="translate(-5, 0)" d="M24.2614 10C24.96 10.0002 25.6363 10.2461 26.1717 10.6948L26.3651 10.8718L32.932 17.4387C33.4259 17.9326 33.7303 18.5847 33.7919 19.2805L33.8038 19.5423V36.7793C33.804 37.5299 33.5205 38.253 33.0101 38.8034C32.4997 39.3538 31.8 39.691 31.0515 39.7473L30.8283 39.7547H12.9755C12.2248 39.755 11.5018 39.4715 10.9513 38.961C10.4009 38.4506 10.0637 37.751 10.0074 37.0024L10 36.7793V12.9755C9.99976 12.2248 10.2833 11.5018 10.7937 10.9513C11.3041 10.4009 12.0038 10.0637 12.7523 10.0074L12.9755 10H24.2614ZM21.9019 12.9755H12.9755V36.7793H30.8283V21.9019H24.1335C23.5416 21.9019 22.974 21.6668 22.5555 21.2483C22.137 20.8298 21.9019 20.2622 21.9019 19.6703V12.9755ZM21.9019 23.3896C22.2965 23.3896 22.6749 23.5464 22.9539 23.8254C23.2329 24.1044 23.3896 24.4828 23.3896 24.8774V28.9062L24.0056 28.2902C24.2861 28.0192 24.662 27.8693 25.052 27.8727C25.4421 27.8761 25.8153 28.0325 26.0911 28.3084C26.3669 28.5842 26.5234 28.9573 26.5268 29.3474C26.5302 29.7375 26.3802 30.1133 26.1092 30.3939L22.9552 33.5509C22.817 33.6892 22.653 33.7989 22.4724 33.8738C22.2917 33.9487 22.0982 33.9872 21.9026 33.9872C21.7071 33.9872 21.5135 33.9487 21.3329 33.8738C21.1523 33.7989 20.9882 33.6892 20.8501 33.5509L17.6946 30.3939C17.5525 30.2567 17.4391 30.0925 17.3612 29.911C17.2832 29.7295 17.2422 29.5343 17.2404 29.3367C17.2387 29.1392 17.2764 28.9433 17.3512 28.7604C17.426 28.5776 17.5364 28.4115 17.6761 28.2718C17.8158 28.1321 17.9819 28.0216 18.1648 27.9468C18.3476 27.872 18.5435 27.8344 18.7411 27.8361C18.9386 27.8378 19.1338 27.8789 19.3153 27.9568C19.4968 28.0348 19.661 28.1481 19.7982 28.2902L20.4142 28.9062V24.8774C20.4142 24.4828 20.5709 24.1044 20.8499 23.8254C21.1289 23.5464 21.5073 23.3896 21.9019 23.3896ZM24.8774 13.5914V18.9264H30.2124L24.8774 13.5914Z" fill="currentColor"/>
    </svg>
  );

  const GradesIcon = () => (
    <svg className="nav-icon" width="30" height="34" viewBox="0 0 30 34" fill="none">
      <path d="M1 15.4C1 9.4 1 6.4 2.48556 4.2976C2.96476 3.61868 3.54481 3.02151 4.20444 2.528C6.25 1 9.16822 1 15 1C20.8318 1 23.75 1 25.794 2.528C26.4542 3.02138 27.0348 3.61855 27.5144 4.2976C29 6.4 29 9.4016 29 15.4V18.6C29 24.6 29 27.6 27.5144 29.7024C27.0348 30.3814 26.4542 30.9786 25.794 31.472C23.75 33 20.8318 33 15 33C9.16822 33 6.25 33 4.206 31.472C3.54581 30.9786 2.96523 30.3814 2.48556 29.7024C1 27.6 1 24.5984 1 18.6V15.4Z" stroke="currentColor" strokeWidth="2.25" fill="none"/>
      <path d="M19.6662 18.6001L18.3331 15.4001M18.3331 15.4001L15.9205 9.61127C15.7665 9.24007 15.404 9.00007 14.9996 9.00007C14.8045 8.99778 14.6131 9.05449 14.4491 9.16315C14.2851 9.27181 14.1557 9.42764 14.0771 9.61127L11.666 15.4001M18.3331 15.4001H11.666M10.3329 18.6001L11.666 15.4001M8.77734 25.0001H21.2218" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );

  const NotificationIcon = () => (
    <svg className="notification-icon" width="34" height="38" viewBox="0 0 34 38" fill="none">
      <path d="M13.2222 34.381H20.7778C20.7778 36.3714 19.0778 38 17 38C14.9222 38 13.2222 36.3714 13.2222 34.381ZM34 30.7619V32.5714H0V30.7619L3.77778 27.1429V16.2857C3.77778 10.6762 7.55556 5.79048 13.2222 4.16191V3.61905C13.2222 1.62857 14.9222 0 17 0C19.0778 0 20.7778 1.62857 20.7778 3.61905V4.16191C26.4444 5.79048 30.2222 10.6762 30.2222 16.2857V27.1429L34 30.7619ZM26.4444 16.2857C26.4444 11.219 22.2889 7.2381 17 7.2381C11.7111 7.2381 7.55556 11.219 7.55556 16.2857V28.9524H26.4444V16.2857Z" fill="currentColor"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="40" height="45" viewBox="0 0 40 45" fill="none">
      <path d="M14.6667 31.5L6 22.8333L3.5 25.3333L14.6667 36.5L36.5 14.6667L34 12.1667L14.6667 31.5Z" fill="currentColor"/>
    </svg>
  );

  const EditIcon = () => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M5.5 19.9855L11.5679 19.9648L24.8119 6.84733C25.3316 6.32758 25.6176 5.63733 25.6176 4.90308C25.6176 4.16883 25.3316 3.47858 24.8119 2.95883L22.6311 0.778078C21.5916 -0.261422 19.778 -0.255922 18.7468 0.773953L5.5 13.8942V19.9855ZM20.6869 2.72233L22.8718 4.89895L20.6759 7.0742L18.4951 4.89483L20.6869 2.72233ZM8.25 15.041L16.5412 6.82808L18.722 9.00883L10.4321 17.219L8.25 17.2258V15.041Z" fill="#0A2472"/>
      <path d="M2.75 25.4668H22C23.5166 25.4668 24.75 24.2334 24.75 22.7168V10.7983L22 13.5483V22.7168H7.09225C7.0565 22.7168 7.01938 22.7305 6.98363 22.7305C6.93825 22.7305 6.89288 22.7182 6.84613 22.7168H2.75V3.4668H12.1646L14.9146 0.716797H2.75C1.23337 0.716797 0 1.95017 0 3.4668V22.7168C0 24.2334 1.23337 25.4668 2.75 25.4668Z" fill="#0A2472"/>
    </svg>
  );

  const getNavIcon = (iconType) => {
    switch(iconType) {
      case 'dashboard': return <DashboardIcon />;
      case 'enrollment': return <EnrollmentIcon />;
      case 'schedule': return <ScheduleIcon />;
      case 'modules': return <ModulesIcon />;
      case 'grades': return <GradesIcon />;
      default: return <DashboardIcon />;
    }
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
            <svg className="success-icon" width="74" height="74" viewBox="0 0 75 75" fill="none">
              <path d="M74.375 37.1875C74.375 40.6539 71.8814 43.2537 69.6801 45.548C68.4283 46.8562 67.1334 48.2043 66.6453 49.3896C66.1937 50.4754 66.1672 52.275 66.1406 54.0182C66.0908 57.2588 66.0377 60.9311 63.4844 63.4844C60.9311 66.0377 57.2588 66.0908 54.0182 66.1406C52.275 66.1672 50.4754 66.1937 49.3896 66.6453C48.2043 67.1334 46.8562 68.4283 45.548 69.6801C43.2537 71.8814 40.6539 74.375 37.1875 74.375C33.7211 74.375 31.1213 71.8814 28.827 69.6801C27.5187 68.4283 26.1707 67.1334 24.9854 66.6453C23.8996 66.1937 22.1 66.1672 20.3568 66.1406C17.1162 66.0908 13.4439 66.0377 10.8906 63.4844C8.3373 60.9311 8.28418 57.2588 8.23438 54.0182C8.20781 52.275 8.18125 50.4754 7.72969 49.3896C7.2416 48.2043 5.94668 46.8562 4.69492 45.548C2.49355 43.2537 0 40.6539 0 37.1875C0 33.7211 2.49355 31.1213 4.69492 28.827C5.94668 27.5187 7.2416 26.1707 7.72969 24.9854C8.18125 23.8996 8.20781 22.1 8.23438 20.3568C8.28418 17.1162 8.3373 13.4439 10.8906 10.8906C13.4439 8.3373 17.1162 8.28418 20.3568 8.23438C22.1 8.20781 23.8996 8.18125 24.9854 7.72969C26.1707 7.2416 27.5187 5.94668 28.827 4.69492C31.1213 2.49355 33.7211 0 37.1875 0C40.6539 0 43.2537 2.49355 45.548 4.69492C46.8562 5.94668 48.2043 7.2416 49.3896 7.72969C50.4754 8.18125 52.275 8.20781 54.0182 8.23438C57.2588 8.28418 60.9311 8.3373 63.4844 10.8906C66.0377 13.4439 66.0908 17.1162 66.1406 20.3568C66.1672 22.1 66.1937 23.8996 66.6453 24.9854C67.1334 26.1707 68.4283 27.5187 69.6801 28.827C71.8814 31.1213 74.375 33.7211 74.375 37.1875Z" fill="#06B228"/>
            </svg>
            <svg className="check-mark" width="40" height="45" viewBox="0 0 40 45" fill="none">
              <path d="M14.6667 31.5L6 22.8333L3.5 25.3333L14.6667 36.5L36.5 14.6667L34 12.1667L14.6667 31.5Z" fill="white"/>
            </svg>
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
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <img 
            src="https://raw.githubusercontent.com/Golgrax/forthem-assets/refs/heads/main/students/logo/image.png?width=174" 
            alt="School Logo" 
            className="sidebar-logo"
          />
          <div className="sidebar-school-name">STO. NIÑO ELEMENTARY SCHOOL</div>
          <div className="sidebar-system-name">Student Access System</div>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              {getNavIcon(item.icon)}
              <span className="nav-text">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <NotificationIcon />
          <img 
            src="https://github.com/Golgrax/forthem-assets/blob/main/students/pfp/me.png?raw=true?width=174" 
            alt="User Avatar" 
            className="user-avatar"
          />
        </div>

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
                {step < 3 && <div className={`progress-line ${step < currentStep || (step === 2 && isEnrolled) ? 'active' : 'inactive'}`}></div>}
              </React.Fragment>
            ))}
            <div className={`progress-line ${isEnrolled ? 'active' : 'inactive'}`}></div>
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
