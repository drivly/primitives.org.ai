import { TaskConfig } from 'payload'
import camelCaseKeys from 'camelcase-keys'

export const seedSchema: TaskConfig<'seedSchema'> = {
  slug: 'seedSchema',
  inputSchema: [],
  outputSchema: [],
  handler: async ({ req }) => {
    const { payload } = req

    const data = await fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld').then(res => res.json())

    for (const schema of data['@graph']) {
      if (typeof schema['@type'] !== 'string') {
        if (Array.isArray(schema['@type'])) {
          schema['@type'].sort()
          schema['@type'] = schema['@type'][0]
        }
        // continue
      }
      const type = schema['@type'].replace('rdfs:', '').replace('rdf:', '').replace('schema:', '')
      const id = typeof(schema['rdfs:label']) === 'string' ? schema['rdfs:label'] : schema['rdfs:label']['@value']
      try {
        if (type === 'Class') {
          if (id.endsWith('Action')) {
            await payload.db.upsert({
              collection: 'verbs',
              data: { id: id.replace('Action', ''), ns: 'https://schema.org' },
              where: { id: { equals: id.replace('Action', '') } },
            })
          } else {
            await payload.db.upsert({
              collection: 'nouns',
              data: { id, ns: 'https://schema.org' },
              where: { id: { equals: id } },
            })
          }
        } else if (type === 'Property') {
          await payload.db.upsert({
            collection: 'properties',
            data: { id, type },
            where: { id: { equals: id } },
          })
        } else {
          // await payload.db.upsert({
          //   collection: 'enums',
          //   data: { id, type },
          //   where: { id: { equals: id } },
          // })
        }
      } catch (error) {
        console.error(error, schema)
      }
    }

    // now add enums
    for (const schema of data['@graph']) {
      if (['rdfs:Class', 'rdf:Property'].includes(schema['@type'])) continue
      const type = schema['@type'].replace('rdfs:', '').replace('rdf:', '').replace('schema:', '')
      const id = typeof(schema['rdfs:label']) === 'string' ? schema['rdfs:label'] : schema['rdfs:label']['@value']
      try {
        await payload.db.upsert({
          collection: 'enums',
          data: { id, type },
          where: { id: { equals: id } },
        })
      } catch (error) {
        console.error(error, schema)
      }
    }
    
    return {
      output: {},
      state: 'succeeded'
    }
  },
}