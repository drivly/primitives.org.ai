import { WorkflowConfig } from 'payload'
import { generateObject } from 'ai'
import { Things } from '@/collections/Things'
import { model } from '@/lib/ai'

export const generateThing: WorkflowConfig<'generateThing'> = {
  slug: 'generateThing',
  inputSchema: Things.fields,
  handler: async ({ job, tasks, req }) => {
    const { payload } = req
    const settings = await payload.findGlobal({ slug: 'settings' })
    
    const results = await generateObject({
      model: model(settings.model || 'google/gemini-2.5-pro-preview', { structuredOutputs: true}),
      prompt: '',
      output: 'no-schema',
      // mode: 'auto',
      // schema: z.object({
      //   id: z.string(),
      //   type: z.string(),
      //   data: z.string(),
      // }),
    })
  
    const generation = await payload.create({ collection: 'generations', data: {
      request: results.request.body,
      response: results.response,
      metadata: results.usage,
    } })
  
    const data = await payload.update({ 
      collection: 'things', 
      id: job.input.id,
      data: {
        generation: generation.id,
        data: results.object,
      },
    })
    console.log(data)
  },
}