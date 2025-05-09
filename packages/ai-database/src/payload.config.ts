// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Functions } from './collections/Functions'
import { Workflows } from './collections/Workflows'
import { Models } from './collections/Models'
import { Generations } from './collections/Generations'
import { Nouns } from './collections/Nouns'
import { Verbs } from './collections/Verbs'
import { Things } from './collections/Things'
import { Actions } from './collections/Actions'
import { Types } from './collections/Types'
import { Properties } from './collections/Properties'
import { Roles } from './collections/Roles'
import { Webhooks } from './collections/Webhooks'
import { Users } from './collections/Users'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Functions, Workflows, Models, Generations, Nouns, Verbs, Things, Types, Properties, Actions, Roles, Users, Webhooks],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload.types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./ai.db',
    },
  }),
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
