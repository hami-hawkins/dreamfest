import express from 'express'
import { getAllLocations } from '../db/index.ts'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /api/v1/locations
router.get('/', async (req, res, next) => {
  try {
    // TODO: Replace this with all of the locations in the database
    const locations = await getAllLocations()

    res.json({ locations })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    // TODO: Get the location based on its id and replace this viewData
    const location = {
      id: id,
      name: 'TangleStage',
      description:
        'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
    }
    res.json(location)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { name, description } = req.body
    // TODO: call db.updateLocation with these details
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

export default router
