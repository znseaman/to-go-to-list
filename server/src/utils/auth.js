import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../resources/user/user.model';
require('dotenv').config();

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

export const createAccount = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'requires email and password' });
  }

  try {
    // @TODO: move this hashing into User.create itself
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashPassword });

    // send back token
    const token = newToken(user);

    return res.status(201).send({ user, token });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
}

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'requires email and password' });
  }

  // user does not exist
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).send({ message: 'user must be real' })
  }

  // check password
  try {
    // TODO: add method to user object itself to verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ message: 'not auth' })
    }
  } catch (e) {
    console.error(e)
    return res.status(401).send({ message: 'not auth' })
  }

  const token = newToken(user);
  return res.status(201).send({ token, user });
}

export const protect = async (req, res, next) => {
  let token = req.headers && req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
  if (!token) {
    return res.status(401).end();
  }

  try {
    const payload = await verifyToken(token);
    const user = await User.findByPk(payload.id);
    req.user = user;
    req.params = { ...req.params, id: user.id };
    next();
  } catch (error) {
    return res.status(401).end();
  }
}