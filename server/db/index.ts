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
