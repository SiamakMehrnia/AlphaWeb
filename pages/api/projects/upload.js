import connectDB from "@/lib/db";
import Project from "@/models/Project";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { title, shortDescription, thumbnail, detailImages } = req.body;

  if (!title || !shortDescription || !thumbnail) {
    return res.status(400).json({ message: "Title, shortDescription, and thumbnail are required" });
  }

  try {
    const newProject = new Project({
      title,
      shortDescription,
      thumbnail,
      detailImages,
    });

    await newProject.save();
    return res.status(200).json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    console.error("Error saving project:", error);
    return res.status(500).json({ message: "Error saving project", error });
  }
};

export default handler;
