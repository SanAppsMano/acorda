const webpush = require('web-push');
const fs = require('fs');
const path = require('path');

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BOymOl4h63DQGXHJMMJPXYI1gxFIMIX5J2M0pMiH6Qi_XgN7VBOhpYctrXE85Ncr5Ssvfzl-IQQWnV3q8tZ8I4U';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'D1Frm3VNgDMClKSF1nqqKnppTuDzT_WS-yGD2Bpi9k0';

webpush.setVapidDetails(
  'mailto:contato@example.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

exports.handler = async () => {
  const paths = [];
  if (process.env.SUBS_FILE) {
    paths.push(path.resolve(process.env.SUBS_FILE));
  } else {
    if (process.env.NETLIFY_DEV) paths.push(path.join(__dirname, 'subs.json'));
    paths.push(path.join('/tmp', 'subs.json'));
  }

  let filePath = paths.find(p => fs.existsSync(p));
  if (!filePath) filePath = paths[0];

  if (!fs.existsSync(filePath)) {
    return { statusCode: 200, body: JSON.stringify({ message: 'Nenhuma subscription.' }) };
  }

  const subs = JSON.parse(fs.readFileSync(filePath));
  if (!Array.isArray(subs) || subs.length === 0) {
    return { statusCode: 200, body: JSON.stringify({ message: 'Nenhuma subscription.' }) };
  }

  const payload = JSON.stringify({ title: 'Acorde!', body: 'Alerta do monitor' });

  const results = await Promise.all(subs.map(sub =>
    webpush.sendNotification(sub, payload).catch(err => ({ error: err.message }))
  ));

  return { statusCode: 200, body: JSON.stringify(results) };
};
