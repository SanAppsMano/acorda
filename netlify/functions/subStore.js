const fs = require('fs');
const path = require('path');

const paths = [];
if (process.env.SUBS_FILE) {
  paths.push(path.resolve(process.env.SUBS_FILE));
} else {
  if (process.env.NETLIFY_DEV) {
    paths.push(path.join(process.cwd(), 'netlify', 'functions', 'subs.json'));
  }
  paths.push(path.join('/tmp', 'subs.json'));
}

let inMemorySubs = [];

function loadSubs() {
  for (const p of paths) {
    if (fs.existsSync(p)) {
      try {
        const data = fs.readFileSync(p, 'utf8');
        const subs = JSON.parse(data);
        inMemorySubs = Array.isArray(subs) ? subs : [];
        return inMemorySubs;
      } catch (e) {
        // ignore parse errors and continue
      }
    }
  }
  return inMemorySubs;
}

function saveSubs(subs) {
  inMemorySubs = subs;
  for (const p of paths) {
    try {
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, JSON.stringify(subs, null, 2));
    } catch (e) {
      // ignore write errors
    }
  }
}

module.exports = { loadSubs, saveSubs };
