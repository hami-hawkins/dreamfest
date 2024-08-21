import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

// DISPLAYING LOCATIONS AND EVENTS
// show all locations
export async function getAllLocations() {
  const locations = await connection<Location>('locations').select('*')
  console.log(locations)
  return locations as Location[]
}

// show events for a day
export async function getEventsByDay(
  day: string,
): Promise<EventWithLocation[]> {
  const events = await connection<Event>('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where({ day })
    .select(
      'events.day as day',
      'events.description as description',
      'events.name as eventName',
      'events.id as id',
      'locations.id as locationId',
      'locations.name as locationName',
      'events.time as time',
    )
  return events
}

//EDITING LOCATIONS
// show the form
export async function getLocationById(id: number): Promise<LocationData> {
  const location = await connection<Location>('locations').where({ id }).first()
  return location as LocationData
}

// submit the form
export async function updateLocation(updatedLocation: {
  id: number
  name: string
  description: string
}) {
  const { id, name, description } = updatedLocation
  const result = await connection<Location>('locations')
    .where({ id })
    .update({ name, description }, ['id'])
  return result
}

//ADDING AND DELETING EVENTS
//add a new event
export async function addNewEvent(event: EventData) {
  const { day, time, name, description, locationId: location_id } = event
  const result = connection<Event>('events').insert(
    {
      day,
      time,
      name,
      description,
      location_id,
    },
    ['id'],
  )
  return result
}

//delete an event
export async function deleteEvent(id: number) {
  const result = await connection<Event>('events').where({ id }).del()
  return result
}
