import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Section with id "${sectionId}" not found`);
    }

    setIsOpen(false);
  };

  const menuItems = [
    { id: "home", name: "Home" },
    { id: "projects", name: "Projects" },
    { id: "about", name: "About Us" },
    { id: "contact", name: "Contact" },
  ];

  return (
    <nav className="bg-[#1f1f1f] text-white fixed w-full z-50 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto h-16 px-6">
        {/* Logo */}
        <motion.h1
          className="text-xl font-semibold bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 text-transparent bg-clip-text cursor-pointer"
          onClick={() => scrollToSection("home")}
          style={{ letterSpacing: "1px", fontWeight: 600 }}
        >
          AlphaWeb
        </motion.h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="text-lg cursor-pointer hover:text-gray-300 transition duration-300"
              onClick={() => scrollToSection(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden cursor-pointer p-2" onClick={toggleMenu}>
          {isOpen ? <X size={30} /> : <Menu size={34} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden bg-[#1f1f1f] text-white flex flex-col items-center overflow-hidden z-40"
          >
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="py-3 cursor-pointer hover:text-gray-300 transition duration-300 border-b border-gray-600 w-full text-center"
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
