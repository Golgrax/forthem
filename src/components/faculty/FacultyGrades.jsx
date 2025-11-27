import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import FacultyHeader from './FacultyHeader';
import FacultySidebar from './FacultySidebar';

const FacultyGrades = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [classRecords, setClassRecords] = useState([]);
    const [selectedClassRecord, setSelectedClassRecord] = useState(null);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        // Fetch class records for the faculty
        // For now, we will use mock data
        const mockClassRecords = [
            { id: 1, school_year: '2025-2026', grade_section: 'V-MOLAVE', subject: 'SCIENCE 5', quarter: 1 },
            { id: 2, school_year: '2025-2026', grade_section: 'IX-PEACH', subject: 'SCIENCE 9', quarter: 2 },
        ];
        setClassRecords(mockClassRecords);
    }, [user]);

    const handleClassRecordSelect = (classRecord) => {
        setSelectedClassRecord(classRecord);
        // Fetch grades for the selected class record
        // For now, we will use mock data
        const mockGrades = [
            { id: 1, student_id: 1, student_name: 'John Doe', written_works: [], performance_tasks: [], quarterly_assessment: [] },
            { id: 2, student_id: 2, student_name: 'Jane Smith', written_works: [], performance_tasks: [], quarterly_assessment: [] },
        ];
        setGrades(mockGrades);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const getNavItems = () => [
        { path: '/faculty/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/faculty/masterlist', icon: 'masterlist', label: 'Masterlist' },
        { path: '/faculty/schedule', icon: 'schedule', label: 'Schedule' },
        { path: '/faculty/grades', icon: 'grades', label: 'Grades' },
    ];

    return (
        <div className="dashboard-container faculty-container">
            <FacultySidebar
                isMenuOpen={isMenuOpen}
                handleNavigation={() => {}}
                navItems={getNavItems()}
                toggleMenu={toggleMenu}
            />
            <div className="main-content">
                <FacultyHeader toggleMenu={toggleMenu} />
                <div className="content-area">
                    <h1 className="faculty-title">Class Records</h1>
                    <div className="class-records-list">
                        {classRecords.map(record => (
                            <div key={record.id} onClick={() => handleClassRecordSelect(record)} className="class-record-item">
                                {record.grade_section} - {record.subject} (Q{record.quarter})
                            </div>
                        ))}
                    </div>
                    {selectedClassRecord && (
                        <div className="grades-table">
                            <h2>{selectedClassRecord.grade_section} - {selectedClassRecord.subject}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Learner's Name</th>
                                        {/* Add more headers based on the PDF */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {grades.map(grade => (
                                        <tr key={grade.id}>
                                            <td>{grade.student_name}</td>
                                            {/* Add more cells for scores */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FacultyGrades;
