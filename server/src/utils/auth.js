import User from '../resources/user/user.model';

export const createAccount = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Requires email and password' });
  }

  // user already exists
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).send({ message: 'User already exists with that email' })
  }

  try {
    const user = await User.create({ email, password });
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'requires email and password' });
  }

  // user does not exist
  const user = await User.findOne({ where: { email } });
  req.user = user;
  if (!user) {
    return res.status(400).send({ message: 'user must be real' })
  }

  // check password
  try {
    await user.checkPassword(password);
  } catch (e) {
    console.error(e);
    return res.status(400).send({ message: 'not auth' })
  }

  next();
}

export const protect = async (req, res, next) => {
  let token = User.getTokenFromRequest(req);
  if (!token) {
    return res.status(401).end();
  }

  try {
    const payload = await User.verifyToken(token);
    // eslint-disable-next-line require-atomic-updates
    req.user = await User.findByPk(payload.id);
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).end();
  }
}

export const sendToken = async (req, res) => {
  const { user } = req;
  const token = user.newToken(user);
  const payload = await User.verifyToken(token);
  return res.status(201).send({ token, expiresIn: payload.exp });
}