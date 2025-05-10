import { TaskConfig } from 'payload'

export const seedFunctions: TaskConfig<'seedFunctions'> = {
  slug: 'seedFunctions',
  inputSchema: [],
  outputSchema: [],
  handler: async ({ req }) => {
    const { payload } = req


    payload.db.upsert({
      collection: 'functions',
      data: { name: 'generateMarkdown', output: 'Markdown' },
      where: { name: { equals: 'generateMarkdown' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { name: 'generateList', output: 'ObjectArray' },
      where: { name: { equals: 'generateList' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { name: 'generateObject', output: 'Object' },
      where: { name: { equals: 'generateObject' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { name: 'generateText', output: 'Text' },
      where: { name: { equals: 'generateText' } },
    })
    payload.db.upsert({
      collection: 'functions',
      data: { name: 'generateCode', output: 'Code' },
      where: { name: { equals: 'generateCode' } },
    })

    return {
      output: {},
      state: 'succeeded'
    }
  },  
}