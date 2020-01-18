import config from '../config';
import jwt from 'jsonwebtoken';

export const newToken = ({ id }) => {
  return jwt.sign({ id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
}

export const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
}

export const getTokenFromRequest = req => {
  return req.headers && req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
}