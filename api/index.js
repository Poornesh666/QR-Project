const express = require("express");
const qr = require("qr-image");
const path = require("path");

const app = express();
app.use(express.json());

// Route to generate QR code
app.post("/generate", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send("Text is required");
  }
  const qrCode = qr.imageSync(text, { type: "png" });
  res.setHeader("Content-Type", "image/png");
  res.send(qrCode);
});

// Vercel needs to export a handler function, not listen.
module.exports = (req, res) => {
  app(req, res);  // Handles the request and response
};
