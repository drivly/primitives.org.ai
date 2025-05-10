import { createNextPayloadAPI } from '@payloadcms/next/routes'
import { getPayload } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const { GET, POST, PUT, PATCH, DELETE } = createNextPayloadAPI({
  getPayload,
})
