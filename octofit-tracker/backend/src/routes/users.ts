import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ users: [] })
})

router.get('/:id', (req, res) => {
  res.json({ userId: req.params.id })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created' })
})

export default router
