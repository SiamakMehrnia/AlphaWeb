import { Phone, Mail, Linkedin, Github } from "lucide-react";
import { NeonGradientCard } from "./magicui/neon-gradient-card";

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-black py-24 px-6 lg:px-16 flex justify-center items-center "
    >
      <NeonGradientCard>
        <div className="bg-white text-gray-800 p-12 lg:p-16 rounded-xl shadow-lg w-full max-w-[800px] mx-auto flex flex-col gap-8 transition duration-300 hover:shadow-2xl hover:scale-105">
          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center text-gray-900 tracking-wide">
            Contact Us
          </h2>

          {/* Contact Info */}
          <div className="flex flex-col lg:flex-row gap-10 justify-between text-center lg:text-left">
            <div className="flex items-center gap-4">
              <Phone
                className="text-gray-600 hover:text-pink-500 transition duration-300"
                size={28}
              />
              <span className="text-lg">+123 456 7890</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail
                className="text-gray-600 hover:text-pink-500 transition duration-300"
                size={28}
              />
              <span className="text-lg">info@alphaweb.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start gap-8 mt-8">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin
                size={32}
                className="text-gray-600 hover:text-pink-500 transition duration-300 transform hover:scale-110"
              />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github
                size={32}
                className="text-gray-600 hover:text-pink-500 transition duration-300 transform hover:scale-110"
              />
            </a>
          </div>
        </div>
      </NeonGradientCard>
    </section>
  );
};

export default Contact;
