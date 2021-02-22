import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(
  process.env.MONGO_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then(() => {
  console.log('[MONGO] Connected!')
}).catch(e => {
  const msg = 'ERROR! Could not connect with MongoDB!'
  console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
  console.log(e)
})

export default mongoose
