import config from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({ config })
  const { headers } = request
  const user = await payload.auth({ headers })
  const { origin } = new URL(request.url)
  const start = Date.now()

  const data = await payload.find({
    collection: 'nouns',
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
    data,
    user,
  }

  return Response.json(response)
}
