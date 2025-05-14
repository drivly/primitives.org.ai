import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all .js files in a directory
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Get all .js files in the dist directory
const distDir = path.join(__dirname, '../dist');
const jsFiles = findJsFiles(distDir);

// Create .mjs copies of all .js files
jsFiles.forEach(jsFile => {
  const mjsFile = jsFile.replace('.js', '.mjs');
  fs.copyFileSync(jsFile, mjsFile);
  console.log(`Created ${mjsFile}`);
});

console.log('Successfully created .mjs files');
