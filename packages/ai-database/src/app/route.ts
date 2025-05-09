import config from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const start = Date.now()
  const { headers } = request
  const { origin } = new URL(request.url)

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  const { docs: data, ...meta } = await payload.find({ collection: 'nouns' })

  const nouns: Record<string, string> = {}
  data.forEach((noun) => {
    nouns[noun.id] = origin + '/' + noun.id
  })

  const latency = Date.now() - start

  const response = {
    $context: origin,
    links: {
      home: origin,
      admin: origin + '/admin',
      first: origin + '/',
    },
    latency,
    nouns,
    // meta,
    'schema.org': {
      things: origin + '/things',
      properties: origin + '/properties',
      actions: origin + '/actions',
    },
    user,
  }

  return Response.json(response)
}
