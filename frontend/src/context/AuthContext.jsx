import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const data = await AuthService.login(email, password);
            setCurrentUser(data);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    const register = async (firstName, lastName, email, password, role) => {
        return AuthService.register(firstName, lastName, email, password, role);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
