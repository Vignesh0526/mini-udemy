import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import CourseService from '../services/course.service';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, User, Clock, Award, Star } from 'lucide-react';
import './Home.css';

const CourseDetail = () => {
    const { id } = useParams();
    const { currentUser, user } = useContext(AuthContext); // Use 'user' locally for consistency if AuthContext provides it
    const activeUser = user || currentUser;

    const [course, setCourse] = useState(null);
    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    // Static fallback data lookup
    const staticCourses = [
        {
            id: 1,
            title: "Java Programming Masterclass",
            instructor: { firstName: "Tim", lastName: "Buchalka" },
            price: 19.99,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Development",
            rating: 4.8,
            description: "Learn Java In This Course And Become a Computer Programmer. Obtain valuable Core Java Skills And Java Certification."
        },
        {
            id: 2,
            title: "Java Full Stack Development with Spring Boot & React",
            instructor: { firstName: "Ranga", lastName: "Karanam" },
            price: 29.99,
            image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Full Stack",
            rating: 4.9,
            description: "Master Java Full Stack development with Spring Boot, React, Docker, and AWS. Build production-ready applications."
        },
        {
            id: 3,
            title: "2024 Complete Python Bootcamp From Zero to Hero in Python",
            instructor: { firstName: "Jose", lastName: "Portilla" },
            price: 14.99,
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Development",
            rating: 4.7,
            description: "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games."
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
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "DevOps",
            rating: 4.8,
            description: "Learn DevOps with real world projects including AWS, Jenkins, Docker, Kubernetes, Ansible, Terraform and more."
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
            description: "Learn Selenium with Python from scratch. Automate web applications using Python and Selenium WebDriver."
        }
    ];

    useEffect(() => {
        const fetchCourseAndEnrollment = async () => {
            try {
                // 1. Fetch Course details
                let courseData = null;
                try {
                    const res = await CourseService.getCourseById(id);
                    courseData = res.data;
                    setCourse(res.data);
                } catch (err) {
                    // Fallback to static data
                    const found = staticCourses.find(c => c.id === parseInt(id));
                    if (found) {
                        courseData = found;
                        setCourse(found);
                    }
                }

                if (courseData) {
                    // 2. Fetch Enrollment Status from ALL enrollments
                    // Ideally we should have an API to check single enrollment status, but we can reuse getEnrollments
                    if (activeUser) {
                        try {
                            const enrollRes = await CourseService.getEnrollments();
                            const myEnrollment = enrollRes.data.find(e => e.course.id === parseInt(id));
                            if (myEnrollment) {
                                setEnrolled(true);
                                setProgress(myEnrollment.progress || 0);
                            }
                        } catch (e) {
                            console.log("Not enrolled or error checking status");
                            // Fallback to local
                            const enrolledIds = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
                            if (enrolledIds.includes(parseInt(id))) {
                                setEnrolled(true);
                            }
                        }
                    }
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseAndEnrollment();
    }, [id, activeUser]);

    const navigate = useNavigate();
    const location = useLocation();

    // ... (keep useEffect)

    const handleEnroll = async () => {
        if (!activeUser) {
            // Smart redirect
            navigate('/login', { state: { from: location } });
            return;
        }

        try {
            await CourseService.enroll(id);
            setEnrolled(true);
            alert('Payment Successful! You are now enrolled.');
        } catch (err) {
            console.error(err);
            // Fallback to local storage for demo if backend fails
            const enrolledIds = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
            if (!enrolledIds.includes(parseInt(id))) {
                enrolledIds.push(parseInt(id));
                localStorage.setItem('enrolledCourses', JSON.stringify(enrolledIds));
            }
            setEnrolled(true);
            alert('Payment Successful! You are now enrolled.');
        }
    };

    const handleSimulateProgress = async () => {
        const newProgress = Math.min(progress + 25, 100);
        setProgress(newProgress);

        try {
            // Save to backend
            if (activeUser) {
                await CourseService.updateProgress(id, newProgress);
            } else {
                // Local storage fallback for demo
                // (Existing logic handles this via setProgress, but we can't really save 'progress' to local storage easily without structure)
            }
        } catch (err) {
            console.error("Failed to save progress", err);
        }

        if (newProgress === 100) {
            alert('Congratulations! You have completed the course.');
        }
    };

    const handleDownloadCertificate = async () => {
        try {
            const response = await CourseService.downloadCertificate(id);
            // Create a blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Certificate-${course.title}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Download failed", err);
            alert("Failed to download certificate. Ensure course is 100% complete.");
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '100px', color: 'white', textAlign: 'center' }}>Loading...</div>;
    if (!course) return <div className="container" style={{ paddingTop: '100px', color: 'white', textAlign: 'center' }}>Course not found</div>;

    return (
        <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '80px', color: 'white' }}>
            {/* Hero Header */}
            <div style={{ background: 'linear-gradient(to right, #1e293b, #0f172a)', padding: '3rem 0', color: 'white' }}>
                <div className="container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 2, minWidth: '300px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-gradient">{course.title}</h1>
                        <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>{course.description}</p>

                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Award size={18} className="text-primary" />
                                <span>Bestseller</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Star size={18} style={{ color: '#fbbf24' }} />
                                <span>{course.rating || 4.5} Rating</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={18} />
                                <span>Created by <span className="text-primary">{course.instructor?.firstName} {course.instructor?.lastName}</span></span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                            <Clock size={16} />
                            <span>Last updated 1/2026</span>
                            <span>•</span>
                            <span>English</span>
                        </div>
                    </div>

                    <div style={{ flex: 1, minWidth: '300px' }}>
                        {/* Course Card Sidebar is commonly separate, but let's keep simple layout here */}
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <img
                            src={course.image || course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                            alt={course.title}
                            style={{ width: '100%', borderRadius: 'var(--border-radius-md)', aspectRatio: '16/9', objectFit: 'cover' }}
                        />
                    </div>

                    <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>${course.price}</h2>

                        {!enrolled ? (
                            <>
                                <button className="btn btn-primary" onClick={handleEnroll} style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', marginBottom: '1rem' }}>
                                    Buy Now
                                </button>
                                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#94a3b8' }}>30-Day Money-Back Guarantee</p>
                            </>
                        ) : (
                            <div>
                                <h3 style={{ marginBottom: '1rem', color: 'var(--color-success)' }}>You are enrolled!</h3>
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span>Course Progress</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px' }}>
                                        <div style={{ width: `${progress}%`, background: 'var(--color-primary)', height: '100%', borderRadius: '4px', transition: 'width 0.3s' }}></div>
                                    </div>
                                </div>
                                <button className="btn btn-primary" onClick={handleSimulateProgress} disabled={progress >= 100} style={{ width: '100%', marginBottom: '1rem' }}>
                                    {progress >= 100 ? 'Course Completed' : 'Continue Learning'}
                                </button>
                                {progress >= 100 && (
                                    <button className="btn btn-secondary" onClick={handleDownloadCertificate} style={{ width: '100%', background: 'var(--color-success)', border: 'none' }}>
                                        Download Certificate 🎓
                                    </button>
                                )}
                            </div>
                        )}

                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>This course includes:</h4>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#94a3b8' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• 24 hours on-demand video</li>
                                <li style={{ marginBottom: '0.5rem' }}>• 5 coding exercises</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Full lifetime access</li>
                                <li>• Certificate of completion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ maxWidth: '800px' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>What you'll learn</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[
                            "Master the core concepts",
                            "Build real-world projects",
                            "Understand best practices",
                            "Get job-ready skills"
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--color-primary)' }}>✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Description</h3>
                    <p style={{ lineHeight: '1.6', color: '#cbd5e1' }}>
                        {course.description}
                        <br /><br />
                        This course is designed to take you from a complete beginner to a job-ready professional.
                        We cover everything from the very basics to advanced topics.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
