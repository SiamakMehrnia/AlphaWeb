import connectDB from "@/lib/db";
import Project from "@/models/Project";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { title, shortDescription, thumbnail, detailImages } = req.body;

  try {
    const newProject = new Project({
      title,
      shortDescription,
      thumbnail,
      detailImages,
    });

    const savedProject = await newProject.save();
    res.status(201).json({ message: "Project added", project: savedProject });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Error adding project", error });
  }
}