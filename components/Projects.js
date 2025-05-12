import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ModalCard from "./ModalCard";
import axios from "axios";

const Projects = () => {
  const containerRef = useRef(null);
  const innerContainerRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/projects`);
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Update Constraints for Scrolling
  useEffect(() => {
    const updateConstraints = () => {
      const container = containerRef.current;
      const innerContainer = innerContainerRef.current;

      if (container && innerContainer) {
        const containerWidth = container.offsetWidth;
        const innerWidth = innerContainer.scrollWidth;
        const maxScroll = innerWidth - containerWidth;

        setConstraints({
          left: -maxScroll,
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    return () => window.removeEventListener("resize", updateConstraints);
  }, [projects]);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className="h-screen bg-gradient-to-b from-[#1f1f1f] to-[#2e2e2e] flex justify-center items-center overflow-hidden "
    >
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-hidden cursor-grab pt-40 lg:px-16 pl-12"
      >
        <motion.div
          ref={innerContainerRef}
          className="flex gap-6 lg:gap-10 min-w-max"
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1}
        >
          {loading ? (
            <div className="text-white text-center w-full">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-white text-center w-full">
              No projects available
            </div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project._id}
                className="min-w-[250px] max-w-[300px] md:min-w-[280px] md:max-w-[320px] lg:min-w-[300px] lg:max-w-[340px] h-[450px] md:h-[500px] lg:h-[550px] bg-gradient-to-b from-[#3a3a3a] to-[#1f1f1f] rounded-xl shadow-lg p-4 lg:p-6 mx-2 md:mx-4 flex flex-col justify-between cursor-pointer hover:z-20 hover:scale-105 transition-transform duration-300"
                whileHover={{
                  y: -10,
                  boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.5)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 12,
                }}
                onClick={() => openModal(project)}
              >
                {/* Thumbnail */}
                {project.thumbnail ? (
                  <div className="w-full h-[75%] bg-gray-700 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      style={{
                        objectFit: "cover",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-[75%] bg-gray-600 rounded-lg flex justify-center items-center text-gray-300">
                    No Image
                  </div>
                )}

                {/* Project Title */}
                <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold text-white mt-2">
                  {project.title}
                </h2>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* ModalCard */}
      <ModalCard
        isOpen={!!selectedProject}
        onClose={closeModal}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
