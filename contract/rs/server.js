const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/compile', (req, res) => {
  const code = req.body.code;
  fs.writeFileSync('main.cairo', code);

  exec('scarb build', (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ output: stdout });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
