import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import courseService from '../services/course.service';
import './Home.css'; // Reusing Home CSS for course grid

const Courses = () => {
    const [searchParams] = useSearchParams();
    const queryFromUrl = searchParams.get('search') || '';
    const [searchQuery, setSearchQuery] = useState(queryFromUrl);

    const [courses, setCourses] = useState([
        // Fallback static data in case backend is empty
        {
            id: 1,
            title: "Java Programming Masterclass",
            instructor: { firstName: "Tim", lastName: "Buchalka" },
            price: 19.99,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Development",
            rating: 4.8,
            technologies: ["Java", "IntelliJ"]
        },
        {
            id: 2,
            title: "Java Full Stack Development with Spring Boot & React",
            instructor: { firstName: "Ranga", lastName: "Karanam" },
            price: 29.99,
            image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Full Stack",
            rating: 4.9,
            technologies: ["Java", "Spring Boot", "React"]
        },
        {
            id: 3,
            title: "2024 Complete Python Bootcamp From Zero to Hero in Python",
            instructor: { firstName: "Jose", lastName: "Portilla" },
            price: 14.99,
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Development",
            rating: 4.7,
            technologies: ["Python 3"]
        },
        {
            id: 4,
            title: "Python Full Stack: Django, React, PostgreSQL",
            instructor: { firstName: "Brad", lastName: "Traversy" },
            price: 24.99,
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Full Stack",
            rating: 4.6,
            technologies: ["Django", "React", "PostgreSQL"]
        },
        {
            id: 5,
            title: "DevOps Beginners to Advanced with Projects",
            instructor: { firstName: "Imran", lastName: "Teli" },
            price: 22.99,
            image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "DevOps",
            rating: 4.8,
            technologies: ["Docker", "Kubernetes", "AWS"]
        },
        {
            id: 6,
            title: "AWS Certified Solutions Architect - Associate 2024",
            instructor: { firstName: "Stephane", lastName: "Maarek" },
            price: 19.99,
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Cloud Computing",
            rating: 4.9,
            technologies: ["AWS", "IAM", "EC2"]
        },
        {
            id: 7,
            title: "Selenium WebDriver with Java - Basics to Advanced",
            instructor: { firstName: "Rahul", lastName: "Shetty" },
            price: 15.99,
            image: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Testing",
            rating: 4.6,
            technologies: ["Selenium", "Java"]
        },
        {
            id: 8,
            title: "Selenium Python Automation Testing from Scratch",
            instructor: { firstName: "Pavan", lastName: "Kumar" },
            price: 16.99,
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Testing",
            rating: 4.5,
            technologies: ["Selenium", "Python"]
        }
    ]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Development', 'Business', 'Finance', 'Design', 'Marketing', 'It & Software', 'Personal Development'];

    useEffect(() => {
        setSearchQuery(queryFromUrl);
    }, [queryFromUrl]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseService.getAllCourses();
                if (response.data && response.data.length > 0) {
                    setCourses(prevCourses => [...response.data, ...prevCourses.slice(0, 0)]);
                    setCourses(response.data.length > 0 ? response.data : courses);
                }
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return <div className="container" style={{ padding: '5rem 0', textAlign: 'center', color: 'white' }}>Loading courses...</div>;
    }

    return (
        <div className="courses-page" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 className="section-title" style={{ margin: 0 }}>All <span className="text-gradient">Courses</span></h2>

                        {/* Search Bar */}
                        <div style={{ position: 'relative', width: '300px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 10px 10px 35px',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white'
                                }}
                            />
                        </div>
                    </div>

                    {/* Category Filter Chips */}
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid ' + (selectedCategory === cat ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'),
                                    background: selectedCategory === cat ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                </div>

                {filteredCourses.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', padding: '2rem' }}>
                        No courses found matching "{searchQuery}"
                    </div>
                ) : (
                    <div className="course-grid">
                        {filteredCourses.map(course => (
                            <div key={course.id} className="course-card card">
                                <div className="course-img-wrapper">
                                    <img src={course.image || course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={course.title} />
                                    <span className="course-category">{course.category || 'General'}</span>
                                </div>
                                <div className="course-content">
                                    <h3>{course.title}</h3>
                                    <p className="instructor">
                                        {course.instructor ? `${course.instructor.firstName} ${course.instructor.lastName}` : 'Unknown Instructor'}
                                    </p>

                                    {/* Tech Stack Badges */}
                                    {course.technologies && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                                            {course.technologies.slice(0, 3).map((tech, idx) => (
                                                <span key={idx} style={{
                                                    fontSize: '0.75rem',
                                                    padding: '2px 8px',
                                                    borderRadius: '10px',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    color: '#ccc'
                                                }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="course-meta">
                                        <span className="rating">⭐ {course.rating || 4.5}</span>
                                        <span className="price">${course.price}</span>
                                    </div>
                                    <Link to={`/course/${course.id}`} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', display: 'block', textAlign: 'center' }}>
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
