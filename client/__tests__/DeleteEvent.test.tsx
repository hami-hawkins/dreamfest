import { describe, it, expect, beforeAll } from 'vitest'
import { setupApp } from './setup'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
})

describe('Deleting an event', () => {
  it('asks the API to delete event', async () => {
    nock('http://localhost').get('/api/v1/events/1').reply(200, {
      id: 1,
      locationId: 1,
      day: 'friday',
      time: '2pm-3pm',
      name: 'Slushie Apocalypse',
      description:
        'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
    })

    const { user, ...screen } = setupApp('/events/1/edit')
    const deleteButton = await screen.findByLabelText('Delete event')
    expect(deleteButton).toBeVisible()

    const deleteScope = nock('http://localhost')
      .delete('/api/v1/events/1')
      .reply(200)

    await user.click(deleteButton)
    expect(deleteScope.isDone()).toBe(true)
  })
})
