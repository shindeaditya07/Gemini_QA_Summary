const fs = require("fs");
const path = require("path");
const { parsePDF, parseDocx } = require("../utils/fileParsers");
const { spawn } = require("child_process");
const File = require("../models/File");

exports.handleUpload = async (req, res) => {
  const file = req.file;
  const query = req.body.query || "null";
  const mode = req.body.mode;

  try {
    let text = "";

    if (file.mimetype === "application/pdf") {
      text = await parsePDF(file.path);
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      text = await parseDocx(file.path);
    } else {
      return res.status(400).json({ error: "Unsupported file type." });
    }

    // uploadsDir should already exist, but double-check with recursive mkdir just in case
    const uploadsDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const tempTextPath = path.join(uploadsDir, `${file.filename}.txt`);
    fs.writeFileSync(tempTextPath, text, "utf-8");

    const pythonProcess = spawn("python", [
      path.join(__dirname, "../ai/gemini_handler.py"),
      mode,
      query,
      tempTextPath,
    ]);

    let output = "";
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on("close", async () => {
      try {
        fs.unlinkSync(file.path);
        fs.unlinkSync(tempTextPath);
      } catch (e) {
        console.error("Error cleaning up files:", e);
      }

      await File.create({
        filename: file.filename,
        originalname: file.originalname,
        mode,
        query: query !== "null" ? query : "",
        result: output.trim(),
      });

      res.json({ result: output.trim() });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
