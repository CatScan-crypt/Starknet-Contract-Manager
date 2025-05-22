const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

// Setup storage for uploads (temporary)
const upload = multer({ dest: "uploads/" });

// Serve compiled files statically (optional)
app.use("/compiled", express.static(path.join(__dirname, "compiled")));

// POST /sendDoc - receive document and return requestId
app.post("/sendDoc", upload.single("document"), async (req, res) => {
  const requestId = uuidv4();
  const inputFilePath = req.file.path;

  console.log(`Received file for requestId: ${requestId}`);

  // Simulate compile by copying file to "compiled" with delay
  setTimeout(() => {
    const outputFilePath = path.join(__dirname, "compiled", `req_${requestId}.zip`);
    fs.copyFile(inputFilePath, outputFilePath, (err) => {
      if (err) {
        console.error("Error during fake compile:", err);
      } else {
        console.log(`Compiled file ready for requestId: ${requestId}`);
      }
    });
  }, 5000); // Simulate 5 second compile delay

  res.json({ requestId });
});

// GET /status/:requestId - check if compiled file exists
app.get("/status/:requestId", (req, res) => {
  const { requestId } = req.params;
  const outputFilePath = path.join(__dirname, "compiled", `req_${requestId}.zip`);

  if (fs.existsSync(outputFilePath)) {
    res.json({ status: "done" });
  } else {
    res.json({ status: "pending" });
  }
});

// GET /download/:requestId - serve the compiled file
app.get("/download/:requestId", (req, res) => {
  const { requestId } = req.params;
  const outputFilePath = path.join(__dirname, "compiled", `req_${requestId}.zip`);

  if (fs.existsSync(outputFilePath)) {
    res.download(outputFilePath, `compiled_${requestId}.zip`);
  } else {
    res.status(404).send("File not found.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
