const express = require("express");
const qr = require("qr-image");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Root route to display a welcome message or home page
app.get("/", (req, res) => {
  res.send("Welcome to the QR Code Generator!");
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
