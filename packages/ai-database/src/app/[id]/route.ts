import config from '@payload-config'
import { waitUntil } from '@vercel/functions'
import { getPayload } from 'payload'

export const maxDuration = 800

export async function GET(request: Request) {
  const start = Date.now()
  const { headers } = request
  const { origin, searchParams, pathname } = new URL(request.url)
  
  const id = pathname.split('/').pop() || ''
  
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  
  try {
    const item = await payload.findByID({ collection: 'nouns', id })
    
    return Response.json({
      ...item,
      $context: origin,
      links: {
        home: origin,
        admin: origin + '/admin',
      }
    })
  } catch (error) {
    const queryContext = Object.fromEntries(searchParams.entries())
    
    const job = await payload.jobs.queue({ 
      workflow: 'generateNoun', 
      input: {
        id,
        queryContext
      }
    })
    
    return Response.json({
      id,
      status: 'generating',
      jobId: job.id,
      message: 'Resource is being generated. Please check back soon.',
      queryContext,
      $context: origin,
      links: {
        home: origin,
        admin: origin + '/admin',
        job: `${origin}/admin/collections/payload-jobs/${job.id}`,
      }
    }, { status: 202 }) // 202 Accepted indicates the request has been accepted for processing
  }
}
