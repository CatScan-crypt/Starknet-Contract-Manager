const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Set up multer storage to save files 
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const requestId = req.params.requestId;
      const folderPath = path.join(__dirname, '../routes/download/jobs', requestId);
      await fs.promises.mkdir(folderPath, { recursive: true });
      cb(null, folderPath);
    } catch (err) {
      cb(err);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST /upload/:requestId
router.post('/upload/:requestId', async (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: 'File upload failed', details: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully' });
  });
});

module.exports = router;
