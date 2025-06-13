const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const sub = JSON.parse(event.body);
  const file = path.resolve(__dirname, 'subs.json');
  let subs = [];
  if (fs.existsSync(file)) {
    subs = JSON.parse(fs.readFileSync(file));
  }
  // evita duplicatas
  if (!subs.find(s => s.endpoint === sub.endpoint)) subs.push(sub);
  fs.writeFileSync(file, JSON.stringify(subs, null, 2));
  return { statusCode: 200, body: 'Subscription saved.' };
};
