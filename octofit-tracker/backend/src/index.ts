import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { connectToDatabase } from './database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

dotenv.config()

const app = express()
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'
const PORT = Number(process.env.PORT) || 8000

const CODESPACE_NAME = process.env.CODESPACE_NAME
// Use Codespaces preview domain when running in Codespaces; otherwise fallback to localhost
const API_URL = process.env.API_URL || (CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.app.github.dev` : `http://localhost:${PORT}`)
app.locals.apiUrl = API_URL

connectToDatabase().then(() => {
  console.log('Connected to MongoDB')
}).catch(err => {
  console.error('MongoDB connection error:', err)
})

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API', apiUrl: API_URL })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`API URL: ${API_URL}`)
})
