import React from "react";

export const Footer = React.memo(() => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Library Management System. Built with ❤️ using MERN Stack</p>
    </footer>
  );
});

export default Footer;
