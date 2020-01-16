import Sequelize from 'sequelize';

import sequelize from '../../utils/db';
import secrets from './user.secrets';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  delete values.createdAt;
  delete values.updatedAt;
  return values;
}

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