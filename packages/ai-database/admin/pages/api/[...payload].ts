const { createPayloadNextHandler } = require('@payloadcms/next')
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default createPayloadNextHandler({
  configPath: path.resolve(__dirname, '../../../../src/payload.config.ts'),
})
