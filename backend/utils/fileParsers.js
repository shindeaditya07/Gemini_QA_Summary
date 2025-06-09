const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

exports.parsePDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

exports.parseDocx = async (filePath) => {
  const data = await mammoth.extractRawText({ path: filePath });
  return data.value;
};
