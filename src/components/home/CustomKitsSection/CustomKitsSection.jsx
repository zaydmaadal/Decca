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

  // Scroll naar geselecteerde card
  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = 280 + 24; // card width + gap
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

  // Scroll event listener voor snap functionaliteit
  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      if (container && window.innerWidth < 1200) {
        const scrollLeft = container.scrollLeft;
        const cardWidth = 280 + 24; // card width + gap
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
    if (window.innerWidth >= 1200) return ""; // Geen speciale classes voor desktop

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
        {/* Header Section */}
        <div className="custom-kits-header">
          <div className="custom-kits-text">
            <h2 className="custom-kits-title">
              Custom kits that match
              <br />
              your pace, purpose, and personality.
            </h2>
            <p className="custom-kits-description">
              Whether you're chasing watts, leading the local bunch,
              <br className="d-none d-md-block" />
              or spinning to the café, Decca's got you covered.
            </p>
          </div>

          {/* Video - hidden on mobile, visible on tablet+ */}
          <div className="custom-kits-video d-none d-md-block">
            <video autoPlay muted loop playsInline>
              <source src={sectionSmallVideo} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Cards Section - Carousel voor tablet en kleiner */}
        <div className="custom-kits-cards-wrapper" ref={scrollContainerRef}>
          <div className="custom-kits-cards-scroll">
            {kitCards.map((card, index) => (
              <div
                key={index}
                className={`custom-kits-card ${getCardClass(index)}`}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation - alleen voor tablet en kleiner */}
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
