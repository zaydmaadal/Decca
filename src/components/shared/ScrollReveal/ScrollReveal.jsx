import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 0,
  blurStrength = 4,
  stagger = 0.05,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "center center",
  wordAnimationEnd = "center center",
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const wordElements = el.querySelectorAll(".word");

    if (prefersReducedMotion) {
      gsap.set(wordElements, {
        opacity: 1,
        y: 0,
        filter: "none",
        clearProps: "all",
      });
      return;
    }

    const triggers = [];

    // Ensure initial state is applied so first scroll animates correctly
    gsap.set(wordElements, {
      opacity: baseOpacity,
      y: 14,
      ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
      willChange: "opacity, transform",
      force3D: true,
    });

    const commonTrigger = {
      trigger: el,
      scroller,
      start: "top+=20% bottom-=20%",
      end: wordAnimationEnd || "bottom top+=40%",
      scrub: 0.5,
      fastScrollEnd: true,
      anticipatePin: 0.5,
      invalidateOnRefresh: true,
    };

    const fadeUp = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, y: 14 },
      {
        ease: "power2.out",
        opacity: 1,
        y: 0,
        stagger: stagger,
        immediateRender: false,
      }
    );
    triggers.push(
      ScrollTrigger.create({ ...commonTrigger, animation: fadeUp })
    );

    if (enableBlur) {
      const blurAnim = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "power2.out",
          filter: "blur(0px)",
          stagger: stagger,
          immediateRender: false,
        }
      );
      triggers.push(
        ScrollTrigger.create({ ...commonTrigger, animation: blurAnim })
      );
    }

    // Refresh once after creation to fix first-scroll triggers (fonts/layout)
    requestAnimationFrame(() => {
      if (document && document.fonts && document.fonts.ready) {
        document.fonts.ready.finally(() => ScrollTrigger.refresh());
      } else {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    stagger,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
