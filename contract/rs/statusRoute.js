const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/status/:requestId', (req, res) => {
  const { requestId } = req.params;
  const folderPath = path.join(__dirname, requestId);
  const filePath = path.join(folderPath, `compiled${requestId}.json`);

  if (!fs.existsSync(folderPath)) {
    // No folder, no file
    return res.json({ status: 'Processing' });
  }

  if (!fs.existsSync(filePath)) {
    // Folder exists, file does not
    return res.json({ status: 'Pending' });
  }

  // Both folder and file exist
  return res.json({ status: 'completed' });
});

module.exports = router;
