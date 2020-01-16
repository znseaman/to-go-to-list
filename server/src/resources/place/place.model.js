import Sequelize from 'sequelize';

import sequelize from '../../utils/db';

const Place = sequelize.define('place', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  photo: Sequelize.STRING,
  hasImage: Sequelize.STRING,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT
});

export default Place;