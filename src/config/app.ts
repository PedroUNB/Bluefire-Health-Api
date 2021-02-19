import express, { Application } from 'express'
import Controllers from './routes'
class App {
  public express: Application

  constructor() {
    this.express = express()

    this.routes(Controllers)
  }

  private routes(Controllers: { forEach: (arg0: (Controller: any) => void) => void; }) {
    Controllers.forEach(Controller => {
      this.express.use('/', new Controller().router)
    })
  }
}

export default new App().express
