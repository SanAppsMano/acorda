const { loadSubs, saveSubs } = require('./subStore');

exports.handler = async (event) => {
  if (event.httpMethod && event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sub = JSON.parse(event.body);
  const subs = await loadSubs(event);

  if (!subs.find(s => s.endpoint === sub.endpoint)) {
    subs.push(sub);
    await saveSubs(event, subs);
  }

  return { statusCode: 200, body: 'Subscription saved.' };
};
