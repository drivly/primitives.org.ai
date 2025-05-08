// Test file to verify package functionality (ES Module version)
import { createAdminConfig, Functions, Workflows, Models } from './dist/index.mjs';

// Test importing collections
console.log('Collections imported successfully:');
console.log('- Functions:', typeof Functions === 'object');
console.log('- Workflows:', typeof Workflows === 'object');
console.log('- Models:', typeof Models === 'object');

// Test creating a config
const config = createAdminConfig({
  // Using minimal configuration without specifying admin user
});

console.log('\nConfig created successfully:');
console.log('- Has collections:', Array.isArray(config.collections));
console.log('- Has secret:', typeof config.secret === 'string');
console.log('- Has admin config:', typeof config.admin === 'object');

// Test MongoDB adapter configuration
console.log('\nMongoDB adapter configuration:');
console.log('- DB config exists:', typeof config.db === 'object');
