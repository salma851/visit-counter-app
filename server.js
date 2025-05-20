const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const counterFile = path.join(__dirname, 'counter.json');

function readCounter() {
  try {
    return JSON.parse(fs.readFileSync(counterFile)).count || 0;
  } catch {
    return 0;
  }
}

function saveCounter(count) {
  fs.writeFileSync(counterFile, JSON.stringify({ count }));
}

let visits = readCounter();

app.get('/', (req, res) => {
  visits++;
  saveCounter(visits);
  res.send(`<h1>Visites : ${visits}</h1>`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Running on port ${port}`));
