import { Schema, model } from 'mongoose'

const LeaderboardSchema = new Schema({
  entryType: { type: String, required: true, enum: ['user', 'team'] },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
})

export const Leaderboard = model('Leaderboard', LeaderboardSchema)
