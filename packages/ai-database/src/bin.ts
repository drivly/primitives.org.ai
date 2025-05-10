#!/usr/bin/env node

const env = process.env as Record<string, string>
if (!env.NODE_ENV) {
  env.NODE_ENV = 'production'
}
env.PAYLOAD_SECRET = env.PAYLOAD_SECRET || 'default-generated-secret-' + Math.random().toString(36).substring(2)

const path = require('path')
process.chdir(path.dirname(__dirname))

require('../admin/.next/standalone/server.js')

console.log(`
✨ Payload CMS Admin is now running!
🔗 Open http://localhost:${process.env.PORT || 3000}/admin to get started
`)
