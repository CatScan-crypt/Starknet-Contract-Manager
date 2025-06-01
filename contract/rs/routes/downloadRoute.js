const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Route to get all files from a job directory as JSON
router.get('/download/:requestId', (req, res) => {
  const { requestId } = req.params;
  const dirPath = path.join(__dirname, "download", 'jobs', requestId);

  // Check if directory exists
  if (!fs.existsSync(dirPath)) {
    return res.status(404).json({ error: 'Job directory not found' });
  }

  try {
    // Read all files in the directory
    const files = fs.readdirSync(dirPath);
    const filesContent = {};

    // Read content of each file
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      try {
        // Try to parse as JSON if possible
        filesContent[file] = JSON.parse(content);
      } catch {
        // If not JSON, store as string
        filesContent[file] = content;
      }
    });

    // Send response as JSON
    res.json({
      requestId,
      files: filesContent
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Error reading directory contents',
      message: error.message 
    });
  }
});

module.exports = router;