import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

import sectionSmallVideo from "../../../assets/videos/section-small-video.mp4";
import bunchRidesVideo from "../../../assets/videos/bunch-rides.mp4";
import corporateRidesVideo from "../../../assets/videos/corporate-rides.mp4";
import gravelEnduranceVideo from "../../../assets/videos/gravel-endurance.mp4";
import fastRidesImg from "../../../assets/images/fast-rides.png";
import socialRidesImg from "../../../assets/images/social-rides.png";

import { init3dPerspectiveHover } from "../../../animations/TiltedCard";

const ShopFooter = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const initialScaleApplied = useRef(false);

  useEffect(() => {
    const destroy = init3dPerspectiveHover();
    return () => {
      if (typeof destroy === "function") destroy();
    };
  }, []);

  const kitCards = [
    {
      type: "video",
      src: bunchRidesVideo,
      tags: ["durable", "quality"],
      title: "bunch rides",
    },
    {
      type: "image",
      src: fastRidesImg,
      tags: ["aero", "lightweight"],
      title: "fast rides",
    },
    {
      type: "image",
      src: socialRidesImg,
      tags: ["playful", "comfort"],
      title: "social rides",
    },
    {
      type: "video",
      src: corporateRidesVideo,
      tags: ["branded", "comfort"],
      title: "corporate rides",
    },
    {
      type: "video",
      src: gravelEnduranceVideo,
      tags: ["aero", "lightweight"],
      title: "gravel & endurance",
    },
  ];

  // Check of we op desktop zijn
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Scroll naar geselecteerde card
  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = 260 + 24; // Aangepaste card width
      const scrollPosition = index * cardWidth;

      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  // Navigatie functies
  const nextCard = () => {
    if (currentIndex < kitCards.length - 1) {
      scrollToCard(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  };

  // Handle card click - alleen op desktop
  const handleCardClick = (index) => {
    if (!isDesktop) return;

    if (activeCard === index) {
      setActiveCard(null);
    } else {
      setActiveCard(index);
    }
  };

  // Apply correct scales based on carousel position or desktop mode
  useEffect(() => {
    const container = scrollContainerRef.current;

    function applyScales() {
      if (!container) return;
      const cards = Array.from(
        container.querySelectorAll("[data-3d-hover-target]")
      );
      const isDesktopMode = window.innerWidth >= 1200;

      cards.forEach((card, idx) => {
        let targetScale = 1;

        if (!isDesktopMode) {
          const pos = idx - currentIndex;
          if (pos === 0) targetScale = 1;
          else if (Math.abs(pos) === 1) targetScale = 0.8;
          else targetScale = 0.7;
        } else {
          targetScale = 1;
        }

        // Voor de allereerste keer: set direct (geen animatie) om verkeerd startbeeld te voorkomen
        if (!initialScaleApplied.current) {
          gsap.set(card, { scale: targetScale });
        } else {
          gsap.to(card, {
            scale: targetScale,
            duration: 0.35,
            ease: "power3.out",
          });
        }

        // in carousel mode: verwijder hover-state voor niet-active kaarten
        if (!isDesktopMode) {
          if (!card.classList.contains("active"))
            card.classList.remove("is-hovering");
        }
      });

      // markeer dat we de initiële set gedaan hebben
      initialScaleApplied.current = true;
    }

    // run after next paint zodat DOM classes (active/adjacent/far) aanwezig zijn
    const rafId = requestAnimationFrame(applyScales);

    // recompute on resize
    window.addEventListener("resize", applyScales);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", applyScales);
    };
  }, [currentIndex, activeCard]);

  // Scroll event listener voor snap functionaliteit
  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      if (container && window.innerWidth < 1200) {
        const scrollLeft = container.scrollLeft;
        const cardWidth = 260 + 24; // Aangepaste card width
        const newIndex = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(Math.max(0, Math.min(newIndex, kitCards.length - 1)));
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [kitCards.length]);

  // Bepaal card class gebaseerd op positie
  const getCardClass = (index) => {
    if (window.innerWidth >= 1200) {
      return activeCard === index ? "active" : "";
    }

    const position = index - currentIndex;
    const absPosition = Math.abs(position);

    if (position === 0) return "active";
    if (absPosition === 1) return "adjacent";
    if (absPosition >= 2) return "far";
    return "";
  };

  return (
    <section
      className="custom-kits-section shop-footer-section"
      ref={sectionRef}
    >
      <div className="custom-kits-container">
        {/* Header Section */}
        <div className="custom-kits-header">
          <div className="custom-kits-text">
            <h2 className="custom-kits-title">
              We've got plenty in store for the overachiever, as we don't stop
              at cycling.
            </h2>
            <p className="custom-kits-description">
              At Decca we understand one thing leads to another, we also cater
              running and triathlon custom apparel!
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="custom-kits-cards-wrapper" ref={scrollContainerRef}>
          <div className="custom-kits-cards-scroll">
            {kitCards.map((card, index) => (
              <div
                data-3d-hover-target
                data-max-rotate="24"
                key={index}
                className={`custom-kits-card ${getCardClass(index)}`}
                onClick={() => handleCardClick(index)}
                style={{ cursor: isDesktop ? "pointer" : "default" }}
              >
                <div className="custom-kits-card-inner">
                  <div className="custom-kits-media" data-3d-layer-depth="2">
                    {card.type === "video" ? (
                      <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        loading="lazy"
                        preload="none"
                      >
                        <source src={card.src} type="video/mp4" />
                      </video>
                    ) : (
                      <img 
                        src={card.src} 
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div className="custom-kits-tags" data-3d-layer-depth="1">
                      {card.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`custom-kits-tag ${
                            tagIndex === 0 ? "pink" : "white"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="custom-kits-content" data-3d-layer-depth="2">
                    <span className="custom-kits-subtitle">
                      custom kits for
                    </span>
                    <h3 className="custom-kits-card-title">{card.title}</h3>

                    {/* Clothing links - always visible */}
                    <div className="clothing-links">
                      <a href="/product">
                        <svg
                          width="8"
                          height="6"
                          viewBox="0 0 8 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.33325 3L4.83325 0.5M7.33325 3L4.83325 5.5M7.33325 3L2.95825 3M0.666585 3L1.70825 3"
                            stroke="white"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        Shop men
                      </a>
                      <a href="/product">
                        <svg
                          width="8"
                          height="6"
                          viewBox="0 0 8 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.33325 3L4.83325 0.5M7.33325 3L4.83325 5.5M7.33325 3L2.95825 3M0.666585 3L1.70825 3"
                            stroke="white"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        Shop women
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="carousel-navigation">
          <button
            className="carousel-btn"
            onClick={prevCard}
            disabled={currentIndex === 0}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="carousel-btn"
            onClick={nextCard}
            disabled={currentIndex >= kitCards.length - 1}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopFooter;
