const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Download route to serve the compiled JSON file
router.get('/download/:requestId', (req, res) => {
  const { requestId } = req.params;
  const folderPath = path.join(__dirname, requestId);
  const filePath = path.join(folderPath, `compiled${requestId}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  // Log the file URL to the console
  const fileUrl = `${req.protocol}://${req.get('host')}/download/${requestId}`;
  console.log('File URL:', fileUrl);
  res.download(filePath, `compiled${requestId}.json`, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error sending file' });
    }
  });
});

module.exports = router;
