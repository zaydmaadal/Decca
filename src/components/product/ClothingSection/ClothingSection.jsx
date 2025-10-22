import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "../../shared/ScrollReveal/ScrollReveal";
import TagReveal from "../../shared/TagReveal/TagReveal";
import VariableProximity from "../../shared/VariableProximity/VariableProximity";

import JerseyVideo from "../../../assets/videos/Jersey.mp4";
import BibsVideo from "../../../assets/videos/Bibs.mp4";
import SocksVideo from "../../../assets/videos/Socks.mp4";
import { initBundleItemsSlideIn } from "../../../animations/bundleItemsSlideIn";

const ClothingSection = ({ ctaContainerRef }) => {
  useEffect(() => {
    const cleanup = initBundleItemsSlideIn();
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  const headerVideoRef = useRef(null);

  const Header = () => {
    // Slide-in animatie voor video
    useEffect(() => {
      const el = headerVideoRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === el) trigger.kill();
        });
      };
    }, []);

    return (
      <header className="clothing-section-header mb-4 mb-md-5">
        <h2>
          <ScrollReveal
            baseOpacity={0.05}
            enableBlur={true}
            baseRotation={0}
            blurStrength={12}
            stagger={0.2}
            containerClassName="clothing-section-text"
          >
            At Decca, we select only premium materials tailored to your ride,
            with our designers bringing style to every detail.
          </ScrollReveal>
        </h2>

        <div className="clothing-section-image">
          <video
            ref={headerVideoRef}
            src={JerseyVideo}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </header>
    );
  };

  const summerItems = [
    {
      id: 1,
      title: "Jersey",
      subtitle: "A-grade breathable material",
      video: JerseyVideo,
    },
    {
      id: 2,
      title: "Bibs",
      subtitle: "Supportive 4 seasons chamois",
      video: BibsVideo,
    },
    {
      id: 3,
      title: "Socks",
      subtitle: "Aero high-end built",
      video: SocksVideo,
    },
  ];

  const Summer = () => (
    <>
      <div className="clothing-header-wrapper mb-4 mb-md-5">
        <ScrollReveal
          baseOpacity={0.08}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          stagger={0.12}
          containerClassName="clothing-scroll-reveal"
        >
          our bundle selection for bunch riders.
        </ScrollReveal>
        <TagReveal className="tag" rotation={10}>
          summer
        </TagReveal>
      </div>
      <div className="container-fluid px-3 px-md-4">
        <div className="row g-3 g-md-4">
          {summerItems.map((item) => (
            <div key={item.id} className="col-12 col-lg-4 d-flex">
              <a href="#" className="bundle-item-link flex-fill">
                <article className="bundle-item flex-fill">
                  <video
                    className="bundle-item-video"
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      left: 0,
                      top: 0,
                    }}
                  />
                  <div className="bundle-item-content-overlay">
                    <h3 className="bundle-item-title">{item.title}</h3>
                    <p className="bundle-item-subtitle">{item.subtitle}</p>
                  </div>
                </article>
              </a>
            </div>
          ))}
        </div>
        <div className="row mt-4 mt-md-5">
          <div className="col-12 text-center">
            <a href="/" className="call-to-action-link">
              <VariableProximity
                label="Discover the full spec sheet"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={ctaContainerRef}
                radius={120}
                falloff="exponential"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );

  const Winter = () => (
    <>
      <div className="clothing-header-wrapper clothing-header-wrapper-winter mb-4 mb-md-5">
        <ScrollReveal
          baseOpacity={0.08}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          stagger={0.12}
          containerClassName="clothing-scroll-reveal"
        >
          complementary winter bundles.
        </ScrollReveal>
        <TagReveal className="tag tag-winter" rotation={-10}>
          winter
        </TagReveal>
      </div>
      <div className="container-fluid px-3 px-md-4">
        <div className="row g-3 g-md-4">
          {summerItems.map((item) => (
            <div key={item.id} className="col-12 col-lg-4 d-flex">
              <a href="#" className="bundle-item-link flex-fill">
                <article className="bundle-item flex-fill">
                  <video
                    className="bundle-item-video"
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      left: 0,
                      top: 0,
                    }}
                  />
                  <div className="bundle-item-content-overlay">
                    <h3 className="bundle-item-title">{item.title}</h3>
                    <p className="bundle-item-subtitle">{item.subtitle}</p>
                  </div>
                </article>
              </a>
            </div>
          ))}
        </div>
        <div className="row mt-4 mt-md-5">
          <div className="col-12 text-center">
            <a href="/" className="call-to-action-link">
              <VariableProximity
                label="Discover the full spec sheet"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={ctaContainerRef}
                radius={120}
                falloff="exponential"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section
      className="clothing-section-product py-4 py-md-5"
      ref={ctaContainerRef}
    >
      <Header />
      <Summer />
      <Winter />
    </section>
  );
};
export default ClothingSection;
