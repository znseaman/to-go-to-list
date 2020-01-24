import Sequelize from 'sequelize';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  // silent mode
  logging: false
});

export default sequelize;