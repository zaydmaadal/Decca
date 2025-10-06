import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initHeroBlurAnimation = (overlayElement) => {
  if (!overlayElement) return () => {};

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Subtle but clearly visible starting blur
  const initialBlur = 8; // px
  const finalBlur = 0; // fully sharp
  overlayElement.style.setProperty("--hero-blur", `${initialBlur}px`);

  if (prefersReducedMotion) {
    // Respect user preference: keep static subtle blur
    return () => {};
  }

  const tween = gsap.to(overlayElement, {
    duration: 1,
    ease: "none",
    onUpdate: function () {
      const progress = this.progress();
      const current = initialBlur + (finalBlur - initialBlur) * progress;
      overlayElement.style.setProperty("--hero-blur", `${current}px`);
    },
    scrollTrigger: {
      id: "heroBlur",
      trigger: ".hero-section",
      start: "top top",
      end: "+=8%",
      scrub: 0.2,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
    },
  });

  return () => {
    if (tween) tween.kill();
    const st = ScrollTrigger.getById("heroBlur");
    if (st) st.kill();
  };
};
