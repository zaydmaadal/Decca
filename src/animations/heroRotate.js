import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initHeroRotateAnimation = (logoElement) => {
  if (!logoElement) {
    console.warn("heroRotate: No logo element provided");
    return () => {};
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Respect user preference: no rotation animation
    return () => {};
  }

  // Set up initial transform properties for smooth performance
  gsap.set(logoElement, {
    rotation: 0,
    transformOrigin: "center center",
    willChange: "transform",
    force3D: true,
  });

  // Add a small delay to ensure everything is ready
  let tween;

  requestAnimationFrame(() => {
    // Main rotation animation - starts immediately when page loads
    tween = gsap.to(logoElement, {
      rotation: 360,
      ease: "none",
      scrollTrigger: {
        id: "heroRotate",
        trigger: "body",
        start: "top top",
        end: "+=200%",
        scrub: 0.5,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Debug: check if animation is running
          // console.log("Rotation progress:", self.progress);
        },
      },
    });
  });

  return () => {
    // Cleanup
    if (tween) tween.kill();
    const st = ScrollTrigger.getById("heroRotate");
    if (st) st.kill();

    // Remove will-change to free up resources
    gsap.set(logoElement, {
      willChange: "auto",
    });
  };
};
