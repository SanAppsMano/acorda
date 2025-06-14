const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const paths = [];
  if (process.env.SUBS_FILE) {
    paths.push(path.resolve(process.env.SUBS_FILE));
  } else {
    if (process.env.NETLIFY_DEV) paths.push(path.join(process.cwd(), 'netlify', 'functions', 'subs.json'));
    paths.push(path.join('/tmp', 'subs.json'));
  }

  let filePath = paths.find(p => fs.existsSync(p));
  if (!filePath) filePath = paths[0];

  let subs = [];
  if (fs.existsSync(filePath)) {
    try {
      subs = JSON.parse(fs.readFileSync(filePath));
    } catch (_) {
      subs = [];
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ count: Array.isArray(subs) ? subs.length : 0 })
  };
};
