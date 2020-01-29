const express = require('express')
const next = require('next')
const cors = require('cors')
const chalk = require('chalk')

const routes = require('../src/routes')

const port = parseInt(process.env.PORT, 10) || 3000
const isDev = process.env.NODE_ENV !== 'production'
const app = next({
  dir: './src',
  dev: isDev,
})
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.use(cors())
  server.use(handler)

  server.listen(port, (err) => {
    if (err) throw err
    /* eslint-disable */
    console.log(chalk.blue.bgWhite.bold(`> Ready on http://localhost:${port}`))
  })
})
