import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // آدرس API از ENV دریافت می‌شود
  const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`;

  // دریافت اطلاعات پروژه‌ها
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(baseURL);
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [baseURL]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl mb-8 text-center">Admin Page</h1>

      {loading ? (
        <p className="text-center">Loading projects...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover mb-2 rounded-lg"
                />
                <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                <p className="text-sm text-gray-400">
                  {project.shortDescription}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-center">No projects available.</p>
          )}
        </div>
      )}
    </div>
  );
}
