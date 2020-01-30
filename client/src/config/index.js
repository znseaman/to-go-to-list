import dev from './dev';
import prod from './prod';
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  CLIENT_URL: '',
  SERVER_URL: '',
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = dev.config;
    break
  case 'prod':
  case 'production':
    envConfig = prod.config;
    break
  default:
    envConfig = dev.config;
}

export default { ...baseConfig, ...envConfig }
