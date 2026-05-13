export default function Footer({ visible = true }) {
  if (!visible) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} Joydeep Sen. All rights reserved. Developed with ?? by Joydeep
        </p>

        <div className="footer-links">
          <a className="footer-link" href="https://github.com/Joyyojpeed" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            className="footer-link"
            href="https://www.linkedin.com/in/joydeep-sen-518a38232/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a className="footer-link" href="mailto:jds472016@gmail.com">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
