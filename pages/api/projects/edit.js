import connectDB from "@/lib/db";
import Project from "@/models/Project";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Only PUT requests are allowed" });
  }

  const { token, projectId, title, shortDescription, thumbnail, detailImages } = req.body;

  console.log("Request Body:", req.body);

  if (!token || !projectId) {
    return res.status(400).json({ message: "Token and Project ID are required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // تبدیل projectId به ObjectId
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(projectId);
      console.log("Converted ObjectId:", objectId);
    } catch (err) {
      console.error("Invalid ObjectId:", err);
      return res.status(400).json({ message: "Invalid projectId" });
    }

    console.log("Updating Project...");

    const updatedProject = await Project.findByIdAndUpdate(
      objectId,
      {
        title,
        shortDescription,
        thumbnail,
        detailImages,
      },
      { new: true }
    );

    if (!updatedProject) {
      console.log("Project not found.");
      return res.status(404).json({ message: "Project not found" });
    }

    console.log("Updated Project:", updatedProject);

    res.status(200).json({ message: "Project updated successfully", project: updatedProject });

  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
}