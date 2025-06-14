const webpush = require('web-push');
const { loadSubs, saveSubs } = require('./subStore');

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BOymOl4h63DQGXHJMMJPXYI1gxFIMIX5J2M0pMiH6Qi_XgN7VBOhpYctrXE85Ncr5Ssvfzl-IQQWnV3q8tZ8I4U';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'D1Frm3VNgDMClKSF1nqqKnppTuDzT_WS-yGD2Bpi9k0';

webpush.setVapidDetails(
  'mailto:contato@example.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod && event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const subs = await loadSubs(event);
  if (subs.length === 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Nenhuma subscription.' })
    };
  }

  const payload = JSON.stringify({ title: 'Acorde!', body: 'Alerta do monitor' });

  const results = await Promise.all(
    subs.map(sub =>
      webpush.sendNotification(sub, payload).catch(err => ({ error: err.message }))
    )
  );

  // remove failed subscriptions
  const validSubs = subs.filter((_, i) => !results[i]?.error);
  if (validSubs.length !== subs.length) {
    await saveSubs(event, validSubs);
  }

  return { statusCode: 200, body: JSON.stringify(results) };
};
