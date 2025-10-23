import { useRef } from "react";
import JerseyVideo from "../../../assets/videos/Jersey.mp4";
import ScrollReveal from "../../shared/ScrollReveal/ScrollReveal";

const Footer = () => {
  const ctaContainerRef = useRef(null);
  return (
    <section className="product-footer" ref={ctaContainerRef}>
      <div className="product-footer-container">
        <div className="product-footer-content">
          <header className="product-footer-header">
            <h2 className="product-footer-title">
              <ScrollReveal
                as="span"
                innerTag="span"
                baseOpacity={0.06}
                enableBlur={true}
                baseRotation={0}
                blurStrength={10}
                stagger={0.1}
              >
                How our designers get results for teams with multiple sponsors.
              </ScrollReveal>
            </h2>
            {/* Desktop text - shown only on 768px+ */}
            <div className="product-footer-text product-footer-text-desktop">
              <p>
                <ScrollReveal
                  as="span"
                  innerTag="span"
                  baseOpacity={0.06}
                  enableBlur={true}
                  baseRotation={0}
                  blurStrength={10}
                  stagger={0.1}
                >
                  Combine company names & company purpose in written form to
                  give it a cohesive look Group logo's for a daft looking design
                </ScrollReveal>
              </p>
            </div>
          </header>

          <div className="product-footer-video-wrapper">
            <video
              className="product-footer-video"
              src={JerseyVideo}
              autoPlay
              loop
              muted
              playsInline
              loading="lazy"
              preload="none"
            />
          </div>

          {/* Mobile text - shown only below 768px */}
          <div className="product-footer-text product-footer-text-mobile">
            <p>
              Combine company names & company purpose in written form to give it
              a cohesive look. Group logo's for a daft looking design
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
