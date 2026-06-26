import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ activities: [] })
})

router.get('/:id', (req, res) => {
  res.json({ activityId: req.params.id })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Activity logged' })
})

export default router
