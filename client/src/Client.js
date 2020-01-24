import axios from 'axios';
import axiosConfig from './shared/axios';
import { getItem, setItem, removeItem } from './shared/sessionStorage';
import { getTimeLeft } from './shared/utility';
const { REACT_APP_BASE_URL: baseURL } = process.env;

class Client {
  constructor() {
    this.setAutoLogout(getTimeLeft(getItem('expiresIn') || 0));
  }

  isSignedIn = () => !!getItem('token')

  authenticate = route => ({ email, password }) => (
    axiosConfig.post(`${route}`, { email, password })
      .then(({ token, expiresIn }) => {
        setItem('token', token);
        setItem('expiresIn', expiresIn);
        this.setAutoLogout(getTimeLeft(expiresIn));
      })
  )

  setAutoLogout = timeLeft => {
    if (getItem('token')) {
      setTimeout(() => {
        removeItem('token');
        window.location.reload();
      }, timeLeft)
    }
  }

  getPlaces = () => axiosConfig.get(`/api/place/all?order=DESC&orderBy=createdAt`)

  createPlace = body => axiosConfig.post(`/api/place`, body)

  deletePlace = id => axiosConfig.delete(`/api/place/${id}`)

  searchPlaceName = ACCESS_TOKEN => text => axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${ACCESS_TOKEN}`)
    .then(res => res.data);
}

export const client = new Client();
