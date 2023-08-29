import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Set the bearer token in the default headers
const token = localStorage.getItem('authToken');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
