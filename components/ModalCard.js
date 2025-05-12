import { motion } from "framer-motion";
import { useEffect } from "react";

const ModalCard = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  // جلوگیری از اسکرول `body` هنگام باز بودن `Modal`
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg w-full max-w-[900px] max-h-[90vh] overflow-y-auto text-white"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            X
          </button>
        </div>

        {/* Thumbnail */}
        <div className="mb-6">
          <img 
            src={project.thumbnail} 
            alt="Thumbnail" 
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
        </div>

        {/* Detail Images and Descriptions */}
        <div className="space-y-6">
          {project.detailImages.map((detail, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-4 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="w-full md:w-1/2">
                <img
                  src={detail.image}
                  alt={`Detail ${index + 1}`}
                  className="w-full h-56 object-cover rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 text-gray-300">
                <p className="text-lg">{detail.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ModalCard;