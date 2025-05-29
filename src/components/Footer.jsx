import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Övre sektion */}
      <div class="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            DRONE
            <br />
            DELIGHTS
          </div>
          <div className="footer-quote">
            “Vi levererar mat snabbt och med stil, via drönare”
          </div>
        </div>
      </div>

      {/* Nedre sektion */}
      <div className="footer-bottom">
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
              <img src="/x-icon.png" alt="X" />
              <img src="/tiktok-icon.png" alt="TikTok" />
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          © 2025 Drone Delights. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
}
