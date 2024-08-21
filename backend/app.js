// import express from "express";
// import multer from "multer";
// import path from "path";
// if you want to use import syntax, you need to add "type": "module" in package.json
// or you can use require syntax like below
const express = require("express");
const multer = require("multer");
const path = require("path");

const port = 3000;

const app = express();
const upload = multer({
  dest: "store/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = [".csv", ".xlsx"];
    const ext = path.extname(file.originalname);
    if (allowedFileTypes.includes(ext)) {
      cb(null, true);
    } else {
      req.fileValidationError = "Only .csv and .xlsx files are allowed";
      cb(null, false, req.fileValidationError);
    }
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Error handler for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (req.fileValidationError) {
    return res
      .status(400)
      .json({ success: false, message: req.fileValidationError });
  }
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  try {
    const filePath = path.join(process.cwd(), req.file.path);
    res.json({ success: true, message: "上傳成功", path: filePath });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
