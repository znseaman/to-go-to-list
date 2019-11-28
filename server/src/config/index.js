import { mergeRight } from 'ramda'
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env == 'development',
  isText: env === 'testing',
  port: 3000,
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config
    break;
  case 'test':
  case 'texting':
    envConfig = require('./testing').config
    break;
  default:
    envConfig = require('./dev').config
}

export default mergeRight(baseConfig, envConfig)
