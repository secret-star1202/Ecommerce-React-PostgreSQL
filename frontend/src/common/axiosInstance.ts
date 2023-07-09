import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-backend2.azurewebsites.net/api/v1',
});
export default axiosInstance;
