import axios from 'axios';
import axiosConfig from './shared/axios';

const getItem = sessionStorage.getItem.bind(sessionStorage);
const setItem = sessionStorage.setItem.bind(sessionStorage);
const removeItem = sessionStorage.removeItem.bind(sessionStorage);

const setAutoLogout = expiresIn => {
  // convert expiresIn seconds to milliseconds
  const timeLeft = (Number(expiresIn) * 1000) - Date.now();
  if (getItem('token')) {
    setTimeout(() => {
      removeItem('token');
      window.location.reload();
    }, timeLeft)
  }
};

const getTimeLeft = expiresIn => (Number(expiresIn) * 1000) - Date.now()

class Client {
  constructor() {
    this.user = getItem('user');
    this.removeItem = removeItem;

    const { REACT_APP_MAPBOX_ACCESS_TOKEN: ACCESS_TOKEN } = process.env;
    this.mapbox_access_token = ACCESS_TOKEN;

    const expiresIn = getItem('expiresIn');
    if (expiresIn) {
      setAutoLogout(expiresIn);
    }
  }

  isSignedIn = () => !!getItem('token')

  authenticate = (route, { email, password }) => (
    axiosConfig.post(`${route}`, { email, password })
      .then(({ user, token, expiresIn }) => {
        this.user = user;
        // this.expiresIn = expiresIn;
        setItem('user', user);
        setItem('token', token);
        setItem('expiresIn', expiresIn);
        setAutoLogout(expiresIn);
      })
  )

  setAutoLogout = expiresIn => {
    // convert expiresIn seconds to milliseconds
    const timeLeft = getTimeLeft(expiresIn);
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
