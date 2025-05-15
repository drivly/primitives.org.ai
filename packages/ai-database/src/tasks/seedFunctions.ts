import { TaskConfig } from 'payload'
import dedent from 'dedent'

export const seedFunctions: TaskConfig<'seedFunctions'> = {
  slug: 'seedFunctions',
  inputSchema: [],
  outputSchema: [],
  handler: async ({ req }) => {
    const { payload } = req

    const settings = await payload.findGlobal({ slug: 'settings' })
    const model = settings.defaultModel || 'gemini-2.5-pro-preview'
    // const model = 'gemini-2.5-pro-preview'

    payload.db.upsert({
      collection: 'functions',
      data: { 
        name: 'generateMarkdown', 
        output: 'Text',
        model,
        system: 'Respond only in Markdown format.',
        prompt: dedent`
          Generate markdown for the following data:
          {data}
        `
      },
      where: { name: { equals: 'generateMarkdown' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { 
        name: 'generateList', 
        output: 'TextArray',
        model,
        system: 'Respond only in numbered, Markdown ordered lists.',
        prompt: dedent`
          Generate a list for the following data:
          {data}
        `
      },
      where: { name: { equals: 'generateList' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { 
        name: 'generateObject', 
        output: 'Object',
        model,
        system: 'Respond only in JSON format.',
        prompt: dedent`
          Generate an object for the following data:
          {data}
        `
      },
      where: { name: { equals: 'generateObject' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { 
        name: 'generateObjectArray', 
        output: 'ObjectArray',
        model,
        system: 'Respond only in JSON format.',
        prompt: dedent`
          Generate an object array for the following data:
          {data}
        `
      },
      where: { name: { equals: 'generateObjectArray' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { 
        name: 'generateText', 
        output: 'Text',
        model,
        prompt: dedent`
          Generate text for the following data:
          {data}
        `
      },
      where: { name: { equals: 'generateText' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { 
        name: 'generateCode', 
        output: 'Code',
        model,
        system: 'Respond only with clearly commented TypeScript code as a module, including imports/exports. (single quotes, no semicolons, with trailing commas).',
        prompt: dedent`
          Generate code for the following data:
          {data}
        `
      },
      where: { name: { equals: 'generateCode' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { 
        name: 'generateUI', 
        output: 'Code',
        model,
        system: dedent`
          Respond only with clearly commented TypeScript React Components with TailwindCSS for styling. 
          You can import any ShadCN UI components from '@/components/ui'. The primary component should be exported as default. 
          (single quotes including in JSX, no semicolons, with trailing commas).
        `,
        prompt: dedent`
          Generate a component for the following data:
          {data}
        `
      },
      where: { name: { equals: 'generateUI' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { 
        name: 'research', 
        output: 'Text',
        model: 'perplexity/sonar-deep-research',
        prompt: 'Research {data}'
      },
      where: { name: { equals: 'research' } },
    })

    return {
      output: {},
      state: 'succeeded'
    }
  },  
}