// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import type { Config } from './payload.types'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { getOrCreatePlugin } from './plugins/getOrCreatePlugin'

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
import { generateDatabase } from './workflows/generateDatabase'
import { executeFunction } from './workflows/executeFunction'
import { generateThing } from './workflows/generateThing'
import { executeWorkflow } from './workflows/executeWorkflow'
import { generateNoun } from './workflows/generateNoun'
import { seedFunctions } from './tasks/seedFunctions'
import { seedModels } from './tasks/seedModels'
import { seedRoles } from './tasks/seedRoles'
import { seedSchema } from './tasks/seedSchema'
import { db } from './databases'
import { editorOptions } from './lib/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const config = buildConfig({
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
    workflows: [executeFunction, generateThing, generateDatabase, seed, executeWorkflow, generateNoun],
    jobsCollectionOverrides: ({defaultJobsCollection}) => {
      if(!defaultJobsCollection.admin){
        defaultJobsCollection.admin = {}
      }
      defaultJobsCollection.admin.hidden = false
      defaultJobsCollection.admin.group = 'Admin'
      defaultJobsCollection.labels = {
        singular: 'Job',
        plural: 'Jobs',
      }
      defaultJobsCollection.fields.map((field) => {
        if(field.type === 'json'){
          field.admin = {
            ...field.admin, editorOptions
          }
        }
      })
      return defaultJobsCollection
    },
    addParentToTaskLog: true,
    deleteJobOnComplete: false,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload.types.ts'),
  },
  db,
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
    getOrCreatePlugin(),
  ],
})

export default config
