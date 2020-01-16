import Sequelize from 'sequelize';

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  // silent mode
  logging: false
});

export default sequelize;