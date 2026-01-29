import React from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Award, Clock } from 'lucide-react';
import './Home.css';

const Home = () => {
    const featuredCourses = [
        {
            id: 1,
            title: "Complete Python Bootcamp: Go from zero to hero",
            instructor: "Jose Portilla",
            rating: 4.8,
            price: "$19.99",
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Development"
        },
        {
            id: 2,
            title: "The Web Developer Bootcamp 2024",
            instructor: "Colt Steele",
            rating: 4.7,
            price: "$24.99",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Web Dev"
        },
        {
            id: 3,
            title: "Machine Learning A-Z™: AI, Python & R",
            instructor: "Kirill Eremenko",
            rating: 4.6,
            price: "$14.99",
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Data Science"
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Unlock Your Potential with <span className="text-gradient">MiniUdemy</span>
                        </h1>
                        <p className="hero-subtitle">
                            Learn from industry experts and enhance your skills with our premium courses.
                            Get certified and advance your career today.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
                            <Link to="/courses" className="btn btn-secondary">
                                <Play size={18} style={{ marginRight: '8px' }} /> Watch Demo
                            </Link>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">10k+</span>
                                <span className="stat-label">Students</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Courses</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">4.8</span>
                                <span className="stat-label">Rating</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image-container">
                        <div className="hero-glow"></div>
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Learning" className="hero-img" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features container">
                <div className="feature-card">
                    <div className="feature-icon"><TrendingUp /></div>
                    <h3>Expert Instructors</h3>
                    <p>Learn from the best in the industry with real-world experience.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><Clock /></div>
                    <h3>Lifetime Access</h3>
                    <p>Learn at your own pace with lifetime access to all course materials.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><Award /></div>
                    <h3>Certification</h3>
                    <p>Earn a certificate upon completion to showcase your skills.</p>
                </div>
            </section>

            {/* Popular Courses */}
            <section className="trending-courses container">
                <h2 className="section-title">Trending <span className="text-gradient">Courses</span></h2>
                <div className="course-grid">
                    {featuredCourses.map(course => (
                        <div key={course.id} className="course-card card">
                            <div className="course-img-wrapper">
                                <img src={course.image} alt={course.title} />
                                <span className="course-category">{course.category}</span>
                            </div>
                            <div className="course-content">
                                <h3>{course.title}</h3>
                                <p className="instructor">{course.instructor}</p>
                                <div className="course-meta">
                                    <span className="rating">⭐ {course.rating}</span>
                                    <span className="price">{course.price}</span>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Enroll Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
