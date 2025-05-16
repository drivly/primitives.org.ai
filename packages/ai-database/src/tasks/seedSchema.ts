import { TaskConfig } from 'payload'
import camelCaseKeys from 'camelcase-keys'

export const seedSchema: TaskConfig<'seedSchema'> = {
  slug: 'seedSchema',
  inputSchema: [],
  outputSchema: [],
  handler: async ({ req }) => {
    const { payload } = req

    const data = await fetch(
      'https://schema.org/version/latest/schemaorg-current-https.jsonld',
    ).then((res) => res.json())

    // await payload.db.upsert({
    //   collection: 'databases',
    //   data: { id: 'schema.org' },
    //   where: { id: { equals: 'schema.org' } },
    // })

    for (const schema of data['@graph']) {
      if (typeof schema['@type'] !== 'string') {
        if (Array.isArray(schema['@type'])) {
          schema['@type'].sort()
          schema['@type'] = schema['@type'][0]
        }
        // continue
      }
      const type = schema['@type'].replace('rdfs:', '').replace('rdf:', '').replace('schema:', '')
      const id =
        typeof schema['rdfs:label'] === 'string'
          ? schema['rdfs:label']
          : schema['rdfs:label']['@value']
      try {
        if (type === 'Class') {
          const description = schema['rdfs:comment']
            ? typeof schema['rdfs:comment'] === 'string'
              ? schema['rdfs:comment']
              : schema['rdfs:comment']['@value']
            : null

          if (id.endsWith('Action')) {
            await payload.db.upsert({
              collection: 'actions',
              data: {
                id: id.replace('Action', ''),
                data: description ? JSON.stringify({ description }) : undefined,
              },
              where: { id: { equals: id.replace('Action', '') } },
            })
          } else {
            await payload.db.upsert({
              collection: 'types',
              data: {
                id,
                data: description ? JSON.stringify({ description }) : undefined,
              },
              where: { id: { equals: id } },
            })
          }
        } else if (type === 'Property') {
          const description = schema['rdfs:comment']
            ? typeof schema['rdfs:comment'] === 'string'
              ? schema['rdfs:comment']
              : schema['rdfs:comment']['@value']
            : null

          let domainIncludes = null
          if (schema['schema:domainIncludes']) {
            if (
              typeof schema['schema:domainIncludes'] === 'object' &&
              schema['schema:domainIncludes']['@id']
            ) {
              domainIncludes = schema['schema:domainIncludes']['@id'].replace('schema:', '')
            }
          }

          await payload.db.upsert({
            collection: 'properties',
            data: {
              id,
              domainIncludes,
              data: description ? JSON.stringify({ description }) : undefined,
            },
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

    for (const schema of data['@graph']) {
      if (typeof schema['@type'] !== 'string') {
        if (Array.isArray(schema['@type'])) {
          schema['@type'].sort()
          schema['@type'] = schema['@type'][0]
        }
      }
      
      const type = schema['@type'].replace('rdfs:', '').replace('rdf:', '').replace('schema:', '')
      
      if (type === 'Class') {
        const id =
          typeof schema['rdfs:label'] === 'string'
            ? schema['rdfs:label']
            : schema['rdfs:label']['@value']
        
        if (!id.endsWith('Action')) {
          const subClassOf = schema['rdfs:subClassOf']
            ? typeof schema['rdfs:subClassOf'] === 'string'
              ? schema['rdfs:subClassOf'].replace('schema:', '')
              : schema['rdfs:subClassOf']['@id']
                ? schema['rdfs:subClassOf']['@id'].replace('schema:', '')
                : null
            : null
          
          if (subClassOf) {
            try {
              await payload.db.upsert({
                collection: 'types',
                data: {
                  id,
                  subClassOf,
                },
                where: { id: { equals: id } },
              })
            } catch (error) {
              console.error(`Failed to update subClassOf for ${id}:`, error)
            }
          }
        }
      }
    }
    
    // now add enums
    for (const schema of data['@graph']) {
      if (['rdfs:Class', 'rdf:Property'].includes(schema['@type'])) continue
      const type = schema['@type'].replace('rdfs:', '').replace('rdf:', '').replace('schema:', '')
      const id =
        typeof schema['rdfs:label'] === 'string'
          ? schema['rdfs:label']
          : schema['rdfs:label']['@value']
      try {
        const description = schema['rdfs:comment']
          ? typeof schema['rdfs:comment'] === 'string'
            ? schema['rdfs:comment']
            : schema['rdfs:comment']['@value']
          : null

        await payload.db.upsert({
          collection: 'enums',
          data: {
            id,
            type,
            data: description ? JSON.stringify({ description }) : undefined,
          },
          where: { id: { equals: id } },
        })
      } catch (error) {
        console.error(error, schema)
      }
    }

    return {
      output: {},
      state: 'succeeded',
    }
  },
}
