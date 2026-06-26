import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ workouts: [] })
})

router.get('/:id', (req, res) => {
  res.json({ workoutId: req.params.id })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Workout created' })
})

export default router
