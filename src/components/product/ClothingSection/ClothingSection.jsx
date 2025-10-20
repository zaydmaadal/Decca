import logoHeaderClothing from "../../../assets/images/logo-header-product.png";

const ClothingSection = () => {
  const Header = () => (
    <div className="clothing-section-header">
      <p className="clothing-section-text">
        At Decca, we select only premium materials tailored to your ride, with
        our designers bringing style to every detail.
      </p>
      <div className="clothing-section-image">
        <img src={logoHeaderClothing} alt="Clothing Logo" />
      </div>
    </div>
  );

  return (
    <section className="clothing-section-product">
      <Header />
    </section>
  );
};
export default ClothingSection;
