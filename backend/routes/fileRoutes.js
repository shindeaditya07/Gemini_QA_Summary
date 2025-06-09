const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleUpload } = require("../controllers/fileController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), handleUpload);

module.exports = router;
