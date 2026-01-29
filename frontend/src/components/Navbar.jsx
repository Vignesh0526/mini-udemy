import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/courses?search=${searchQuery}`);
            setIsOpen(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    <BookOpen className="logo-icon" />
                    <span className="text-gradient">MiniUdemy</span>
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <Link to="/courses">Courses</Link>
                    <Link to="/teach">Teach</Link>
                    <div className="auth-buttons">
                        <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Log in</Link>
                        <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign up</Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="mobile-menu">
                        <Link to="/courses" onClick={() => setIsOpen(false)}>Courses</Link>
                        <Link to="/teach" onClick={() => setIsOpen(false)}>Teach</Link>
                        <Link to="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                        <Link to="/signup" className="btn btn-primary" onClick={() => setIsOpen(false)}>Sign up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
