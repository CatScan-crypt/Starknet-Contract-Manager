const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/status/:requestId', (req, res) => {
  const { requestId } = req.params;
  const folderPath = path.join(__dirname, "download",'jobs',requestId);
  const filePath = path.join(folderPath,  "boilerplate_erc20.contract_class.json" );

  if (fs.existsSync(folderPath) && !fs.existsSync(filePath)) {
    // No folder, no file
    return res.json({ status: 'Processing' });
  }

  else if (fs.existsSync(filePath)) {
    // Folder exists, file does not
    return res.json({ status: 'completed' });
  }
  else{
    // Folder does not exist
    return res.status(404).json({ error: 'Request ID not found' });
  }
});

module.exports = router;

//TODO: add a folder creation for the Processing status in sendDoc route