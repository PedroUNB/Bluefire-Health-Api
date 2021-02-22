import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import IUser from '@interfaces/IUser.interface'

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

UserSchema.pre('save', async function (this: IUser, next) {
  const hash = bcrypt.hashSync(this.password, 10)
  this.password = hash
  this.email = this.email.toLowerCase()
  next()
})

UserSchema.methods.isValidPassword = function (this: IUser, password) {
  const user = this
  const isMatch = bcrypt.compareSync(password, user.password)
  return isMatch
}

export default mongoose.model<IUser>('User', UserSchema)
