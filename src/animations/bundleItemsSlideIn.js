import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initBundleItemsSlideIn = () => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 992px)",
      isMobile: "(max-width: 991px)",
    },
    (context) => {
      const { isDesktop, isMobile } = context.conditions;

      // Select all bundle items in the product clothing section
      const bundleItems = gsap.utils.toArray(
        ".clothing-section-product .bundle-item-link"
      );

      if (isMobile) {
        bundleItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              x: index % 2 === 0 ? -120 : 120,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      } else if (isDesktop) {
        // Desktop: eerst links, dan midden, dan rechts (scroll-synced met vertraging)
        bundleItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              y: 120,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bundleItems[0],
                start: `top+=${index * 80} 80%`,
                end: `top+=${index * 80} 30%`,
                scrub: 1,
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      }
    }
  );

  // Cleanup function
  return () => {
    ScrollTrigger.getAll().forEach((trigger) => {
      const triggerElement = trigger.trigger;
      if (
        triggerElement?.matches?.(".clothing-section-product .bundle-item-link")
      ) {
        trigger.kill();
      }
    });
  };
};
