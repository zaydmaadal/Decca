import { Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header/Header";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import "./styles/main.scss";

function App() {
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
