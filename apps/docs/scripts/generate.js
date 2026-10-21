const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const buildReactData = path.join(root, 'scripts/dev/build-react-data.js');

if (fs.existsSync(buildReactData)) {
  require(buildReactData);
}
console.log('Generated skill pages, graph, and indexes.');
