import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TagReveal = ({ children, className = "" }) => {
  const tagRef = useRef(null);

  useEffect(() => {
    const el = tagRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Force initial hidden state FIRST
    gsap.set(el, { opacity: 0, y: 18, scale: 0.94 });

    const animation = gsap.fromTo(
      el,
      { opacity: 0, y: 18, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
    );

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom-=45%", // Reveal when element is 30% into viewport
      end: "bottom bottom-=40%", // Reverse when element completely exits viewport
      toggleActions: "play none none reverse",
      fastScrollEnd: true,
      anticipatePin: 0.3,
      invalidateOnRefresh: true,
      animation,
      markers: false, // Remove debug markers
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <span ref={tagRef} className={className}>
      {children}
    </span>
  );
};

export default TagReveal;
