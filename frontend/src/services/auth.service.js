import api from './api';

const register = (firstName, lastName, email, password, role) => {
    return api.post('/auth/signup', {
        firstName,
        lastName,
        email,
        password,
        role
    });
};

const login = (email, password) => {
    return api.post('/auth/login', {
        email,
        password,
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;
