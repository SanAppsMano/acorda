const { loadSubs } = require('./subStore');

exports.handler = async (event) => {
  const subs = await loadSubs(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ count: subs.length })
  };
};
