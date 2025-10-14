import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import Header from "./components/shared/Header/Header";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import "./styles/main.scss";

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    // Lenis animation frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
