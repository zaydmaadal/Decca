import { useEffect, useRef, useState } from "react";

import HeroSection from "../../components/home/HeroSection/HeroSection";
import CallToAction from "../../components/home/CallToAction/CallToAction";
import CustomKitsSection from "../../components/home/CustomKitsSection/CustomKitsSection";
import ClothingSection from "../../components/home/ClothingSection/ClothingSection";
import ShopFooter from "../../components/home/ShopFooter/ShopFooter";
import { initHeroBlurAnimation } from "../../animations/heroBlur";
import { initHeroRotateAnimation } from "../../animations/heroRotate";

const Home = () => {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const ctaContainerRef = useRef(null);
  const [step, setStep] = useState(0);

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

  // sequential mount: advance a step every 120ms until all are shown
  useEffect(() => {
    if (step >= 4) return;
    const t = setTimeout(() => setStep((s) => s + 1), 120);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <>
      {step >= 0 && <HeroSection overlayRef={overlayRef} logoRef={logoRef} />}
      {step >= 1 && <CallToAction ctaContainerRef={ctaContainerRef} />}
      {step >= 2 && <CustomKitsSection />}
      {step >= 3 && <ClothingSection />}
      {step >= 4 && <ShopFooter />}
    </>
  );
};

export default Home;
