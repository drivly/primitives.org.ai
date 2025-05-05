import { spawn } from 'child_process'
import path from 'path'

const getAdminDir = () => {
  try {
    const fileUrl = new URL(import.meta.url)
    return path.resolve(path.dirname(fileUrl.pathname), '../admin')
  } catch (error) {
    return path.resolve(process.cwd(), 'admin')
  }
}

export const runAdmin = (args: string[] = []) => {
  const adminDir = getAdminDir()
  const script = args[0] || 'dev'
  const validScripts = ['dev', 'build', 'start']
  
  if (!validScripts.includes(script)) {
    console.error(`Invalid script: ${script}. Use one of: ${validScripts.join(', ')}`)
    process.exit(1)
  }
  
  spawn('npm', ['run', script], {
    cwd: adminDir,
    stdio: 'inherit',
  })
}

export const cli = (args = process.argv.slice(2)) => {
  const command = args[0]
  
  if (command === 'admin') {
    return runAdmin(args.slice(1))
  }
  
  console.log(`
Usage: ai-database [command] [options]

Commands:
  admin [dev|build|start]  Run the admin application
  
Options:
  --help, -h              Show help
  --version, -v           Show version
`)
}

if (typeof require !== 'undefined' && require.main === module) {
  cli()
}
