import axios from 'axios';
import axiosConfig from './shared/axios';
import { getItem, setItem, removeItem } from './shared/sessionStorage';
import { getTimeLeft } from './shared/utility';

class Client {
  constructor() {
    const { REACT_APP_MAPBOX_ACCESS_TOKEN: ACCESS_TOKEN } = process.env;
    this.mapbox_access_token = ACCESS_TOKEN;

    setAutoLogout(getTimeLeft(getItem('expiresIn') || 0));
  }

  isSignedIn = () => !!getItem('token')

  authenticate = (route, { email, password }) => (
    axiosConfig.post(`${route}`, { email, password })
      .then(({ token, expiresIn }) => {
        setItem('token', token);
        setItem('expiresIn', expiresIn);
        setAutoLogout(getTimeLeft(expiresIn));
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

  getPlaces = () => axiosConfig.get(`/api/place/all`)

  createPlace = body => axiosConfig.post(`/api/place`, body)

  deletePlace = id => axiosConfig.delete(`/api/place/${id}`)

  searchPlaceName = text => axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${this.mapbox_access_token}`)
    .then(res => res.data);
}

export const client = new Client();
