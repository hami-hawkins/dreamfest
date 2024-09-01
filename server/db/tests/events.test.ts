import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import { connection } from '..'
import server from '../../server'
import request from 'supertest'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

//test event id
describe('get event by Id', () => {
  it('gets an event with a provided id', async () => {
    const res = await request(server).get('/api/v1/events/1')
    expect(res.status).toBe(200)
  })
})

//delete an event
describe('deleting an event', () => {
  it('deletes an event from the schedule', async () => {
    //get the event
    const res = await request(server).get('/api/v1/events/1')
    expect(res.status).toBe(200)
    //delete the event
    const res2 = await request(server).delete('/api/v1/events/1')
    expect(res2.status).toBe(204)
    //check event was deleted
    const res3 = await request(server).get('/api/v1/events/1')
    expect(res3.status).toBe(404)
  })
})
