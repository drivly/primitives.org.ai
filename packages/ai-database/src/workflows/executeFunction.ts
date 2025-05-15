import { WorkflowConfig } from 'payload'
import { waitUntil } from '@vercel/functions'
import { ai } from 'ai-functions'
import { Events } from '@/collections/Events'
import { model as llm } from '@/lib/ai'
import yaml from 'yaml'
import { generateText } from 'ai'

// TODO: finish this implementation properly
export const executeFunction: WorkflowConfig<'executeFunction'> = {
  slug: 'executeFunction',
  inputSchema: Events.fields,
  handler: async ({ job, tasks, req }) => {
    const { payload } = req
    const { input } = job

    const start = Date.now()
    const { docs: [fn] } = await payload.find({ collection: 'functions', where: { id: { equals: input.execution } }, depth: 2 })
    // const function = await payload.find({ collection: 'functions', where: { id: { equals: noun.generate } } })

    if (fn && typeof(fn) === 'object') {
      const model = (fn.model && typeof(fn.model) === 'object') ? (fn.model.data as any)?.slug : 'google/gemini-2.5-pro-preview' 
      const { system, prompt } = fn
      const settings = yaml.parse(fn.settings || '') || {}
      const { temperature } = settings

      if (fn.output === 'Text' || fn.output === 'TextArray' || fn.output === 'Code') {

        // const results = await ai`${fn.prompt}\n\n${input.data}`({
        //   model,
        //   system: fn.system || undefined,
        //   temperature,
        // })

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
              generation: generation.id,
              data: { text: results.text, citations: (results.response.body as any)?.citations }
            },
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
      
        // const data = await payload.update({ 
        //   collection: 'things', 
        //   id: job.input.id,
        //   data: {
        //     generation: generation.id,
        //     data: resultObject,
        //     // content: resultObject,
        //   },
        // })
        
      }

    }
    

    const latency = Date.now() - start

    console.log(`Latency: ${latency}ms`)

    
  },
}
