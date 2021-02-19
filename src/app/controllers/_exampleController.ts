import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '@interfaces/IControllerBase.interface'

class NameOfController implements IControllerBase {
  public path = '/path'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get(this.path, this.index)
    this.router.post(this.path, this.save)

    this.router.get(this.path + '/:id', this.getById)
    this.router.put(this.path + '/:id', this.update)
    this.router.delete(this.path + '/:id', this.delete)
  }

  index = async (req: Request, res: Response) => {
    return res.status(200).send()
  }

  save = async (req: Request, res: Response) => {
    return res.status(200).send()
  }

  getById = async (req: Request, res: Response) => {
    return res.status(200).send()
  }

  update = async (req: Request, res: Response) => {
    return res.status(200).send()
  }

  delete = async (req: Request, res: Response) => {
    return res.status(200).send()
  }
}

export default NameOfController
