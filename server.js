const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const counterFile = path.join(__dirname, 'counter.json');

function readCounter() {
  try {
    const data = fs.readFileSync(counterFile, 'utf8');
    return JSON.parse(data).count || 0;
  } catch (err) {
    return 0;
  }
}

function saveCounter(count) {
  fs.writeFileSync(counterFile, JSON.stringify({ count }), 'utf8');
}

let visitCount = readCounter();
const serverName = os.hostname();

app.get('/', (req, res) => {
  visitCount++;
  saveCounter(visitCount);
  res.send(`
    <h1>Welcome to the Visit Counter App!</h1>
    <p>Visitor count: ${visitCount}</p>
    <p>Server: ${serverName}</p>
  `);
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
