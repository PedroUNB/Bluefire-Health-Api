import { Document } from 'mongoose'

export default interface IUser extends Document {
  fullName: string,
  email: string
  password: string,
  createdAt: Date
  updatedAt: Date

  isValidPassword(password: string): boolean
}
