const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileRoutes = require("./routes/fileRoutes");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

// Use built-in express json parser
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const uri = process.env.MONGO_URI;

// MongoDB connection without deprecated options
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

// Routes
app.use("/api", fileRoutes);

// Serve static frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
