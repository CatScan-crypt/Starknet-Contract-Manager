const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.get('/version', ( req,res) => {
  exec('mise exec scarb@2.8.4 -- scarb --version', (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ version: stdout.trim() });
  });
});

app.get('/mp', ( req,res) => {
  exec('mise exec scarb@2.8.4 -- scarb manifest-path', (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ version: stdout.trim() });
  });
});

app.post('/build', (req, res) => {
  exec('mise exec scarb@2.8.4 starknet-foundry@0.33.0 --command "scarb build" ', (err, stdout, stderr) => {
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

app.post('/snf', (req, res) => {
  exec('mise exec starknet-foundry@0.33.0  --command "snforge "', (err, stdout, stderr) => {
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

app.post('/snc', (req, res) => {
  exec('mise exec starknet-foundry@0.33.0  --command "sncast -V "', (err, stdout, stderr) => {
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

app.post('/test', (req, res) => {
  exec('mise exec starknet-foundry@0.33.0 -- snforge test', (err, stdout, stderr) => {
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

app.post('/globalsn', (req, res) => {
  exec('mise use -g starknet-foundry@0.33.0', (err, stdout, stderr) => {
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

app.post('/globals', (req, res) => {
  exec('mise use -g scarb@2.8.4', (err, stdout, stderr) => {
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

app.post('/update', (req, res) => {
  exec('mise exec scarb@2.8.4 -- scarb update', (err, stdout, stderr) => {
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

app.post('/fetch', (req, res) => {
  exec('mise exec scarb@2.8.4 -- scarb fetch', (err, stdout, stderr) => {
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
