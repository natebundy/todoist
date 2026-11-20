#!/usr/bin/env node
/* Dependency-free smoke check: validates public/status.json. */
const fs = require('fs');
const path = require('path');

const statusPath = path.resolve(__dirname, '..', 'public', 'status.json');

const fail = (message) => {
  console.error(`smoke-status: FAIL - ${message}`);
  process.exit(1);
};

let raw;
try {
  raw = fs.readFileSync(statusPath, 'utf8');
} catch (e) {
  fail(`cannot read ${statusPath} (${e.code || e.message})`);
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  fail(`${statusPath} is not valid JSON (${e.message})`);
}

if (data === null || typeof data !== 'object' || Array.isArray(data)) {
  fail('status.json must contain a JSON object');
}

if (data.status !== 'ok') {
  fail(`expected status "ok" but got ${JSON.stringify(data.status)}`);
}

console.log('smoke-status: OK - public/status.json status is "ok"');
