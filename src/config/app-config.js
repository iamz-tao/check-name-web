const { development, production } = require('./env')

const env = process.env.APP_ENV || 'development'
const version = 'v0.0.0.0'

const appConfig = {
  development,
  production,
}[env]

appConfig.version = version

module.exports = appConfig
