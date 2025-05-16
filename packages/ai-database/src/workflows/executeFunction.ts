import { WorkflowConfig } from 'payload'
import { waitUntil } from '@vercel/functions'
import { ai } from 'ai-functions'
import { Events } from '@/collections/Events'
import { model as llm } from '@/lib/ai'
import yaml from 'yaml'
import { generateText } from 'ai'

export const executeFunction: WorkflowConfig<'executeFunction'> = {
  slug: 'executeFunction',
  inputSchema: Events.fields,
  handler: async ({ job, tasks, req }) => {
    const { payload } = req
    const { input } = job

    if ((input as any).id) {
      await payload.update({ 
        collection: 'events', 
        id: (input as any).id,
        data: { status: 'Processing' },
      })
    }

    const start = Date.now()
    
    try {
      const { docs: [fn] } = await payload.find({ collection: 'functions', where: { id: { equals: input.execution } }, depth: 2 })

      if (fn && typeof(fn) === 'object') {
        const model = (fn.model && typeof(fn.model) === 'object') ? (fn.model.data as any)?.slug : 'google/gemini-2.5-pro-preview' 
        const { system, prompt } = fn
        const settings = yaml.parse(fn.settings || '') || {}
        const { temperature } = settings

        if (fn.output === 'Text' || fn.output === 'TextArray' || fn.output === 'Code') {
          const prompt = fn.prompt?.replace('{data}', typeof(input.input) === 'string' ? input.input : yaml.stringify(input.input))

          const results = await generateText({
            model: llm(model),
            prompt,
            system: fn.system || undefined,
            temperature,
          })

          const generation = await payload.create({ collection: 'generations', data: {
            request: { prompt, system: fn.system || undefined, temperature },
            response: { ...results },
            metadata: { model },
          } })
        
          if ((input as any).id && generation.id){
            await payload.update({ 
              collection: 'events', 
              id: (input as any).id,
              data: {
                status: 'Success',
                generation: generation.id,
                data: { text: results.text, citations: (results.response.body as any)?.citations }
              },
            })
            
            await payload.create({
              collection: 'things',
              data: {
                id: `${(input as any).id}-thing`,
                type: input.noun as any,
                generation: generation.id,
                data: { text: results.text },
              }
            })
          }
          
        } else if (fn.output === 'Object' || fn.output === 'ObjectArray') {
          const resultText = await generateText({
            model: llm(model),
            prompt: fn.prompt?.replace('{data}', typeof(input.input) === 'string' ? input.input : yaml.stringify(input.input)),
            system: fn.system ? `${fn.system}\nRespond with valid JSON that matches the requested structure.` : 'Respond with valid JSON that matches the requested structure.',
            temperature,
          })
          
          let resultObject;
          try {
            let jsonText = resultText.text.trim();
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
            request: { prompt, system: fn.system || undefined, temperature },
            response: { text: resultText },
            metadata: { model, parsedObject: resultObject },
          } })
        
          if ((input as any).id && generation.id) {
            await payload.update({ 
              collection: 'events', 
              id: (input as any).id,
              data: {
                status: 'Success',
                generation: generation.id,
                data: resultObject
              },
            })
            
            await payload.create({
              collection: 'things',
              data: {
                id: `${(input as any).id}-thing`,
                type: input.noun as any,
                generation: generation.id,
                data: resultObject,
              }
            })
          }
        }
      }
      
      const latency = Date.now() - start
      console.log(`Latency: ${latency}ms`)
      
    } catch (error) {
      console.error('Function execution error:', error)
      
      if ((input as any).id) {
        await payload.update({ 
          collection: 'events', 
          id: (input as any).id,
          data: {
            status: 'Error',
            data: { error: (error as Error).message || 'Unknown error' }
          },
        })
      }
      
      const latency = Date.now() - start
      console.log(`Error Latency: ${latency}ms`)
    }
  },
}
