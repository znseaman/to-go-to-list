import express from 'express';
import config from './config';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
import sequelize from './utils/db';
import { protect, createAccount, signIn, sendToken } from './utils/auth';
import Place from './resources/place/place.model';
import User from './resources/user/user.model';
import placeRouter from './resources/place/place.router';
import userRouter from './resources/user/user.router';

export const app = express();
const { REACT_APP_BASE_URL: baseURL } = process.env;


app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post(`/create_account`, createAccount, sendToken);
app.post(`/signin`, signIn, sendToken);
app.use(`/api/user`, protect, userRouter);
app.use(`/api/place`, protect, placeRouter);

if (process.env.NODE_ENV == 'production') {
  const clientBuild = path.join(__dirname, '../../client/build');
  app.use(express.static(clientBuild));

  app.get(`*`, (req, res) =>
    res.sendFile(path.join(__dirname, '../../client/build/index.html'))
  );
}

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});

export const start = async () => {
  try {
    Place.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
    User.hasMany(Place);

    await sequelize.authenticate()
      .then(function (err) {
        console.log('Connection has been established successfully.');
      })
      .catch(function (err) {
        console.log('Unable to connect to the database:', err);
      });

    await sequelize.sync();

    await app.listen(config.port, () => {
      console.log(`Server running on ${config.port}...`);
    });
  } catch (e) {
    console.error(e);
  }
}
