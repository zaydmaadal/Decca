import { useEffect } from "react";
import ScrollReveal from "../../shared/ScrollReveal/ScrollReveal";
import TagReveal from "../../shared/TagReveal/TagReveal";
import offBikeVideo from "../../../assets/videos/off-bike-video.mp4";
import { initClothingSlideIn } from "../../../animations/clothingSlideIn";

const ClothingSection = () => {
  useEffect(() => {
    const cleanup = initClothingSlideIn();
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  return (
    <div className="clothing-section">
      <OnBikeContent />
      <OffBikeContent />
    </div>
  );
};

// Sub-components
const OnBikeContent = () => (
  <>
    <div className="clothing-header-wrapper">
      <h2>
        <ScrollReveal
          baseOpacity={0.08}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          stagger={0.12}
          containerClassName="clothing-scroll-reveal"
        >
          For athletes seeking ready-to-wear performance, discover Decca's
          seasonal off-the-shelf essentials.
        </ScrollReveal>
      </h2>
      <TagReveal className="tag" rotation={10}>
        on bike
      </TagReveal>
    </div>

    <div className="clothing-items-wrapper">
      <ClothingArticle id="apparel" title="cycling apparel" />
      <ClothingArticle id="accessories" title="cycling accessories" />
    </div>
  </>
);

const OffBikeContent = () => (
  <>
    <div className="off-bike-header-wrapper">
      <TagReveal className="tag off-bike-tag" rotation={-10}>
        off-bike
      </TagReveal>
      <h2>
        <ScrollReveal
          baseOpacity={0.05}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          stagger={0.18}
          containerClassName="off-bike-scroll-reveal"
        >
          For moments beyond the ride, explore Decca's off-bike apparel—where
          comfort meets style for life on and off the road.
        </ScrollReveal>
      </h2>
    </div>
    <div className="off-bike-items-wrapper">
      <OffBikeHero />
    </div>
  </>
);

const ClothingArticle = ({ id, title }) => (
  <article id={id}>
    <div className="clothing-article-content">
      <span>shop</span>
      <h3>{title}</h3>
      <div className="clothing-links">
        {["men", "women", "kids"].map((gender) => (
          <a key={gender} href="/product">
            <ArrowIcon />
            Shop {gender}
          </a>
        ))}
      </div>
    </div>
  </article>
);

const OffBikeHero = () => (
  <article id="off-bike-hero">
    <div className="clothing-article-content off-bike-content">
      <span>shop</span>
      <h3>off-bike collection</h3>
      <div className="clothing-links">
        {["men", "women", "kids"].map((gender) => (
          <a key={gender} href="/product">
            <ArrowIcon />
            Shop {gender}
          </a>
        ))}
      </div>
    </div>
    <video autoPlay muted loop playsInline className="off-bike-video">
      <source src={offBikeVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </article>
);

const ArrowIcon = () => (
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
    />
  </svg>
);

export default ClothingSection;
