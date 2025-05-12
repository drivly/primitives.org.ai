import { WorkflowConfig } from 'payload'
import { waitUntil } from '@vercel/functions'
import { generateObject, generateText } from 'ai'
import { Things } from '@/collections/Things'
import { model } from '@/lib/ai'
import yaml from 'yaml'

export const executeFunction: WorkflowConfig<'executeFunction'> = {
  slug: 'executeFunction',
  inputSchema: Things.fields,
  handler: async ({ job, tasks, req }) => {
    const { payload } = req
    const { input } = job

    const start = Date.now()
    const { docs: [noun] } = await payload.find({ collection: 'nouns', where: { id: { equals: input.type } }, depth: 2 })
    // const function = await payload.find({ collection: 'functions', where: { id: { equals: noun.generate } } })
    const { typeOf, generate } = noun

    if (noun.generate && typeof(noun.generate) === 'object') {
      const fn = noun.generate
      const model = (fn.model && typeof(fn.model) === 'object') ? (fn.model.data as any)?.slug : 'google/gemini-2.5-pro-preview' 
      const { system, prompt } = fn
      const settings = yaml.parse(fn.settings || '')
      const { temperature } = settings

      if (fn.output === 'Text' || fn.output === 'TextArray' || fn.output === 'Code') {

        const results = await generateText({
          model,
          system: fn.system || undefined,
          prompt: `${fn.prompt}\n\n${input.content}`,
          temperature,
        })

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
            data: results.text,
            content: results.text,
          },
        })
        
      } else if (fn.output === 'Object' || fn.output === 'ObjectArray') {
        const results = await generateObject({
          model,
          system: fn.system || undefined,
          prompt: `${fn.prompt}\n\n${input.content}`,
          output: 'no-schema',
          temperature,
        })

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
            data: results.object,
            // content: results.object,
          },
        })
        
      }

    }
    

    const latency = Date.now() - start

    console.log(noun, typeOf, generate, `Latency: ${latency}ms`)


    
  },
}