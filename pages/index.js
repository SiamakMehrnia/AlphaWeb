import Navbar from "../components/Navbar";
import Intro from "../components/Intro";
import Projects from "@/components/Projects";
import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Intro />
      <Projects />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
}
