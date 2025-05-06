import { spawn } from 'child_process'
import path from 'path'

/**
 * Runs the admin application with the specified arguments
 * @param args - Command line arguments (dev, build, start)
 * @returns The child process instance
 */
export const runAdmin = (args: string[] = []): ReturnType<typeof spawn> => {
  const adminDir = path.resolve(__dirname, '../admin')
  const script = args[0] || 'dev'
  const validScripts = ['dev', 'build', 'start']
  
  if (!validScripts.includes(script)) {
    console.error(`Invalid script: ${script}. Use one of: ${validScripts.join(', ')}`)
    process.exit(1)
  }
  
  const childProcess = spawn('npm', ['run', script], {
    cwd: adminDir,
    stdio: 'inherit',
  })
  
  childProcess.on('error', (error) => {
    console.error(`Failed to start admin app: ${error.message}`)
    process.exit(1)
  })
  
  process.on('SIGINT', () => childProcess.kill('SIGINT'))
  process.on('SIGTERM', () => childProcess.kill('SIGTERM'))
  
  return childProcess
}
