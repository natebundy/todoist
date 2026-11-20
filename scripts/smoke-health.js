/* Zero-dependency smoke test: checks that public/health.json reports status "ok". */
const fs = require('fs');
const path = require('path');

const healthPath = path.resolve(__dirname, '..', 'public', 'health.json');

try {
  const health = JSON.parse(fs.readFileSync(healthPath, 'utf8'));
  if (health.status !== 'ok') {
    throw new Error(`expected status "ok" but got ${JSON.stringify(health.status)}`);
  }
  console.log('Health smoke check passed: public/health.json status is "ok"');
} catch (error) {
  console.error(`Health smoke check failed (${healthPath}): ${error.message}`);
  process.exit(1);
}
