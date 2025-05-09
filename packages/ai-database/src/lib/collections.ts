import type { Access } from 'payload'

export const editorOptions = { padding: { top: 20, bottom: 20 } }

export const loggedIn: Access = ({ req: { user } }) => user != null