import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER' // Default to USER, could be INSTRUCTOR
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        try {
            await register(formData.firstName, formData.lastName, formData.email, formData.password, formData.role);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card card">
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p>Join MiniUdemy today</p>
                </div>

                {error && <div style={{ color: 'var(--color-error)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="flex gap-2">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>First Name</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18} />
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Last Name</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18} />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>I want to:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--border-radius-md)',
                                background: 'rgba(15, 23, 42, 0.6)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <option value="USER">Learn (Student)</option>
                            <option value="INSTRUCTOR">Teach (Instructor)</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
                        Sign Up <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login" className="text-highlight">Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
