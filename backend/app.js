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
    "Origin, X-Requested-With, Content-Type, Accept, X-User"
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

// 上傳題庫
app.post(
  "/api/database/upload/base_data",
  upload.single("file"),
  (req, res) => {
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
      res.json({
        success: true,
        message: "題庫上傳成功",
        data: { id: filePath },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
// 上傳字典
app.post(
  "/api/database/upload/dictionary",
  upload.single("file"),
  (req, res) => {
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
      res.json({
        success: true,
        message: "字典上傳成功",
        data: { id: filePath },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
// 初始化向量資料庫
app.post("/api/database/init", (req, res) => {
  const databaseInfo = req.body;
  if (!databaseInfo?.baseDataId) {
    return res
      .status(400)
      .json({ success: false, message: "No database info" });
  }
  // res.json({
  //   success: true,
  //   message: "資料庫開始初始化，等待約5分鐘後嘗試進行問答",
  //   data: { qaId: new Date().toISOString() },
  // });

  res.json({
    success: false,
    message: "初始化進行中，請等待5分鐘後才可再次初始化。",
    data: { qaId: new Date().toISOString() },
  });

  // res.json({
  //   success: false,
  //   message: "目前尚有查詢正在進行，請稍後再進行初始化。",
  //   data: null,
  // });
});
// 問答
app.post("/api/qa/ask", (req, res) => {
  const { qaId, question } = req.body;
  if (!question) {
    return res.status(400).json({ success: false, message: "No question" });
  }
  setTimeout(() => {
    res.json({
      success: true,
      message: "完成查詢",
      data: {
        qaId: new Date().toISOString(),
        message: [
          {
            title: "關於你的問題...",
            answer:
              "在首頁點擊「電子錢包」，然後點擊「綁定」，輸入您的手機號碼，然後輸入驗證碼，即可綁定成功。",
            score: 0.12145678,
            question: "和雲題庫",
          },
          {
            title: "關於你的問題...",
            answer:
              "在首頁點擊「電子錢包」，然後點擊「綁定」，輸入您的手機號碼，然後輸入驗證碼，即可綁定成功。",
            score: 0.12145678,
            question: "和雲題庫",
          },
          {
            title: "關於你的問題...",
            answer:
              '在首頁點擊「電子錢包」，然後點擊「綁定」，輸入您的手機號碼，然後輸入驗證碼，即可綁定成功。或查詢<a target="_blank" href="https://google.com" class="msg">google搜尋引琴</a>自行查看',
            score: 0.12145678,
            question: "和雲題庫",
          },
        ],
      },
    });
    // res.json({
    //   success: false,
    //   message: "資料庫發生變更，可能無法回答您預期的問題。",
    //   data: {
    //     qaId: new Date().toISOString(),
    //     message: null,
    //   },
    // });
  }, 2000);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
