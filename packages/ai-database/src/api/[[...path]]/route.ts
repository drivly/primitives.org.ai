import { NextRequest } from 'next/server'
import { API } from '../../lib/api'

/**
 * GET handler for retrieving resources
 * Supports both collection listing and single item retrieval
 */
export const GET = API(async (request: NextRequest, { db, params }) => {
  const path = request.url.split('/').filter(Boolean)
  const [_, type, id] = path // [api, type, id]

  if (id) {
    if (!db[type]) {
      return { errors: [{ message: `Collection '${type}' not found` }] }
    }
    return db[type].get(id)
  }

  if (!db[type]) {
    return { errors: [{ message: `Collection '${type}' not found` }] }
  }

  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '10', 10)
  const page = parseInt(url.searchParams.get('page') || '1', 10)

  const query: Record<string, any> = {}

  url.searchParams.forEach((value, key) => {
    if (!['limit', 'page'].includes(key)) {
      query[key] = value
    }
  })

  const results = await db[type].find({
    where: query,
    limit,
    page,
  })

  return results
})

/**
 * POST handler for creating new resources
 */
export const POST = API(async (request: NextRequest, { db }) => {
  const path = request.url.split('/').filter(Boolean)
  const [_, type] = path // [api, type]

  if (!db[type]) {
    return { errors: [{ message: `Collection '${type}' not found` }] }
  }

  const body = await request.json()
  return db[type].create(body)
})

/**
 * PATCH handler for updating existing resources
 */
export const PATCH = API(async (request: NextRequest, { db }) => {
  const path = request.url.split('/').filter(Boolean)
  const [_, type, id] = path // [api, type, id]

  if (!id) {
    return { errors: [{ message: 'ID is required for update operations' }] }
  }

  if (!db[type]) {
    return { errors: [{ message: `Collection '${type}' not found` }] }
  }

  const body = await request.json()
  return db[type].update(id, body)
})

/**
 * DELETE handler for removing resources
 */
export const DELETE = API(async (request: NextRequest, { db }) => {
  const path = request.url.split('/').filter(Boolean)
  const [_, type, id] = path // [api, type, id]

  if (!id) {
    return { errors: [{ message: 'ID is required for delete operations' }] }
  }

  if (!db[type]) {
    return { errors: [{ message: `Collection '${type}' not found` }] }
  }

  return db[type].delete(id)
})
