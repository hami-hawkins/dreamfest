import express from 'express'
import { getEventsByDay } from '../db/index.ts'
import { validateDay } from './helpers.ts'

const router = express.Router()

// GET api/v1/schedule/friday
router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    const events = await getEventsByDay(day)
    res.json({ day, events })
  } catch (e) {
    next(e)
  }
})

export default router
