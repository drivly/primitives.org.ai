import { WorkflowConfig } from 'payload'
import { waitUntil } from '@vercel/functions'
import { ai } from 'ai-functions'
import { Things } from '@/collections/Things'
import { model } from '@/lib/ai'
import yaml from 'yaml'

// TODO: finish this implementation properly
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

        const results = await ai`${fn.prompt}\n\n${input.content}`({
          model,
          system: fn.system || undefined,
          temperature,
        })

        const generation = await payload.create({ collection: 'generations', data: {
          request: { prompt: `${fn.prompt}\n\n${input.content}` },
          response: { text: results },
          metadata: { model },
        } })
      
        const data = await payload.update({ 
          collection: 'things', 
          id: job.input.id,
          data: {
            generation: generation.id,
            data: results,
            content: results,
          },
        })
        
      } else if (fn.output === 'Object' || fn.output === 'ObjectArray') {
        const resultText = await ai`${fn.prompt}\n\n${input.content}
        Return a valid JSON object.`({
          model,
          system: fn.system ? `${fn.system}\nRespond with valid JSON that matches the requested structure.` : 'Respond with valid JSON that matches the requested structure.',
          temperature,
        })
        
        let resultObject;
        try {
          let jsonText = resultText.trim();
          const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
          if (codeBlockMatch && codeBlockMatch[1]) {
            jsonText = codeBlockMatch[1].trim();
          }
          
          resultObject = JSON.parse(jsonText);
        } catch (error) {
          console.error('Failed to parse JSON response:', error);
          resultObject = { error: 'Failed to parse response as JSON', text: resultText };
        }

        const generation = await payload.create({ collection: 'generations', data: {
          request: { prompt: `${fn.prompt}\n\n${input.content}` },
          response: { text: resultText },
          metadata: { model, parsedObject: resultObject },
        } })
      
        const data = await payload.update({ 
          collection: 'things', 
          id: job.input.id,
          data: {
            generation: generation.id,
            data: resultObject,
            // content: resultObject,
          },
        })
        
      }

    }
    

    const latency = Date.now() - start

    console.log(noun, typeOf, generate, `Latency: ${latency}ms`)


    
  },
}
