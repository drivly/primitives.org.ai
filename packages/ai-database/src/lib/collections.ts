import type { Access, CodeField } from 'payload'

type EditorOptions =
  Exclude<
    NonNullable<CodeField['admin']>['editorOptions'],
    undefined
  >

export const editorOptions: EditorOptions = { padding: { top: 20, bottom: 20 } }

export const loggedIn: Access = ({ req: { user } }) => user != null

