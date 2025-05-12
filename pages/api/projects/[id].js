// /pages/api/projects/[id].js
import connectDB from "@/lib/db";
import Project from "@/models/Project";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json({ project });
    } catch (error) {
      console.error("Error fetching project:", error);
      return res.status(500).json({ message: "Error fetching project", error });
    }
  }

  if (req.method === "PUT") {
    try {
      const { title, shortDescription, thumbnail, detailImages } = req.body;

      const updatedProject = await Project.findByIdAndUpdate(
        id,
        { title, shortDescription, thumbnail, detailImages },
        { new: true }
      );

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res
        .status(200)
        .json({
          message: "Project updated successfully",
          project: updatedProject,
        });
    } catch (error) {
      console.error("Error updating project:", error);
      return res.status(500).json({ message: "Error updating project", error });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedProject = await Project.findByIdAndDelete(id);

      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      return res.status(500).json({ message: "Error deleting project", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
