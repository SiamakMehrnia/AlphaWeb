import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Edit2, Trash2, CheckCircle, AlertTriangle } from "lucide-react";
import Cookies from "js-cookie";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [details, setDetails] = useState([
    { image: "", description: "" },
    { image: "", description: "" },
    { image: "", description: "" },
  ]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== "undefined" ? window.location.origin : "");

 

  // Fetch projects function to be used in multiple places
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/api/projects`);
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL]);

  const resetForm = () => {
    setTitle("");
    setShortDescription("");
    setThumbnail("");
    setDetails([
      { image: "", description: "" },
      { image: "", description: "" },
      { image: "", description: "" },
    ]);
    setIsEditing(false);
    setEditingProjectId(null);
  };

  const handleAddProject = async () => {
    try {
      const formattedDetails = details.filter(
        (item) => item.image.trim() !== ""
      );

      const payload = {
        title,
        shortDescription,
        thumbnail,
        detailImages: formattedDetails,
      };

      await axios.post(`${baseURL}/api/projects/upload`, payload);
      setNotification({
        type: "success",
        message: "✅ Project added successfully!",
      });
      resetForm();
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
      setNotification({ type: "error", message: "Error adding project" });
    }
  };

  const handleEditProject = async () => {
    try {
      const formattedDetails = details.filter(
        (item) => item.image.trim() !== ""
      );

      const payload = {
        title,
        shortDescription,
        thumbnail,
        detailImages: formattedDetails,
      };

      await axios.put(`/api/projects/${editingProjectId}`, payload);
      setNotification({
        type: "success",
        message: "✅ Project updated successfully!",
      });
      resetForm();
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      setNotification({ type: "error", message: "Error updating project" });
    }
  };

  const handleDelete = async (id) => {
    if (confirm("🛑 Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`${baseURL}/api/projects/${id}`);
        setNotification({
          type: "success",
          message: "✅ Project deleted successfully!",
        });
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        setNotification({ type: "error", message: "Error deleting project" });
      }
    }
  };

  const handleEditClick = (project) => {
    setTitle(project.title);
    setShortDescription(project.shortDescription);
    setThumbnail(project.thumbnail);
    setDetails(project.detailImages);
    setIsEditing(true);
    setEditingProjectId(project._id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl mb-8 text-center">🌟 Admin Panel</h1>

      {notification && (
        <div
          className={`${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          } p-4 mb-4 rounded-lg flex items-center gap-2`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={24} />
          ) : (
            <AlertTriangle size={24} />
          )}
          {notification.message}
        </div>
      )}

      <div className="flex justify-center mb-8">
        <button
          className="bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-700 transition"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form ❌" : "Add New Project ✨"}
        </button>
      </div>

      {showForm && (
        <motion.div
          className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl mb-4">
            {isEditing ? "Edit Project 🛠️" : "Add New Project 🚀"}
          </h2>

          <input
            type="text"
            placeholder="Project Title"
            className="bg-gray-700 p-3 rounded mb-4 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Short Description"
            className="bg-gray-700 p-3 rounded mb-4 w-full"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Thumbnail URL"
            className="bg-gray-700 p-3 rounded mb-4 w-full"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />

          <div className="space-y-4">
            {details.map((detail, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                <input
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  className="bg-gray-600 p-2 rounded mb-2 w-full"
                  value={detail.image}
                  onChange={(e) => {
                    const newDetails = [...details];
                    newDetails[index].image = e.target.value;
                    setDetails(newDetails);
                  }}
                />
                <textarea
                  placeholder={`Description ${index + 1}`}
                  className="bg-gray-600 p-2 rounded w-full"
                  value={detail.description}
                  onChange={(e) => {
                    const newDetails = [...details];
                    newDetails[index].description = e.target.value;
                    setDetails(newDetails);
                  }}
                />
              </div>
            ))}
          </div>

          <button
            className="bg-green-500 px-6 py-2 mt-4 rounded"
            onClick={isEditing ? handleEditProject : handleAddProject}
          >
            {isEditing ? "Update Project 🛠️" : "Submit"}
          </button>
        </motion.div>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg relative"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-48 object-cover mb-2 rounded-lg"
            />
            <h2 className="text-lg font-bold mb-2">{project.title}</h2>

            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEditClick(project)}
                className="bg-blue-500 p-2 rounded-full"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 p-2 rounded-full"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
