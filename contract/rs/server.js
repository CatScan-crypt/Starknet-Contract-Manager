const express = require('express');
const { exec } = require('child_process');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const FormData = require('form-data');
app.use(express.json());
const upload = multer({ dest: 'uploads/' });


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

app.post('/sendDocument', upload.single('document'), async (req, res) => {
  try {
    const { caption } = req.body;
    const formdata = new FormData();
    formdata.append('chat_id', process.env.TARGET_CHANNEL_ID);
    formdata.append('document', fs.createReadStream(req.file.path), req.file.originalname);
    formdata.append('caption', caption || '{\n  userAddress: "0123456789",\n  properties: {\n    tokenName: "exampleName",\n    symbol: "EXM",\n    supply: "100000",\n  },\n  methods: {\n    mintable: true,\n    burnable: false\n  }\n}');

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: formdata.getHeaders()
    };

    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const response = await fetch(`https://api.telegram.org/bot${process.env.token}/sendDocument`, requestOptions);
    const result = await response.text();
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
