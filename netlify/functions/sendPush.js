const webpush = require('web-push');
const fs = require('fs');
const path = require('path');

// carrega VAPID a partir das env vars
webpush.setVapidDetails(
  'mailto:seu@email.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

exports.handler = async () => {
  const file = path.resolve(__dirname, 'subs.json');
  if (!fs.existsSync(file)) {
    return { statusCode: 200, body: 'Nenhuma subscription encontrada.' };
  }
  const subs = JSON.parse(fs.readFileSync(file));
  const payload = JSON.stringify({
    title: 'Acorde!',
    body: 'Alerta do monitor'
  });
  const results = await Promise.all(subs.map(sub =>
    webpush.sendNotification(sub, payload).catch(err => ({ error: err.message }))
  ));
  return { statusCode: 200, body: JSON.stringify(results) };
};
