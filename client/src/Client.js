import axios from 'axios';

class Client {
  constructor() {
    this.user = sessionStorage.getItem('user');
    this.token = sessionStorage.getItem('token');
    this.expiresIn = sessionStorage.getItem('expiresIn');

    const { REACT_APP_MAPBOX_ACCESS_TOKEN: ACCESS_TOKEN } = process.env;
    this.mapbox_access_token = ACCESS_TOKEN;

    if (this.expiresIn) {
      this.setAutoLogout();
    }
  }

  isSignedIn() {
    return !!this.token;
  }

  setItem(key, value) {
    this[key] = value;
    sessionStorage.setItem(key, value);
  }

  removeItem(key) {
    this[key] = sessionStorage.removeItem(key);
  }

  authenticate = (route, { email, password }) => (
    axios.post(`http://localhost:3000${route}`, { email, password })
      .then(res => res.data)
      .then(({ user, token, expiresIn }) => {
        this.setItem('user', user);
        this.setItem('token', token);
        this.setItem('expiresIn', expiresIn);
        this.setAutoLogout();
      })
  )

  signOut() {
    this.removeItems(['token', 'user', 'expiresIn']);
  }

  removeItems(items) {
    for (let item of items) {
      this.removeItem(item);
    }
  }

  reloadPage() {
    window.location.reload();
  }

  setAutoLogout() {
    // convert expiresIn seconds to milliseconds
    const timeLeft = (Number(this.expiresIn) * 1000) - Date.now();
    setTimeout(() => {
      this.signOut();
      this.reloadPage();
    }, timeLeft)
  }

  createPlace(body) {
    return axios.post(`http://localhost:3000/api/place`, body, { headers: { 'Authorization': `Bearer ${this.token}` } }).then(res => res.data)
  }

  deletePlace(id) {
    return axios.delete(`http://localhost:3000/api/place/${id}`, { headers: { 'Authorization': `Bearer ${this.token}` } })
      .then(res => res.data)
  }

  getPlaces() {
    return axios.get('http://localhost:3000/api/place/all', {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).then(res => res.data);
  }

  searchPlaceName(text) {
    return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${this.mapbox_access_token}`).then(res => res.data);
  }
}

export const client = new Client();
