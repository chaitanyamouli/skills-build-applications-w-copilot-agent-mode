/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from '../models/User'
import { Team } from '../models/Team'
import { Activity } from '../models/Activity'
import { Workout } from '../models/Workout'
import { Leaderboard } from '../models/Leaderboard'

import { disconnectFromDatabase, MONGODB_URI } from '../database'

dotenv.config()

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB for seeding')

  await mongoose.connection.db.dropDatabase()
  console.log('Dropped existing octofit_db database')

  const users = await User.create([
    { name: 'Maya Patel', email: 'maya.patel@example.com', role: 'coach' },
    { name: 'Jordan Lee', email: 'jordan.lee@example.com', role: 'member' },
    { name: 'Ava Morgan', email: 'ava.morgan@example.com', role: 'member' },
    { name: 'Noah Kim', email: 'noah.kim@example.com', role: 'member' }
  ])

  const [maya, jordan, ava, noah] = users

  const [peakPerformers, auroraRunners] = await Team.create([
    {
      name: 'Peak Performers',
      description: 'Strength and recovery crew for busy professionals',
      members: [maya._id, noah._id]
    },
    {
      name: 'Aurora Runners',
      description: 'Early morning cardio team with a focus on pace and consistency',
      members: [jordan._id, ava._id]
    }
  ])

  await User.updateMany(
    { _id: { $in: [maya._id, noah._id] } },
    { team: peakPerformers._id }
  )

  await User.updateMany(
    { _id: { $in: [jordan._id, ava._id] } },
    { team: auroraRunners._id }
  )

  await Activity.create([
    {
      user: jordan._id,
      type: 'Running',
      durationMinutes: 35,
      distanceKm: 5.2,
      caloriesBurned: 330,
      activityDate: new Date('2026-06-20T07:30:00Z'),
      notes: 'Morning tempo run on the river trail.'
    },
    {
      user: ava._id,
      type: 'Yoga',
      durationMinutes: 45,
      caloriesBurned: 190,
      activityDate: new Date('2026-06-21T06:45:00Z'),
      notes: 'Vinyasa flow session for flexibility and recovery.'
    },
    {
      user: noah._id,
      type: 'Cycling',
      durationMinutes: 60,
      distanceKm: 22,
      caloriesBurned: 560,
      activityDate: new Date('2026-06-22T08:15:00Z'),
      notes: 'Road ride with hill intervals.'
    },
    {
      user: maya._id,
      type: 'Strength Training',
      durationMinutes: 50,
      caloriesBurned: 420,
      activityDate: new Date('2026-06-23T18:00:00Z'),
      notes: 'Circuit session with kettlebell and bodyweight work.'
    }
  ])

  await Workout.create([
    {
      title: 'Full Body Circuit',
      description: 'A balanced workout targeting strength, core, and endurance.',
      difficulty: 'Intermediate',
      durationMinutes: 45,
      exercises: [
        { name: 'Goblet Squat', sets: 4, reps: '12', restSeconds: 60 },
        { name: 'Push-Up', sets: 4, reps: '10-12', restSeconds: 45 },
        { name: 'Plank', sets: 3, reps: '60 sec', restSeconds: 45 }
      ]
    },
    {
      title: 'Sunrise Run',
      description: 'Easy-paced run with a warmup and cooldown.',
      difficulty: 'Beginner',
      durationMinutes: 30,
      exercises: [
        { name: 'Warmup jog', sets: 1, reps: '10 min', restSeconds: 0 },
        { name: 'Steady run', sets: 1, reps: '15 min', restSeconds: 0 },
        { name: 'Cooldown walk', sets: 1, reps: '5 min', restSeconds: 0 }
      ]
    },
    {
      title: 'Strength Builder',
      description: 'Focus on lower body and posterior chain strength.',
      difficulty: 'Advanced',
      durationMinutes: 60,
      exercises: [
        { name: 'Deadlift', sets: 5, reps: '5', restSeconds: 120 },
        { name: 'Walking Lunge', sets: 4, reps: '12 each leg', restSeconds: 90 },
        { name: 'Hamstring Curl', sets: 4, reps: '15', restSeconds: 60 }
      ]
    }
  ])

  await Leaderboard.create([
    { entryType: 'user', name: 'Jordan Lee', points: 820, rank: 1 },
    { entryType: 'user', name: 'Ava Morgan', points: 760, rank: 2 },
    { entryType: 'team', name: 'Peak Performers', points: 1480, rank: 1 },
    { entryType: 'team', name: 'Aurora Runners', points: 1380, rank: 2 }
  ])

  console.log('Seeded users, teams, activities, workouts, and leaderboard data')
  console.log('Seeded octofit_db database with test data')

  await disconnectFromDatabase()
}

seed().catch((error) => {
  console.error('Seed error:', error)
  process.exit(1)
})
