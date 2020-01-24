import axios from 'axios';
import { getItem, removeItem } from './sessionStorage';
const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(config => {
  if (config.url.match(/\/api\//)) {
    const token = getItem('token');
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(res => res.data, error => {
  if (error.response.status == 401) {
    removeItem('token');
    window.location.reload();
  }
  else if (error.response.status == 304) {
    return Promise.resolve();
  }
  return Promise.reject(error);
});

export default instance;