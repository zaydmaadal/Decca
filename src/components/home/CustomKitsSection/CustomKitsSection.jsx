import { useRef, useEffect, useState } from "react";

import sectionSmallVideo from "../../../assets/videos/section-small-video.mp4";
import bunchRidesVideo from "../../../assets/videos/bunch-rides.mp4";
import corporateRidesVideo from "../../../assets/videos/corporate-rides.mp4";
import gravelEnduranceVideo from "../../../assets/videos/gravel-endurance.mp4";
import fastRidesImg from "../../../assets/images/fast-rides.png";
import socialRidesImg from "../../../assets/images/social-rides.png";

const CustomKitsSection = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

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
    <section className="custom-kits-section" ref={sectionRef}>
      <div className="custom-kits-container">
        {/* Video */}
        <div className="custom-kits-video d-none d-md-block">
          <video autoPlay muted loop playsInline>
            <source src={sectionSmallVideo} type="video/mp4" />
          </video>
        </div>

        {/* Header Section */}
        <div className="custom-kits-header">
          <div className="custom-kits-text">
            <h2 className="custom-kits-title">
              Custom kits that match your pace, purpose, and personality.
            </h2>
            <p className="custom-kits-description">
              Whether you're chasing watts, leading the local bunch, or spinning
              to the café, Decca's got you covered.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="custom-kits-cards-wrapper" ref={scrollContainerRef}>
          <div className="custom-kits-cards-scroll">
            {kitCards.map((card, index) => (
              <div
                key={index}
                className={`custom-kits-card ${getCardClass(index)}`}
                onClick={() => handleCardClick(index)}
                style={{ cursor: isDesktop ? "pointer" : "default" }}
              >
                <div className="custom-kits-card-inner">
                  <div className="custom-kits-media">
                    {card.type === "video" ? (
                      <video autoPlay muted loop playsInline>
                        <source src={card.src} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={card.src} alt={card.title} />
                    )}
                    <div className="custom-kits-tags">
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

                  <div className="custom-kits-content">
                    <span className="custom-kits-subtitle">
                      custom kits for
                    </span>
                    <h3 className="custom-kits-card-title">{card.title}</h3>

                    {/* Clothing links - alleen tonen in active state */}
                    {(activeCard === index ||
                      getCardClass(index) === "active") && (
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
                    )}
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

export default CustomKitsSection;
