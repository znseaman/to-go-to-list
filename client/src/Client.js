import axios from 'axios';

class Client {
  constructor() {
    this.user = sessionStorage.getItem('user');
    this.token = sessionStorage.getItem('token');

    if (this.token) {
      this.isTokenValid().catch(err => {
        if (err.response.status == 401) {
          this.removeToken();
          this.removeUser();
          window.location.reload();
        }
      });
    }
  }

  isSignedIn() {
    return !!this.token;
  }

  setToken(token) {
    this.token = token;

    sessionStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;

    sessionStorage.removeItem('token');
  }

  setUser(user) {
    this.user = user;

    sessionStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    this.user = null;

    sessionStorage.removeItem('user');
  }

  createAccount({ email, password }) {
    return axios.post('http://localhost:3000/create_account', { email, password })
      .then(res => res.data)
      .then(({ user, token }) => {
        this.setUser(user);
        this.setToken(token);
      });
  }

  signIn({ email, password }) {
    return axios.post('http://localhost:3000/signin', { email, password })
      .then(res => res.data)
      .then(({ user, token }) => {
        this.setUser(user);
        this.setToken(token);
      });
  }

  signOut() {
    this.removeToken();
    this.removeUser();
  }

  isTokenValid() {
    return axios.get('http://localhost:3000/api/user', {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }
}

export const client = new Client();
