const fs = require('fs');
const path = 'node_modules/moment/src/lib/parse/regex.js';
let content = fs.readFileSync(path, 'utf8');
content = content.replace("            .replace('\\\\', '')", "            .replace(/\\\\/g, '')");
fs.writeFileSync(path, content);
