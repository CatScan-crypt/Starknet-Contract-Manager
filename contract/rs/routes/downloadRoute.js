const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Route for the compiled JSON file
router.get('/download/:requestId/compiled', (req, res) => {
  const { requestId } = req.params;
  const filePath = path.join(__dirname, "download",'jobs', requestId, `boilerplate_erc20.compiled_contract_class.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'JSON file not found' });
  }

  res.download(filePath, `compiled.json`, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error sending JSON file' });
    }
  });
});

// Route for the log file (example)
router.get('/download/:requestId/abi', (req, res) => {
  const { requestId } = req.params;
  const filePath = path.join(__dirname, "download", 'jobs',requestId, `boilerplate_erc20.contract_class.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Log file not found' });
  }

  res.download(filePath, `abi.json`, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error sending log file' });
    }
  });
});

module.exports = router;