import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-postgresql-backend.azurewebsites.net/api/v1',
});
export default axiosInstance;
