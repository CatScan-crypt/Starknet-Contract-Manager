const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

// ✅ Hello World route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Existing compile route
app.get('/scarb', (req, res) => {
  const code = req.body.code;
  fs.writeFileSync('main.cairo', code);

  exec('scarb --version', (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ output: stdout });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
