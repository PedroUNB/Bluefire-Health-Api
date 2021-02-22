import { config } from 'dotenv'

config()

export const port = process.env.PORT || 3000
export const enviroment = process.env.ENVIROMENT || null
export const apiUrl = process.env.API_URL || `http://127.0.0.1:${process.env.PORT || 3000}`
export const authSecret = process.env.AUTH_SECRET || 'tVvXHZs9cgauo2ASik7'
