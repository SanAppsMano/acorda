const fs = require('fs');
const path = require('path');
const saveSub = require('../netlify/functions/saveSub.js');
const getSubs = require('../netlify/functions/getSubs.js');

const filePath = path.join(__dirname, '../netlify/functions/subs.json');

function cleanFile() {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

describe('Subscription functions', () => {
  beforeEach(() => {
    cleanFile();
  });

  test('saveSub grava nova inscrição', async () => {
    const sub = { endpoint: 'http://example.com', keys: { p256dh: 'a', auth: 'b' } };
    await saveSub.handler({ httpMethod: 'POST', body: JSON.stringify(sub) });
    const data = JSON.parse(fs.readFileSync(filePath));
    expect(data).toEqual([sub]);
  });

  test('getSubs retorna contagem correta', async () => {
    const sub = { endpoint: 'http://example.com', keys: { p256dh: 'a', auth: 'b' } };
    await saveSub.handler({ httpMethod: 'POST', body: JSON.stringify(sub) });
    const res = await getSubs.handler();
    const body = JSON.parse(res.body);
    expect(body.count).toBe(1);
    expect(Array.isArray(body.subs)).toBe(true);
  });
});
