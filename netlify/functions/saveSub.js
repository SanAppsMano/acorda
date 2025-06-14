const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const sub = JSON.parse(event.body);
  const paths = [];
  if (process.env.SUBS_FILE) {
    paths.push(path.resolve(process.env.SUBS_FILE));
  } else {
    if (process.env.NETLIFY_DEV) paths.push(path.join(__dirname, 'subs.json'));
    paths.push(path.join('/tmp', 'subs.json'));
  }

  let filePath = paths.find(p => fs.existsSync(p));
  if (!filePath) filePath = paths[0];

  const subs = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];

  if (!subs.find(s => s.endpoint === sub.endpoint)) subs.push(sub);
  fs.writeFileSync(filePath, JSON.stringify(subs, null, 2));
  for (const p of paths) {
    if (p !== filePath) {
      try {
        fs.writeFileSync(p, JSON.stringify(subs, null, 2));
      } catch (e) {
        // ignore paths we cannot write to
      }
    }
  }

  return { statusCode: 200, body: 'Subscription saved.' };
};
