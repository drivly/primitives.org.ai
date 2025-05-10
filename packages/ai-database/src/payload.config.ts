import { getDatabaseAdapter } from './lib/database'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import type { Config } from './payload.types'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Database } from './globals/Database'
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
import { Users } from './collections/Users'
import { Databases } from './collections/Databases'
import { Webhooks } from './collections/Webhooks'
import { Settings } from './globals/Settings'

import { seed } from './workflows/seed'
import { generateThing } from './workflows/generateThing'
import { seedFunctions } from './tasks/seedFunctions'
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
    components: {
      graphics: {
        Icon: '/components/Icon',
        Logo: '/components/Logo',
      },
    }
  },
  collections: [Nouns, Verbs, Things, Events, Functions, Workflows, Models, Generations, Batches, Types, Actions, Enums, Properties, Roles, Users, Webhooks],
  globals: [Settings],  
  jobs: {
    tasks: [seedFunctions, seedModels, seedRoles, seedSchema],
    workflows: [seed, generateThing],
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-generated-secret-' + Math.random().toString(36).substring(2),
  typescript: {
    outputFile: path.resolve(dirname, 'payload.types.ts'),
  },
  db: getDatabaseAdapter(process.env.DATABASE_URI),
  plugins: [
    multiTenantPlugin<Config>({
      debug: true,
      enabled: false,
      userHasAccessToAllTenants: () => true,
      tenantsSlug: 'databases',
      tenantField: { name: 'ns' },
      tenantSelectorLabel: 'Database',
      collections: {
        nouns: {},
        verbs: {},
        things: {},
        events: {},
        functions: {},
        workflows: {},
        generations: {},
        // navigation: {
        //   isGlobal: true,
        // }
      },
    }),
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
