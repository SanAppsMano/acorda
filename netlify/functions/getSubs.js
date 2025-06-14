const fs = require('fs');
const path = require('path');

function readSubs() {
  const filePath = path.join(__dirname, 'subs.json');
  return fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];
}

exports.handler = async () => {
  const subs = readSubs();
  return {
    statusCode: 200,
    body: JSON.stringify({ count: subs.length, subs })
  };
};

module.exports.readSubs = readSubs;
