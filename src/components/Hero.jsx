// src/components/Hero.jsx
import "./Hero.css";

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url("/hero-bg.png")`, // Bilden ligger i public/
      }}
    >
      <div className="hero-text">
        <h1 className="hero-title">Drone-Delivered Delights</h1>
        <p className="hero-subtitle">Fast. Fresh. Flown to your door.</p>
      </div>
    </section>
  );
}
