import { Schema, model } from 'mongoose'

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  restSeconds: { type: Number, default: 60 }
})

const WorkoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: { type: [ExerciseSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
})

export const Workout = model('Workout', WorkoutSchema)
