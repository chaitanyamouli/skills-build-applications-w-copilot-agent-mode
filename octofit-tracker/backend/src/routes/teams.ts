import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ teams: [] })
})

router.get('/:id', (req, res) => {
  res.json({ teamId: req.params.id })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Team created' })
})

export default router
