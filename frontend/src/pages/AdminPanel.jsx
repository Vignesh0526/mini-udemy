import React, { useEffect, useState, useContext } from 'react';
import CourseService from '../services/course.service';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const { currentUser } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'ADMIN') {
            // navigate('/'); // Redirect if not admin
            // For demo, we might want to let them see it or show a message
        }
        fetchCourses();
    }, [currentUser]);

    const fetchCourses = async () => {
        try {
            const res = await CourseService.getAdminCourses();
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleApprove = async (id) => {
        try {
            await CourseService.approveCourse(id);
            alert('Course Approved');
            fetchCourses();
        } catch (err) {
            alert('Error approving course');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '90px' }}>
            <h1>Admin Dashboard</h1>
            <div className="card">
                <h2>Pending Approvals</h2>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Course</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Instructor</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Status</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{course.title}</td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{course.instructor?.firstName}</td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    {course.approved ? <span style={{ color: 'var(--color-success)' }}>Active</span> : <span style={{ color: 'var(--color-warning)' }}>Pending</span>}
                                </td>
                                <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    {!course.approved && (
                                        <button className="btn btn-primary" onClick={() => handleApprove(course.id)}>
                                            Approve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
