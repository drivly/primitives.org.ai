import { WorkflowConfig } from 'payload'
import { generateObject, generateText } from 'ai'
import matter from 'gray-matter'
import { Things } from '@/collections/Things'
import { model } from '@/lib/ai'

export const generateThing: WorkflowConfig<'generateThing'> = {
  slug: 'generateThing',
  inputSchema: Things.fields,
  handler: async ({ job, tasks, req }) => {
    const { payload } = req
    const settings = await payload.findGlobal({ slug: 'settings' })
    
    const type = job.input.type?.relationTo === 'types' ? `@type: ${job.input.type?.value}` : job.input.type?.value || 'JSON Object'

    const results = job.input.format === 'Object' ? 
      await generateObject({
        model: model(settings.model || 'google/gemini-2.5-pro-preview', { structuredOutputs: true}),
        prompt: `Generate a ${type} with an @id of ${job.input.id} with the appropriate properties and relationships (including content in markdown format if applicable)`,
        output: 'no-schema',
        // mode: 'auto',
        // schema: z.object({
      //   id: z.string(),
      //   type: z.string(),
      //   data: z.string(),
      // }),
    }).then((results) => ({
      data: matter.stringify('', { data: results.object }),
      content: matter.stringify('', { data: { $id: job.input.id, $type: job.input.type?.value, ...results.object as any } }),
      request: results.request,
      response: results.response,
      usage: results.usage,
    })) : 
      await generateText({
        model: model(settings.model || 'google/gemini-2.5-pro-preview', { structuredOutputs: true}),
        prompt: `Generate a ${type} with an @id of ${job.input.id}`,
        // mode: 'auto',
        // schema: z.object({
      //   id: z.string(),
      //   type: z.string(),
      //   data: z.string(),
      // }),
    }).then((results) => ({
      data: undefined,
      content: matter.stringify(results.text, { data: { $id: job.input.id, $type: job.input.type?.value } }),
      request: results.request,
      response: results.response,
      usage: results.usage,
    }))
  
    const generation = await payload.create({ collection: 'generations', data: {
      request: JSON.parse(results.request.body || '{}'),
      response: results.response,
      metadata: results.usage,
    } })
  
    const data = await payload.update({ 
      collection: 'things', 
      id: job.input.id,
      data: {
        generation: generation.id,
        data: results.data,
        content: results.content,
      },
    })
    console.log(data)
  },
}