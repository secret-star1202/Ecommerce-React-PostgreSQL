import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5113/api/v1',
});
export default axiosInstance;

//https://api.escuelajs.co/api/v1
