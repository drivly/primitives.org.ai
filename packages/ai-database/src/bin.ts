#!/usr/bin/env node

import { runAdmin } from './cli'

const args = process.argv.slice(2)
const command = args[0]

if (command === 'admin') {
  runAdmin(args.slice(1))
} else {
  console.error(`Unknown command: ${command}`)
  console.log('Available commands: admin')
  process.exit(1)
}
