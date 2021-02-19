import fs from 'fs'
import path from 'path'

const controllers = []

fs.readdirSync(path.resolve(
  __dirname, '..', 'app', 'controllers'
)).forEach(file => {
  const controller = require(path.join(__dirname, '..', 'app', 'controllers', file))
  controllers.push(controller.default)
})

export default controllers
