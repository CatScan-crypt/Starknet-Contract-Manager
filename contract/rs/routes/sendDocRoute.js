const express = require('express');
const multer = require('multer');
const sendDocumentToTelegram = require('./sendDocumentToTelegram');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/sendDoc', upload.single('document'), async (req, res) => {
  try {
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
