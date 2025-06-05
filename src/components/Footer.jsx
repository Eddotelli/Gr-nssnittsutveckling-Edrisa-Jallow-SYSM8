import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Upper section */}
      <section className="footer-top">
        <div className="footer-logo" aria-label="Drone Delights logo">
          DRONE
          <br />
          DELIGHTS
        </div>
        <div className="footer-quote">
          “We deliver food quickly and in style, via drones”
        </div>
      </section>

      {/* Lower section */}
      <section className="footer-bottom" aria-label="Footer links">
        <div className="footer-links">
          <div className="footer-section">
            <h3>About us</h3>
            <p>About us</p>
            <p>Contact us</p>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <p>FAQ</p>
            <p>Customer Service</p>
          </div>
          <div className="footer-section">
            <h3>Follow us</h3>
            <div className="social-icons">
              <img src="/instagram-icon.png" alt="Instagram" />
              <img src="/x-icon.png" alt="X (formerly Twitter)" />
              <img src="/tiktok-icon.png" alt="TikTok" />
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          © 2025 Drone Delights. All rights reserved.
        </div>
      </section>
    </footer>
  );
}
