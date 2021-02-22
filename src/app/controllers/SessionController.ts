import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import IControllerBase from '@interfaces/IControllerBase.interface'
import IUser from '@interfaces/IUser.interface'

import { authSecret } from '@config/enviroments'
import User from '@models/User'

import {
  equalsOrError,
  existsOrError,
  isValidPassword,
  notExistsOrError,
  validateEmail
} from '@config/shared/validations'

class SessionController implements IControllerBase {
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post('/signup', this.signup)
    this.router.post('/login', this.login)
  }

  signup = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body

    try {
      existsOrError(fullName, 'Name was not provided!')
      existsOrError(email, 'E-mail was not provided!')
      existsOrError(password, 'Password was not provided!')
      isValidPassword(password)
      existsOrError(confirmPassword, 'Password confirmation was not provided!')
      equalsOrError(password, confirmPassword, 'Password do not match!')
      equalsOrError(validateEmail(email), true, 'Enter a valid email address!')

      const userFromDB = await User.findOne({
        $or: [{ email }]
      })

      if (userFromDB) {
        notExistsOrError(userFromDB, 'A user with this email already exists!')
      }
    } catch (error) {
      return res.status(400).json({ error })
    }

    const user = await User.create({
      fullName,
      email,
      password
    })

    res.status(201).json({ message: `User: ${user.fullName} created successfully` })

    return res.status(200).send()
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Enter email and password!' })
    }
    const user: IUser = await User.findOne({ email })

    if (!user) return res.status(400).json({ message: 'User not found!' })

    if (!user.isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password!' })
    }

    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + (60 * 60 * 24 * 3) // 3 days

    const payload = {
      _id: user._id,
      full_name: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      iat,
      exp
    }

    const token = jwt.sign(payload, authSecret, { algorithm: 'HS512' })

    return res.status(200).json({ ...payload, token })
  }
}

export default SessionController
