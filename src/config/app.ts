import cors from 'cors'
import express, { Application } from 'express'
import morgan from 'morgan'
import Controllers from './routes'
import { createServer, Server as httpServer } from 'http'
import { Server, Socket } from 'socket.io'

import mongoose from '@config/mongodb'
class App {
  private express: Application
  public server: httpServer
  private io: Server

  constructor() {
    this.express = express()

    this.middlewares()
    this.mongo()
    this.routes(Controllers)
    this.sockets()
    this.listen()
  }

  private middlewares() {
    this.express.use(express.json())
    this.express.use(cors({ origin: '*' }))
    this.express.use(morgan('[:method] :remote-addr :status ":url" :response-time ms'))
  }

  private sockets(): void {
    this.server = createServer(this.express)
    this.io = require('socket.io')(this.server)
  }

  private mongo() {
    return mongoose
  }

  private routes(Controllers: { forEach: (arg0: (Controller: any) => void) => void; }) {
    Controllers.forEach(Controller => {
      this.express.use('/', new Controller().router)
    })
  }

  private listen(): void {
    this.io.on('connection', (socket: Socket) => {
      socket.on('setup', (userData) => {
        socket.join(userData._id)
        console.log('[Socket] A user connected')
      })

      socket.on('disconnect', () => {
        console.log('[Socket] A user connected')
      })
    })
  }
}

export default new App().server
