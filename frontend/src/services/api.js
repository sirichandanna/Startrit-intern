import axios from 'axios';

const API_BASE = {
  auth: '/api/auth',
  jobs: '/api/jobs',
  reviews: '/api/reviews'
};

// Configure axios interceptor for auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  signup: (data) => axios.post(`${API_BASE.auth}/signup`, data),
  login: (data) => axios.post(`${API_BASE.auth}/login`, data),
  getProfile: () => axios.get(`${API_BASE.auth}/profile`),
};

export const jobsAPI = {
  getAllJobs: () => axios.get(`${API_BASE.jobs}`),
  getJobById: (id) => axios.get(`${API_BASE.jobs}/${id}`),
  createJob: (data) => axios.post(`${API_BASE.jobs}`, data),
  updateJob: (id, data) => axios.put(`${API_BASE.jobs}/${id}`, data),
  deleteJob: (id) => axios.delete(`${API_BASE.jobs}/${id}`),
  applyToJob: (id) => axios.post(`${API_BASE.jobs}/${id}/apply`),
};
