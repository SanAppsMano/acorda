const webpush = require('web-push');
const fs = require('fs');
const path = require('path');

webpush.setVapidDetails(
  'mailto:seu@email.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

exports.handler = async () => {
  const filePath = path.join(__dirname, 'subs.json');
  if (!fs.existsSync(filePath)) return { statusCode: 200, body: 'Nenhuma subscription.' };

  const subs = JSON.parse(fs.readFileSync(filePath));
  const payload = JSON.stringify({ title: 'Acorde!', body: 'Alerta do monitor' });

  const results = await Promise.all(subs.map(sub =>
    webpush.sendNotification(sub, payload).catch(err => ({ error: err.message }))
  ));

  return { statusCode: 200, body: JSON.stringify(results) };
};
