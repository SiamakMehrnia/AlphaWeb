const Footer = () => {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-6 lg:px-16 text-center text-gray-500">
        © {new Date().getFullYear()} AlphaWeb. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;