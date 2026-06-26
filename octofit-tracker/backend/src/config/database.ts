import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

export async function connectToDatabase() {
  return mongoose.connect(MONGODB_URI)
}

export async function disconnectFromDatabase() {
  return mongoose.disconnect()
}

export default { MONGODB_URI, connectToDatabase, disconnectFromDatabase }
