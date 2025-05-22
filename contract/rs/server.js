const express = require('express');
const { exec } = require('child_process');
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/ls', (req, res) => {
  const cwd = process.cwd();
  fs.readdir(cwd, { withFileTypes: true }, (err, entries) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const files = entries.map(entry => ({
      name: entry.name,
      type: entry.isDirectory() ? 'directory' : 'file'
    }));
    res.json({ cwd, files });
  });
});

app.get('/env/testEnv', (req, res) => {
  const testEnv = process.env.testEnv;
  res.json({ testEnv });
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
