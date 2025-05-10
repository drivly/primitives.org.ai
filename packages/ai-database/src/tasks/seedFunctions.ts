import { TaskConfig } from 'payload'
import dedent from 'dedent'

export const seedFunctions: TaskConfig<'seedFunctions'> = {
  slug: 'seedFunctions',
  inputSchema: [],
  outputSchema: [],
  handler: async ({ req }) => {
    const { payload } = req


    payload.db.upsert({
      collection: 'functions',
      data: { 
        name: 'generateMarkdown', 
        output: 'Text',
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
        name: 'generateComponent', 
        output: 'Code',
        prompt: dedent`
        Generate a component for the following data:
        {data}
        `
      },
      where: { name: { equals: 'generateComponent' } },
    })

    return {
      output: {},
      state: 'succeeded'
    }
  },  
}