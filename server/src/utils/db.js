import Sequelize from 'sequelize';
import xss from '../utils/xss';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  // silent mode
  logging: false
});

/* Permanent Global Hooks (always run after local hooks) */
sequelize.addHook('beforeCreate', model => {
  // sanitize all inputs
  model = xss(model);
});

sequelize.addHook('beforeUpdate', model => {
  // sanitize all inputs
  model = xss(model);
});

export default sequelize;