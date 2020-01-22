import Sequelize from 'sequelize';
import sequelize from '../../utils/db';
import secrets from './user.secrets';
import bcrypt from 'bcrypt';
import { newToken, verifyToken, getTokenFromRequest } from '../../utils/token';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  hooks: {
    beforeCreate: async (user, options) => {
      // eslint-disable-next-line require-atomic-updates
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
});

/* Instance Methods */
User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  // delete values.createdAt;
  // delete values.updatedAt;
  return values;
}

User.prototype.checkPassword = async function (password) {
  return new Promise(async (resolve, reject) => {
    const match = await bcrypt.compare(password, this.password).catch(reject);
    if (!match) {
      reject('not auth');
    }
    resolve();
  });
}

User.prototype.newToken = newToken;

/* Static Methods */
User.verifyToken = verifyToken;
User.getTokenFromRequest = getTokenFromRequest;

// User.sync({ force: true }).then(async () => {
//   console.log('In User.sync ....')
//   // Table created
//   return await User.create({
//     email: 'znseaman@gmail.com',
//     password: 'password'
//   });
//   // User.create(secrets).then(user => {
//   //   console.log(user.get())
//   // })
// });

export default User;