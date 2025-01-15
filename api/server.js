const express = require("express");
const qr = require("qr-image");
const path = require("path");

const app = express();

// Use the environment variable for dynamic port (necessary for platforms like Glitch)
const PORT = process.env.PORT || 3000;  // Default to 3000 for local testing

// Middleware to serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Route to generate QR code
app.post("/generate", (req, res) => {
  const { text } = req.body; // Get input from frontend
  if (!text) {
    return res.status(400).send("Text is required");
  }
  const qrCode = qr.imageSync(text, { type: "png" }); // Generate QR code
  res.setHeader("Content-Type", "image/png");
  res.send(qrCode); // Send QR code image as response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
