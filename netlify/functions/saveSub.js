const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const sub = JSON.parse(event.body);
  const filePath = process.env.SUBS_FILE
    ? path.resolve(process.env.SUBS_FILE)
    : process.env.NETLIFY_DEV
      ? path.join(__dirname, 'subs.json')
      : path.join('/tmp', 'subs.json');
  const subs = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];

  if (!subs.find(s => s.endpoint === sub.endpoint)) subs.push(sub);
  fs.writeFileSync(filePath, JSON.stringify(subs, null, 2));

  return { statusCode: 200, body: 'Subscription saved.' };
};
