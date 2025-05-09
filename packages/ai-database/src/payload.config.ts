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
import { Batches } from './collections/Batches'
import { Nouns } from './collections/Nouns'
import { Verbs } from './collections/Verbs'
import { Things } from './collections/Things'
import { Events } from './collections/Events'
import { Types } from './collections/Types'
import { Actions } from './collections/Actions'
import { Enums } from './collections/Enums'
import { Properties } from './collections/Properties'
import { Roles } from './collections/Roles'
import { Webhooks } from './collections/Webhooks'
import { Users } from './collections/Users'
import { Settings } from './globals/Settings'

import { seed } from './workflows/seed'
import { generateThing } from './workflows/generateThing'
import { seedModels } from './tasks/seedModels'
import { seedRoles } from './tasks/seedRoles'
import { seedSchema } from './tasks/seedSchema'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    autoLogin: process.env.AUTOLOGIN_EMAIL ?  { email: process.env.AUTOLOGIN_EMAIL, password: process.env.AUTOLOGIN_PASSWORD || '' } : undefined,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Nouns, Verbs, Things, Events, Functions, Workflows, Models, Generations, Batches, Types, Actions, Enums, Properties, Roles, Users, Webhooks],
  globals: [Settings],
  jobs: {
    tasks: [seedModels, seedRoles, seedSchema],
    workflows: [seed, generateThing],
  },
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
