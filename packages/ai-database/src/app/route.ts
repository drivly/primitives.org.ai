import config from '@payload-config'
import { waitUntil } from '@vercel/functions'
import { getPayload } from 'payload'

export const maxDuration = 800

export const GET = async (request: Request) => {
  const start = Date.now()
  const { headers } = request
  const { origin } = new URL(request.url)

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  const [types, things] = await Promise.all([
    payload.find({ collection: 'nouns' }),
    payload.find({ collection: 'things' }),
  ])

  const nouns: Record<string, string> = {}
  types.docs.forEach((type) => {
    nouns[type.id] = origin + '/' + type.id
  })

  if (things.totalDocs === 0) {
    const jobs = await payload.find({ collection: 'payload-jobs' })
    if (jobs.totalDocs === 0) {
      const seedStart = Date.now()
      const job = await payload.jobs.queue({ workflow: 'seed', input: {} })
      console.log(`Seed job queued: ${job.id}`)
    }
  }


  waitUntil(
    payload.jobs.run().then(console.log)
  )

  const latency = Date.now() - start

  const response = {
    $context: origin,
    links: {
      login: user ? undefined : origin + '/admin/login',
      admin: origin + '/admin',
      first: origin + '/',
    },
    actions: {
      'Create Noun': request.url + '/new',
      'Toggle Arrays': request.url + '?arrays',
    },
    latency,
    nouns,
    // meta,
    'schema.org': {
      things: origin + '/things',
      actions: origin + '/actions',
      properties: origin + '/properties',
    },
    user,
  }

  return Response.json(response)
}
