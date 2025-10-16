import { useEffect, useRef } from "react";

import { initHeroBlurAnimation } from "../../animations/heroBlur";
import { initHeroRotateAnimation } from "../../animations/heroRotate";
import HeroSection from "../../components/product/HeroSection/HeroSection";

const Product = () => {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const ctaContainerRef = useRef(null);

  useEffect(() => {
    const cleanup = initHeroBlurAnimation(overlayRef.current);
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  useEffect(() => {
    const cleanup = initHeroRotateAnimation(logoRef.current);
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  return (
    <>
      <HeroSection overlayRef={overlayRef} logoRef={logoRef} />
    </>
  );
};

export default Product;
