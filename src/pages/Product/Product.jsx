import { useEffect, useRef } from "react";

import { initHeroBlurAnimation } from "../../animations/heroBlur";
import { initHeroRotateAnimation } from "../../animations/heroRotate";
import HeroSection from "../../components/product/HeroSection/HeroSection";
import ClothingSection from "../../components/product/ClothingSection/ClothingSection";
import Footer from "../../components/product/Footer/Footer";

const Product = () => {
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

  useEffect(() => {
    if (step >= 2) return;
    const t = setTimeout(() => setStep((s) => s + 1), 120);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <>
      {step >= 0 && <HeroSection overlayRef={overlayRef} logoRef={logoRef} />}
      {step >= 1 && <ClothingSection ctaContainerRef={ctaContainerRef} />}
      {step >= 2 && <Footer ctaContainerRef={ctaContainerRef} />}
    </>
  );
};

export default Product;
