import axios from 'axios';

class Client {
  constructor() {
    this.user = sessionStorage.getItem('user');
    this.token = sessionStorage.getItem('token');
    this.expiresIn = sessionStorage.getItem('expiresIn');

    if (this.token) {
      this.isTokenValid().catch(err => {
        if (err.response.status == 401) {
          this.signOut();
          this.reloadPage();
        }
      });
    }

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

  isTokenValid() {
    return axios.get('http://localhost:3000/api/user', {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
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
}

export const client = new Client();
