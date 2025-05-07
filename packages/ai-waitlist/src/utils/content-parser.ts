import fs from 'fs'
import path from 'path'

/**
 * Parse project context from README.md and .ai folder
 * @param rootDir - Root directory of the project
 * @returns Project context object
 */
export const parseProjectContext = (rootDir: string) => {
  const readmePath = path.join(rootDir, 'README.md')
  const aiFolder = path.join(rootDir, '.ai')
  
  const context: {
    readme: string;
    aiContent: Record<string, any>;
  } = {
    readme: '',
    aiContent: {}
  }
  
  if (fs.existsSync(readmePath)) {
    try {
      context.readme = fs.readFileSync(readmePath, 'utf8')
    } catch (error) {
      console.error('Error reading README.md:', error)
    }
  }
  
  if (fs.existsSync(aiFolder)) {
    try {
      const files = fs.readdirSync(aiFolder)
      
      for (const file of files) {
        const filePath = path.join(aiFolder, file)
        const stats = fs.statSync(filePath)
        
        if (stats.isFile()) {
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const fileName = path.basename(file, path.extname(file))
          
          context.aiContent[fileName] = fileContent
        }
      }
    } catch (error) {
      console.error('Error reading .ai folder:', error)
    }
  }
  
  return context
}
