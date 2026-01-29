import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import courseService from '../services/course.service';
import './Auth.css'; // Reusing Auth forms

const Teach = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        image: ''
    });
    const [message, setMessage] = useState('');

    // If not logged in, show message
    if (!user) {
        return (
            <div className="container" style={{ paddingTop: '100px', textAlign: 'center', color: 'white' }}>
                <h2>Please <a href="/login" style={{ color: 'var(--color-primary)' }}>Login</a> to create a course.</h2>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await courseService.createCourse(formData);
            setMessage('Course created successfully! Admin approval pending.');
            setTimeout(() => navigate('/courses'), 2000);
        } catch (error) {
            console.error(error);
            setMessage('Failed to create course.');
        }
    };

    return (
        <div className="auth-page" style={{ paddingTop: '40px' }}>
            <div className="auth-card card" style={{ maxWidth: '600px' }}>
                <div className="auth-header">
                    <h2>Create a New Course</h2>
                    <p>Share your knowledge with the world</p>
                </div>

                {message && <div style={{ color: message.includes('success') ? 'green' : 'red', textAlign: 'center', marginBottom: '10px' }}>{message}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Course Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Advanced React Patterns"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: 'white' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Detailed description of what students will learn..."
                            rows="4"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: 'white' }}
                        />
                    </div>

                    <div className="flex gap-2" style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #444', color: 'white' }}
                            >
                                <option value="">Select Category</option>
                                <option value="Development">Development</option>
                                <option value="Business">Business</option>
                                <option value="Finance">Finance</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                placeholder="19.99"
                                step="0.01"
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: 'white' }}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Thumbnail Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: 'white' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
                        Create Course
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Teach;
