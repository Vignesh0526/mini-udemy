import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import './Auth.css';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext path

const Login = () => {
    const { login } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            await login(formData.email, formData.password);
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        } catch (err) {
            // Check for specific backend error message
            if (err.response && err.response.data) {
                setError(typeof err.response.data === 'string' ? err.response.data : 'Login failed');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Log in to continue your learning journey</p>
                </div>

                {error && <div className="error-message" style={{ color: '#ff4444', marginBottom: '1rem', textAlign: 'center', background: 'rgba(255, 68, 68, 0.1)', padding: '10px', borderRadius: '5px' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
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
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'gray',
                                    cursor: 'pointer'
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-actions">
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">
                        Log In <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup" className="text-highlight">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
