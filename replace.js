const fs = require('fs');
const path = './node_modules/.pnpm_patches/moment@2.30.1/src/lib/parse/regex.js';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(".replace('\\\\', '')", ".replace(/\\\\/g, '')");
fs.writeFileSync(path, content);
