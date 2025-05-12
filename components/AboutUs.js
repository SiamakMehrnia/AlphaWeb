import { motion } from "framer-motion";
import { Globe } from "./magicui/globe";

const AboutUs = () => {
  return (
    <section id="about" className="h-screen bg-black flex justify-center items-center px-6 lg:px-16 py-10">
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-12 relative z-10">
        
        {/* Title */}
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          About Us
        </motion.h2>

        {/* Globe */}
        <motion.div
          className="w-full h-[250px] lg:h-[350px] flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Globe />
        </motion.div>

        {/* Content */}
        <motion.div
          className="bg-[#1a1a1a] p-6 lg:p-10 rounded-lg shadow-lg max-w-full lg:max-w-[800px] text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            We are a creative team specializing in modern and dynamic web
            development. Our mission is to build high-quality websites with a
            focus on user experience and modern design.
          </p>
          <p className="text-gray-300 leading-relaxed">
            From small startups to large enterprises, we provide custom
            solutions that align with your brand and business goals.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
