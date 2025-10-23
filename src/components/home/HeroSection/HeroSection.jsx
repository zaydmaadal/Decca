import heroVideo from "../../../assets/videos/hero-video.mp4";
import logoHeroOverlay from "../../../assets/images/logo-hero-overlay.svg";

const HeroSection = ({ overlayRef, logoRef }) => {
  return (
    <section className="hero-section">
      <div className="video-container">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
          preload="auto"
          fetchpriority="high"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay" ref={overlayRef}>
          <img
            src={logoHeroOverlay}
            alt="Decca Logo"
            className="hero-logo"
            ref={logoRef}
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
