import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '@interfaces/IControllerBase.interface'
import moment from 'moment'

moment.locale('pt-br')

class ExtraController implements IControllerBase {
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', this.homeAPI)
  }

  homeAPI = async (req: Request, res: Response) => {
    return res.status(200).json(
      {
        message: 'Olá, seja bem vindo a API Bluefire Health!',
        description: 'API Restful feita em typescript para suprir as ' +
        'plataformas web e mobile da Bluefire Health Company.',
        timestamps: moment().format('LLLL')
      }
    )
  }
}

export default ExtraController
