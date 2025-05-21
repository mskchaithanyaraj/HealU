import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} HealU. All rights reserved.</p>
        <div className="footer-divider"></div>
        <p>
          Knowledge and guidance provided by
          <a
            href="https://www.nin.res.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NIN - ICMR
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
