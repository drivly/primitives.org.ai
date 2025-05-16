import type { MetaRecord } from 'nextra'

export default {
  index: 'Overview',
  'business-as-code': '',
  'services-as-software': '',
  'getting-started': '',

  // _business: { type: 'separator' },

  _ai: { type: 'separator', title: 'AI' },

  functions: '',
  agents: '',
  humans: { display: 'hidden' },
  workflows: '',

  _: { type: 'separator' },
  business: '',
  goals: '',
  plans: '',
  services: '',

  _data: { type: 'separator' },
  database: '',
  providers: '',
  models: '',
  evals: '',
  experiments: '',

  _marketing: { type: 'separator' },
  sites: '',
  props: '',
  brand: { display: 'hidden' },

  _packages: { type: 'separator' },
  packages: '',
} satisfies MetaRecord
