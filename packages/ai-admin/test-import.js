const { createAdminConfig, Functions, Workflows, Models } = require('./dist/index.js');

console.log('Collections imported successfully:');
console.log('- Functions:', typeof Functions === 'object');
console.log('- Workflows:', typeof Workflows === 'object');
console.log('- Models:', typeof Models === 'object');

const config = createAdminConfig({
  admin: {
    user: 'users',
  }
});

console.log('\nConfig created successfully:');
console.log('- Has collections:', Array.isArray(config.collections));
console.log('- Has secret:', typeof config.secret === 'string');
console.log('- Has admin config:', typeof config.admin === 'object');

console.log('\nMongoDB adapter configuration:');
console.log('- DB config exists:', typeof config.db === 'object');
