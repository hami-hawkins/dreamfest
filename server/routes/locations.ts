import express from 'express'
import { getAllLocations, getLocationById } from '../db/index.ts'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /api/v1/locations
router.get('/', async (req, res, next) => {
  try {
    const locations = await getAllLocations()
    res.json({ locations })
  } catch (e) {
    next(e)
  }
})

// GET /api/v1/locations/:id
router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const location = await getLocationById(id)
    res.json(location)
  } catch (e) {
    next(e)
  }
})

// PATCH /api/v1/locations/:id
router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { name, description } = req.body
    await db.updateLocation({ id, name, description })
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

export default router
