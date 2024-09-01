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

describe('get event by Id', () => {
  it('gets an event with a provided id', async () => {
    const res = await request(server).get('/api/v1/events/1')
    expect(res.status).toBe(200)
  })
})
