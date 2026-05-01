import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box">
          <h2 className="footer-logo">EState</h2>
          <p className="footer-text">
            Find, buy, rent, and book your dream properties with ease. A modern
            real estate platform for users and agents.
          </p>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>

        <div className="footer-box">
          <h3>Contact</h3>

          <p>📍 India</p>

          <p>
            📧{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=vishal212121prajapati@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              vishal212121prajapati@gmail.com
            </a>
          </p>

          <p>
            📞 <a href="tel:+919518780609">+91 95187 80609</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} EState. All rights reserved.
      </div>
    </footer>
  );
}
