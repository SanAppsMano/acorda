const fs = require('fs');
const path = require('path');

// Caminho do arquivo compartilhado entre invocações
const file = process.env.SUBS_FILE ||
  (process.env.NETLIFY_DEV
    ? path.join(process.cwd(), 'netlify', 'functions', 'subs.json')
    : path.join('/tmp', 'subs.json'));

// Reaproveita em memória se a função continuar viva
globalThis.acordaSubs = globalThis.acordaSubs || null;

function loadSubs() {
  if (globalThis.acordaSubs) {
    return globalThis.acordaSubs;
  }
  if (fs.existsSync(file)) {
    try {
      const data = fs.readFileSync(file, 'utf8');
      const parsed = JSON.parse(data);
      globalThis.acordaSubs = Array.isArray(parsed) ? parsed : [];
    } catch {
      globalThis.acordaSubs = [];
    }
  } else {
    globalThis.acordaSubs = [];
  }
  return globalThis.acordaSubs;
}

function saveSubs(subs) {
  globalThis.acordaSubs = subs;
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(subs, null, 2));
  } catch {
    // ignore write errors
  }
}

module.exports = { loadSubs, saveSubs };
