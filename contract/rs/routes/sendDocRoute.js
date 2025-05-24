const express = require('express');
const multer = require('multer');
const sendDocumentToTelegram = require('./sendDocumentToTelegram');
const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/sendDoc', upload.single('document'), async (req, res) => {
  try {
    // Parse caption as JSON5
    const captionObj = JSON5.parse(req.body.caption);
    const requestId = captionObj.requestId;
    // Ensure jobs directory exists
    const jobsDir = path.join(__dirname, 'download', 'jobs');
    if (!fs.existsSync(jobsDir)) {
      fs.mkdirSync(jobsDir, { recursive: true });
    }
    // Log requestId
    console.log('requestId:', requestId);
    // Create requestId directory
    const requestDir = path.join(jobsDir, String(requestId));
    if (!fs.existsSync(requestDir)) {
      fs.mkdirSync(requestDir);
    }
    const result = await sendDocumentToTelegram({
      file: req.file,
      caption: req.body.caption,
    });
    res.json({ telegramResponse: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
