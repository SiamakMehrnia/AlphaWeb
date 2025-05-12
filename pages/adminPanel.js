import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://alphaweb1.netlify.app/api/projects";

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    thumbnail: "",
    detailImages: [
      { image: "", description: "" },
      { image: "", description: "" },
      { image: "", description: "" },
    ],
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.detailImages];
    updatedDetails[index][field] = value;
    setFormData({ ...formData, detailImages: updatedDetails });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${currentProject._id}`, formData);
      } else {
        await axios.post(`${API_URL}/add`, formData);
      }
      fetchProjects();
      setFormData({
        title: "",
        shortDescription: "",
        thumbnail: "",
        detailImages: [
          { image: "", description: "" },
          { image: "", description: "" },
          { image: "", description: "" },
        ],
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditMode(true);
    setCurrentProject(project);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      {/* Form */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl mb-4">{editMode ? "Edit Project" : "Add Project"}</h2>
        
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Project Title"
          className="bg-gray-700 p-2 mb-4 w-full rounded"
        />

        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleInputChange}
          placeholder="Short Description"
          className="bg-gray-700 p-2 mb-4 w-full rounded"
        />

        <input
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleInputChange}
          placeholder="Thumbnail URL"
          className="bg-gray-700 p-2 mb-4 w-full rounded"
        />

        <h3 className="text-lg mb-2">Detail Images</h3>
        {formData.detailImages.map((detail, index) => (
          <div key={index} className="mb-4">
            <input
              value={detail.image}
              onChange={(e) => handleDetailChange(index, "image", e.target.value)}
              placeholder={`Image URL ${index + 1}`}
              className="bg-gray-700 p-2 mb-2 w-full rounded"
            />
            <input
              value={detail.description}
              onChange={(e) => handleDetailChange(index, "description", e.target.value)}
              placeholder={`Description ${index + 1}`}
              className="bg-gray-700 p-2 mb-2 w-full rounded"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded"
        >
          {editMode ? "Update Project" : "Add Project"}
        </button>
      </div>

      {/* Projects */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project._id} className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-bold">{project.title}</h2>
            <p className="text-gray-400 mb-2">{project.shortDescription}</p>

            {project.detailImages.map((detail, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm text-gray-300">Image: {detail.image}</p>
                <p className="text-sm text-gray-300">Description: {detail.description}</p>
              </div>
            ))}

            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



