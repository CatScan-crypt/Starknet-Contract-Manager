const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

// ✅ Hello World route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// ✅ Scarb version route
app.get('/version', ( req,res) => {
exec('mise exec scarb --version', (err, stdout, stderr) => {
  if (err) {
    return res.status(500).json({ error: stderr });
  }
  res.json({ version: stdout.trim() });
});

});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
