const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Set up multer storage to save files 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const requestId = req.params.requestId;
    const folderPath = path.join(__dirname, '../routes/download/jobs', requestId);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST /upload/:requestId
router.post('/upload/:requestId', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully' });
});

module.exports = router;
