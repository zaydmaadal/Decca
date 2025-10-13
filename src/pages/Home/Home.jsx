import { useEffect, useRef } from "react";

import HeroSection from "../../components/home/HeroSection/HeroSection";
import CallToAction from "../../components/home/CallToAction/CallToAction";
import CustomKitsSection from "../../components/home/CustomKitsSection/CustomKitsSection";
import { initHeroBlurAnimation } from "../../animations/heroBlur";
import { initHeroRotateAnimation } from "../../animations/heroRotate";

const Home = () => {
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
      <CallToAction ctaContainerRef={ctaContainerRef} />
      <CustomKitsSection />
    </>
  );
};

export default Home;
