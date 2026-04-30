const Footer = () => {
  return (
    <footer className="bg-white border-t py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Online Exam System. All rights reserved.
        </p>

        <p className="text-gray-500 text-sm mt-2 md:mt-0">
          Built by ❤️ Vishal Prajapati
        </p>
      </div>
    </footer>
  );
};

export default Footer;
