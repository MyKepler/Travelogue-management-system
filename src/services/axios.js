/* eslint-disable */
import axios from 'axios' //引用axios

// axios 配置
axios.defaults.timeout = 5000; 
axios.defaults.baseURL = 'http://localhost:3000'; //这是调用数据接口

const api = axios.create({
  // baseURL: 'http://bhc-reservation-service-qa1.guahao-test.com',
  withCredentials: true,
  timeout: 11000, // 超时时间
  responseType: 'json', // default
  headers: {
    // 'X-CSRF-TOKEN': token,
    'Content-Type': 'application/json',
    // 'appId': 'd_web',
    // doctorInfo: 'Y1clMkYzTzVUeW5OVUxRd2hQdkN5dUpqTlNTMm1nbGVNSE5sUkRwc0RIYVVVJTJCQjQlMkZpJTJGS2FKd2VGVjlxRUJrMFElMkZ1dURjUVBaREtxQXAyOGgwZGZzZ1kyQlJQT0Myd1pLb3lTSFFNa2F6cGh6UFp1dW8zWHJ6QVpHeUQ5V09RdjBx',
  },
  validateStatus: status => status === 200,
});

export default api;