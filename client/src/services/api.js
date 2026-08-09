import axios from 'axios';

const API = axios.create({
  baseURL: '/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to attach Authorization Bearer token from localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling global auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear invalid token if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// API Service Call Wrappers
export const authService = {
  register: (data) => API.post('/register', data),
  login: (data) => API.post('/login', data),
  sendOTP: (email) => API.post('/send-otp', { email }),
  verifyOTP: (email, otp) => API.post('/verify-otp', { email, otp }),
  resendOTP: (email) => API.post('/resend-otp', { email }),
  forgotPassword: (email) => API.post('/forgot-password', { email }),
  resetPassword: (data) => API.post('/reset-password', data),
  getProfile: () => API.get('/profile'),
  updateProfile: (data) => API.put('/profile', data),
  changePassword: (data) => API.put('/change-password', data),
  getDashboardStats: (userId) => axios.get('/api/auth/dashboard-stats', { params: { userId } }),
};

export const careerService = {
  getCareers: (params) => axios.get('/api/careers', { params }),
  getCareerById: (id) => axios.get(`/api/careers/${id}`),
  createCareer: (data) => axios.post('/api/careers', data),
  updateCareer: (id, data) => axios.put(`/api/careers/${id}`, data),
  deleteCareer: (id) => axios.delete(`/api/careers/${id}`),
};

export const progressService = {
  getCareerProgress: (careerId, userId) =>
    axios.get(`/api/progress/${careerId}`, { params: { userId } }),
  updateStepProgress: (data) => axios.post('/api/progress/step', data),
};

export const resourceService = {
  getResources: (params) => axios.get('/api/resources', { params }),
  getResourceById: (id) => axios.get(`/api/resources/${id}`),
};

export const bookmarkService = {
  getBookmarks: (userId) => axios.get('/api/bookmarks', { params: { userId } }),
  toggleBookmark: (data) => axios.post('/api/bookmarks/toggle', data),
};

export default API;
