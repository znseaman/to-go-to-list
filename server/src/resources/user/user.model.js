import Sequelize from 'sequelize';
import sequelize from '../../utils/db';
import bcrypt from 'bcrypt';
import { newToken, verifyToken, getTokenFromRequest } from '../../utils/token';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      max: 254
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      max: 99
    }
  },
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

export default User;