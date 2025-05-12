// /pages/api/upload.js
import nextConnect from "next-connect";
import multer from "multer";
import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";

const MONGO_URI = process.env.MONGO_URI;

// اتصال به دیتابیس
const connectDB = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

connectDB();

const storage = new GridFsStorage({
  url: MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: Date.now() + "-" + file.originalname,
    };
  },
});

const upload = multer({ storage });

const handler = nextConnect();

handler.use(upload.single("file"));

handler.post(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.status(200).json({
    fileId: req.file.id,
    fileName: req.file.filename,
  });
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
