import { spawn } from 'child_process'

/**
 * Runs the admin application with the specified arguments
 * @param args - Command line arguments (dev, build, start)
 * @returns The child process instance
 */
declare const runAdmin: (args?: string[]) => ReturnType<typeof spawn>

export { runAdmin }
