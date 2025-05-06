#!/usr/bin/env node

const { Service, Business, Startup } = require('../dist')

const command = process.argv[2]
const args = process.argv.slice(3)

function showHelp() {
  console.log(`
Services-as-Software CLI

Usage:
  services-as-software <command> [options]

Commands:
  create-service    Create a new service
  create-business   Create a new business
  create-startup    Create a new startup
  help              Show this help message

For more information, visit: https://mdx.org.ai
`)
}

async function main() {
  switch (command) {
    case 'create-service':
      console.log('Creating a new service...')
      break
    
    case 'create-business':
      console.log('Creating a new business...')
      break
    
    case 'create-startup':
      console.log('Creating a new startup...')
      break
    
    case 'help':
    default:
      showHelp()
      break
  }
}

main().catch(error => {
  console.error('Error:', error.message)
  process.exit(1)
})
