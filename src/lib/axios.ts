import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://localhost:8080/api/v1/contacts`,
    timeout: 60000,
});
export default axiosInstance;