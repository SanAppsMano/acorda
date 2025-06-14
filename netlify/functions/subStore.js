const fs = require('fs');
const path = require('path');
let blobs;
const storeName = process.env.SUBS_STORE || 'acorda';

try {
  blobs = require('@netlify/blobs');
} catch {
  blobs = null;
}

// Caminho do arquivo para fallback local
const file = process.env.SUBS_FILE ||
  (process.env.NETLIFY_DEV
    ? path.join(process.cwd(), 'netlify', 'functions', 'subs.json')
    : path.join('/tmp', 'subs.json'));

globalThis.acordaSubs = globalThis.acordaSubs || null;

async function loadSubs(event) {
  if (globalThis.acordaSubs) {
    return globalThis.acordaSubs;
  }

  if (blobs) {
    try {
      blobs.connectLambda(event);
      const store = blobs.getStore(storeName);
      const data = await store.get('subs', { type: 'json' });
      globalThis.acordaSubs = Array.isArray(data) ? data : [];
      return globalThis.acordaSubs;
    } catch (err) {
      console.warn('Netlify Blobs não disponível:', err.message);
      // fallback para o arquivo local
    }
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

async function saveSubs(event, subs) {
  globalThis.acordaSubs = subs;

  if (blobs) {
    try {
      blobs.connectLambda(event);
      const store = blobs.getStore(storeName);
      await store.setJSON('subs', subs);
    } catch (err) {
      console.warn('Falha ao salvar no Blobs:', err.message);
    }
  }

  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(subs, null, 2));
  } catch {
    // ignore write errors
  }
}

module.exports = { loadSubs, saveSubs };
