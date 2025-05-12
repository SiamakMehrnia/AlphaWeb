import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://alphaweb1.netlify.app/api/projects";

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    thumbnail: null,
    detailImages: [
      { image: null, description: "" },
      { image: null, description: "" },
      { image: null, description: "" },
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.detailImages];
    if (field === "image") {
      updatedDetails[index][field] = value.target.files[0];
    } else {
      updatedDetails[index][field] = value;
    }
    setFormData({ ...formData, detailImages: updatedDetails });
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("shortDescription", formData.shortDescription);
    
    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }

    formData.detailImages.forEach((detail, index) => {
      if (detail.image) {
        data.append(`detailImages[${index}][image]`, detail.image);
      }
      data.append(`detailImages[${index}][description]`, detail.description);
    });

    try {
      if (editMode) {
        await axios.put(`${API_URL}/${currentProject._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/add`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchProjects();
      setEditMode(false);
      resetForm();
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      shortDescription: "",
      thumbnail: null,
      detailImages: [
        { image: null, description: "" },
        { image: null, description: "" },
        { image: null, description: "" },
      ],
    });
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      shortDescription: project.shortDescription,
      thumbnail: null,
      detailImages: project.detailImages.map((d) => ({
        image: null,
        description: d.description,
      })),
    });
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
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Panel</h1>

      {/* Form */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
        <h2 className="text-2xl mb-4 font-semibold">
          {editMode ? "Edit Project" : "Add Project"}
        </h2>

        <div className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Project Title"
            className="bg-gray-700 p-3 rounded w-full mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            placeholder="Short Description"
            className="bg-gray-700 p-3 rounded w-full mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            className="bg-gray-700 p-2 mb-4 w-full text-white"
          />

          <h3 className="text-lg mb-2">Detail Images</h3>
          {formData.detailImages.map((detail, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded mb-4">
              <input
                type="file"
                onChange={(e) => handleDetailChange(index, "image", e)}
                className="bg-gray-600 p-2 mb-2 w-full rounded text-white"
              />
              <input
                placeholder={`Description ${index + 1}`}
                value={detail.description}
                onChange={(e) => handleDetailChange(index, "description", e.target.value)}
                className="bg-gray-600 p-2 mb-2 w-full rounded text-white"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 px-4 py-2 mt-4 rounded hover:bg-blue-700 transition"
        >
          {editMode ? "Update Project" : "Add Project"}
        </button>
      </div>

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
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-600 px-3 py-1 rounded"
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







