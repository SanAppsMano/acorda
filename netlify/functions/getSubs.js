const { loadSubs } = require('./subStore');

exports.handler = async () => {
  const subs = loadSubs();
  return {
    statusCode: 200,
    body: JSON.stringify({ count: subs.length })
  };
};
