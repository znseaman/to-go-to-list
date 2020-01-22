import axios from 'axios';
const baseURL = process.env.NODE_ENV == 'development' ? process.env.REACT_APP_BASE_URL : '';

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(config => {
  if (config.url.match(/\/api\//)) {
    const token = sessionStorage.getItem('token');
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(res => res.data, error => {
  console.log('error', error);
  if (error.response.status == 401) {
    sessionStorage.removeItem('token');
    window.location.reload();
  }
  else if (error.response.status == 304) {
    return Promise.resolve();
  }
  return Promise.reject(error);
});

export default instance;