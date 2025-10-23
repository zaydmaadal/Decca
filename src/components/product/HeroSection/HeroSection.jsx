import heroVideo from "../../../assets/videos/hero-video-product.mp4";
import logoHeroOverlay from "../../../assets/images/logo-hero-overlay.svg";

const HeroSectionProduct = ({ overlayRef, logoRef }) => (
  <section className="hero-section hero-section-product">
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
          alt="Hero Logo"
          className="hero-logo"
          ref={logoRef}
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero-text">DECCA FOR BUNCH RIDERS</div>
      </div>
    </div>
  </section>
);

export default HeroSectionProduct;
