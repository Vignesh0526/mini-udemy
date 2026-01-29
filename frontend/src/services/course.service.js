import api from './api';

const getAllCourses = () => {
    return api.get('/courses');
};

const createCourse = (courseData) => {
    return api.post('/courses', courseData);
};

const getCourseById = (id) => {
    return api.get(`/courses/${id}`);
};

const enroll = (courseId) => {
    return api.post(`/enrollments/${courseId}`);
};

const updateProgress = (courseId, progress) => {
    return api.post(`/enrollments/${courseId}/progress?progress=${progress}`);
};

const downloadCertificate = (courseId) => {
    return api.get(`/enrollments/${courseId}/certificate`, { responseType: 'blob' });
};

const approveCourse = (courseId) => {
    return api.put(`/admin/courses/${courseId}/approve`);
};

const getAdminCourses = () => {
    return api.get('/admin/courses');
};

const getEnrollments = () => {
    return api.get('/enrollments/my');
};

const courseService = {
    getAllCourses,
    createCourse,
    getCourseById,
    enroll,
    updateProgress,
    getEnrollments, // Added this
    downloadCertificate,
    downloadCertificate,
    approveCourse,
    getAdminCourses
};

export default courseService;
