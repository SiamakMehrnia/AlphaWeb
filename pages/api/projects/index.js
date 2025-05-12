// /pages/api/projects/index.js
import connectDB from "@/lib/db";
import Project from "@/models/Project";

export default async function handler(req, res) {


  // Handle OPTIONS Request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  await connectDB();

  if (req.method === "GET") {
    try {
      const projects = await Project.find({});
      return res.status(200).json({ projects });
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res
        .status(500)
        .json({ message: "Error fetching projects", error });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, shortDescription, thumbnail, detailImages } = req.body;

      const newProject = new Project({
        title,
        shortDescription,
        thumbnail,
        detailImages,
      });

      await newProject.save();
      return res
        .status(201)
        .json({ message: "Project added successfully", project: newProject });
    } catch (error) {
      console.error("Error adding project:", error);
      return res.status(500).json({ message: "Error adding project", error });
    }
  }

  // اگر متدی غیر از GET یا POST ارسال شود:
  return res.status(405).json({ message: "Method not allowed" });
}
