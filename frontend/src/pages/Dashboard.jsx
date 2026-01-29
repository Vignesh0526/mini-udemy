import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import CourseService from '../services/course.service';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // For Instructors
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        price: 0,
        category: 'Development',
        thumbnailUrl: ''
    });
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Static courses fallback lookup (same as CourseDetail for consistency)
    const staticCourses = [
        {
            id: 1,
            title: "Java Programming Masterclass",
            instructor: { firstName: "Tim", lastName: "Buchalka" },
            price: 19.99,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Development",
            rating: 4.8,
            description: "Learn Java In This Course And Become a Computer Programmer."
        },
        {
            id: 2,
            title: "Java Full Stack Development with Spring Boot & React",
            instructor: { firstName: "Ranga", lastName: "Karanam" },
            price: 29.99,
            image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Full Stack",
            rating: 4.9,
            description: "Master Java Full Stack development with Spring Boot, React, Docker, and AWS."
        },
        {
            id: 3,
            title: "2024 Complete Python Bootcamp From Zero to Hero in Python",
            instructor: { firstName: "Jose", lastName: "Portilla" },
            price: 14.99,
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Development",
            rating: 4.7,
            description: "Learn Python like a Professional! Start from the basics."
        },
        {
            id: 4,
            title: "Python Full Stack: Django, React, PostgreSQL",
            instructor: { firstName: "Brad", lastName: "Traversy" },
            price: 24.99,
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Full Stack",
            rating: 4.6,
            description: "Build a complete full stack application with Python, Django, React and PostgreSQL."
        },
        {
            id: 5,
            title: "DevOps Beginners to Advanced with Projects",
            instructor: { firstName: "Imran", lastName: "Teli" },
            price: 22.99,
            image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "DevOps",
            rating: 4.8,
            description: "Learn DevOps with real world projects including AWS, Jenkins, Docker, Kubernetes."
        },
        {
            id: 6,
            title: "AWS Certified Solutions Architect - Associate 2024",
            instructor: { firstName: "Stephane", lastName: "Maarek" },
            price: 19.99,
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Cloud Computing",
            rating: 4.9,
            description: "Master the AWS Cloud and pass the AWS Certified Solutions Architect Associate exam."
        },
        {
            id: 7,
            title: "Selenium WebDriver with Java - Basics to Advanced",
            instructor: { firstName: "Rahul", lastName: "Shetty" },
            price: 15.99,
            image: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Testing",
            rating: 4.6,
            description: "Master Selenium WebDriver, TestNG, Maven, Jenkins, and more frameworks with Java."
        },
        {
            id: 8,
            title: "Selenium Python Automation Testing from Scratch",
            instructor: { firstName: "Pavan", lastName: "Kumar" },
            price: 16.99,
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Testing",
            rating: 4.5,
            description: "Learn Selenium with Python from scratch. Automate web applications using Python."
        }
    ];

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        fetchData();
        fetchEnrollments();
    }, [currentUser]);

    const fetchEnrollments = async () => {
        try {
            const res = await CourseService.getEnrollments();
            if (res.data) {
                // res.data is a list of Enrollment objects which contain { course: {...}, progress: 0-100 }
                setEnrolledCourses(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch enrollments", error);
            // Fallback to local storage only if API fails completely (e.g. backend down)
            const enrolledIds = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
            if (enrolledIds.length > 0) {
                const myCourses = enrolledIds.map(id => staticCourses.find(c => c.id === id)).filter(Boolean)
                    .map(c => ({ course: c, progress: 0 })); // Mock structure to match API
                setEnrolledCourses(myCourses);
            }
        }
    };

    const fetchData = async () => {
        try {
            const res = await CourseService.getAllCourses();
            if (currentUser.role === 'INSTRUCTOR') {
                const myCourses = res.data.filter(c => c.instructor?.email === currentUser.email);
                setCourses(myCourses);
            } else {
                setCourses(res.data);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            await CourseService.createCourse(newCourse);
            setShowCreateForm(false);
            fetchData();
            alert('Course created! Waiting for admin approval.');
        } catch (err) {
            alert('Failed to create course');
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '100px', color: 'white', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '90px' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1>Welcome, <span className="text-gradient">{currentUser?.firstName || 'User'}</span>!</h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Continue where you left off</p>
                </div>

                {currentUser?.role === 'INSTRUCTOR' && (
                    <button className="btn btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
                        {showCreateForm ? 'Cancel' : 'Create New Course'}
                    </button>
                )}
            </div>

            <div className="dashboard-content">
                {/* Instructor Create Form */}
                {showCreateForm && (
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3>Create Course</h3>
                        <form onSubmit={handleCreateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Course Title"
                                value={newCourse.title}
                                onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                                required
                                style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid #333' }}
                            />
                            <textarea
                                placeholder="Description"
                                value={newCourse.description}
                                onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                                required
                                style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid #333' }}
                            />
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={newCourse.price}
                                    onChange={e => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })}
                                    style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid #333' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Thumbnail URL (e.g. https://...)"
                                    value={newCourse.thumbnailUrl}
                                    onChange={e => setNewCourse({ ...newCourse, thumbnailUrl: e.target.value })}
                                    style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid #333' }}
                                />
                            </div>
                            <button type="submit" className="btn btn-secondary">Submit for Approval</button>
                        </form>
                    </div>
                )}

                {/* Enrolleed Courses Section (For Students) */}
                {currentUser?.role !== 'INSTRUCTOR' && (
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>My Learning</h2>

                        {enrolledCourses.length > 0 ? (
                            <div className="course-grid">
                                {enrolledCourses.map(enrollment => {
                                    // Handle both structure types (API vs Legacy/Mock)
                                    // API returns { course: {...}, progress: N }
                                    // Mock might return direct course object? No, we standardized to { course: c, progress: 0 } in fetchEnrollments fallback
                                    const course = enrollment.course || enrollment;
                                    const progress = enrollment.progress || 0;

                                    return (
                                        <div key={course.id} className="card course-card">
                                            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                                <img
                                                    src={course.thumbnailUrl || course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                                    alt={course.title}
                                                    style={{ width: '100%', borderRadius: '8px', aspectRatio: '16/9', objectFit: 'cover' }}
                                                />
                                                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(50, 205, 50, 0.9)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                    Active
                                                </div>
                                            </div>
                                            <h3>{course.title}</h3>
                                            <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', margin: '1rem 0' }}>
                                                <div style={{ width: `${progress}%`, background: progress >= 100 ? 'var(--color-success)' : 'var(--color-primary)', height: '100%', borderRadius: '3px' }}></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
                                                <span>Progress</span>
                                                <span>{progress}%</span>
                                            </div>
                                            <button className="btn btn-primary" onClick={() => navigate(`/course/${course.id}`)} style={{ width: '100%' }}>
                                                {progress >= 100 ? 'Review Course' : 'Continue Learning'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                                <h3 style={{ color: '#94a3b8', marginBottom: '1rem' }}>You haven't enrolled in any courses yet.</h3>
                                <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Created Courses (For Instructors) */}
                {currentUser?.role === 'INSTRUCTOR' && (
                    <div>
                        <h2>My Created Courses</h2>
                        <div className="course-grid">
                            {courses.map(course => (
                                <div key={course.id} className="card course-card">
                                    <h3>{course.title}</h3>
                                    <p>{course.description?.substring(0, 100)}...</p>
                                    <div className="flex justify-between" style={{ marginTop: '1rem' }}>
                                        <span style={{ color: course.approved ? 'var(--color-success)' : 'var(--color-warning)' }}>
                                            {course.approved ? 'Live' : 'Pending Approval'}
                                        </span>
                                        <button className="btn btn-secondary" onClick={() => navigate(`/course/${course.id}`)}>
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {courses.length === 0 && <p>No courses found.</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
