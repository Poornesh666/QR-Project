const express = require("express");
const qr = require("qr-image");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Route to generate QR code
app.post("/generate", (req, res) => {
  const { text } = req.body; // Get input from frontend
  if (!text) {
    return res.status(400).send("Text is required");
  }
  const qrCode = qr.imageSync(text, { type: "png" });
  res.setHeader("Content-Type", "image/png");
  res.send(qrCode); // Send QR code image as response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
