import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initKitsSectionBlur = () => {
  const section = document.querySelector(".custom-kits-section");
  const overlay = section?.querySelector(".custom-kits-overlay");

  if (!section || !overlay) {
    return undefined;
  }

  // Ensure initial state
  gsap.set(overlay, {
    scaleY: 1,
    "--kits-overlay-blur": "8px",
    transformOrigin: "top",
  });

  const tween = gsap.to(overlay, {
    scaleY: 0,
    "--kits-overlay-blur": "0px",
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 98%",
      end: "top 88%",
      scrub: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
};
