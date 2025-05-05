import { CollectionConfig } from 'payload/types'

export const Verbs: CollectionConfig = {
  slug: 'verbs',
  fields: [
    { name: 'action', type: 'text', admin: { description: 'Active tense like Create' } },
    { name: 'act', type: 'text', admin: { description: 'Third person singular present tense like Creates' } },
    { name: 'activity', type: 'text', admin: { description: 'Gerund like Creating' } },
    { name: 'event', type: 'text', admin: { description: 'Past tense like Created' } },
    { name: 'subject', type: 'text', admin: { description: 'Subject like Creator' } },
    { name: 'object', type: 'text', admin: { description: 'Object like Creation' } },
    { name: 'inverse', type: 'text', admin: { description: 'Opposite like Destroy' } },
    { name: 'inverseAct', type: 'text', admin: { description: 'Third person singular present tense like Destroys' } },
    { name: 'inverseActivity', type: 'text', admin: { description: 'Gerund like Destroying' } },
    { name: 'inverseEvent', type: 'text', admin: { description: 'Past tense like Destroyed' } },
    { name: 'inverseSubject', type: 'text', admin: { description: 'Subject like Destroyer' } },
    { name: 'inverseObject', type: 'text', admin: { description: 'Object like Destruction' } },
  ],
}
