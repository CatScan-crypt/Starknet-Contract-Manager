const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.get('/version', ( req,res) => {
  exec('mise exec scarb@2.8.4 --command "scarb --version"', (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ version: stdout.trim() });
  });
});

app.get('/mp', ( req,res) => {
  exec('mise exec scarb@2.8.4 --command "scarb manifest-path"', (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ version: stdout.trim() });
  });
});

app.get('/build', (req, res) => {
  exec('mise exec scarb@2.8.4 --command "scarb build"', (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({
        error: stderr.trim() || err.message || 'Unknown error',
        code: err.code,
        signal: err.signal
      });
    }
    res.json({ output: stdout.trim() });
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
