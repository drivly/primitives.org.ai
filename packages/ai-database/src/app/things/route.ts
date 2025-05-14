import config from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const start = Date.now()
  const { headers } = request
  const { origin } = new URL(request.url)

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  const { docs: data, ...meta } = await payload.find({ collection: 'types' })

  const types: Record<string, string> = {}
  data.forEach((type) => types[type.id] = origin + '/' + type.id)

  const latency = Date.now() - start

  const response = {
    $context: origin,
    links: {
      home: origin,
      admin: origin + '/admin',
      first: origin + '/',
    },
    latency,
    types,
    'schema.org': {
      things: origin + '/things',
      actions: origin + '/actions',
      properties: origin + '/properties',
    },
    meta,
    user,
  }

  return Response.json(response)
}
