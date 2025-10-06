import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initClothingSlideIn = () => {
  // Check if we're on mobile (viewport width < 768px)
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      const { isDesktop, isMobile } = context.conditions;

      // Select all articles in clothing-items-wrapper
      const clothingArticles = gsap.utils.toArray(
        ".clothing-items-wrapper article"
      );

      clothingArticles.forEach((article, index) => {
        // Determine direction based on screen size and index
        let fromVars = {};

        if (isMobile) {
          // Mobile: all slide from bottom
          fromVars = {
            y: 100,
            opacity: 0,
          };
        } else {
          // Desktop: alternate left/right
          fromVars = {
            x: index % 2 === 0 ? -120 : 120,
            opacity: 0,
          };
        }

        // Create scroll-triggered animation
        gsap.fromTo(article, fromVars, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 80%",
            end: "top 30%",
            scrub: 1, // Sync with scroll (1 = 1 second delay for smoothness)
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Handle off-bike items wrapper
      const offBikeArticles = gsap.utils.toArray(
        ".off-bike-items-wrapper article"
      );

      offBikeArticles.forEach((article) => {
        gsap.fromTo(
          article,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: article,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }
  );

  // Cleanup function
  return () => {
    ScrollTrigger.getAll().forEach((trigger) => {
      const triggerElement = trigger.trigger;
      if (
        triggerElement?.matches?.(".clothing-items-wrapper article") ||
        triggerElement?.matches?.(".off-bike-items-wrapper article")
      ) {
        trigger.kill();
      }
    });
  };
};
