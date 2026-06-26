import { Schema, model } from 'mongoose'

const ActivitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, default: 0 },
  caloriesBurned: { type: Number, required: true },
  activityDate: { type: Date, default: Date.now },
  notes: { type: String, default: '' }
})

export const Activity = model('Activity', ActivitySchema)
