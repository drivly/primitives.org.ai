import path from 'path'
import { buildConfig } from 'payload/config'

export default buildConfig({
  admin: {
    user: 'users',
    bundler: {
      configPath: path.resolve(__dirname, './next.config.js'),
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
