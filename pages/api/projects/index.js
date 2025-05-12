// /pages/api/projects/index.js
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import multer from "multer";
import nextConnect from "next-connect";
import path from "path";

// تنظیمات Multer
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ایجاد مسیر برای مدیریت API با nextConnect
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ message: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  },
});

// تنظیمات CORS
apiRoute.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// مسیر برای آپلود فایل‌ها
apiRoute.use(
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "detailImages", maxCount: 3 },
  ])
);

// متد GET: دریافت پروژه‌ها
apiRoute.get(async (req, res) => {
  await connectDB();

  try {
    const projects = await Project.find({});
    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects", error });
  }
});

// متد POST: اضافه کردن پروژه جدید
apiRoute.post(async (req, res) => {
  await connectDB();
  const { title, shortDescription } = req.body;

  const thumbnail = req.files["thumbnail"]
    ? `/uploads/${req.files["thumbnail"][0].filename}`
    : "";

  const detailImages = req.files["detailImages"]
    ? req.files["detailImages"].map((file) => ({
        image: `/uploads/${file.filename}`,
        description: req.body[`description_${file.fieldname}`] || "",
      }))
    : [];

  try {
    const newProject = new Project({
      title,
      shortDescription,
      thumbnail,
      detailImages,
    });

    await newProject.save();
    res.status(201).json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Error adding project", error });
  }
});

export default apiRoute;
