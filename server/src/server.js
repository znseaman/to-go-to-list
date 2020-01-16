import express from 'express';
import config from './config';
import cors from 'cors';
import morgan from 'morgan';
import sequelize from './utils/db'
import { protect, createAccount, signIn } from './utils/auth';
import Place from './resources/place/place.model';
import User from './resources/user/user.model';
import secrets from './resources/user/user.secrets';
import placeRouter from './resources/place/place.router';
import userRouter from './resources/user/user.router';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/create_account', createAccount);
app.post('/signin', signIn);
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/place', placeRouter);


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

    // await sequelize.sync();
    // await sequelize.sync({ force: true });
    // let user = await User.findByPk(1);
    // console.log("user", user);
    // if (!user) {
    //   user = await User.create(secrets).then(u => {
    //     console.log(u)
    //   }).catch(error => console.error(error))
    // }

    await app.listen(config.port, () => {
      console.log(`Server running on ${config.port}...`);
    });
  } catch (e) {
    console.error(e);
  }
}