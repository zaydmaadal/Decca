import { Link } from "react-router-dom";
import logoHeader from "../../../assets/images/logo-header.svg";

const Header = () => (
  <header className="header container-fluid px-3 px-md-4 px-lg-5 text-center">
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8 col-xl-6">
        {/* Bootstrap spacing ipv custom margin */}
        <div className="logo-container mb-3 mb-md-4">
          <Link
            to="/"
            aria-label="Terug naar de startpagina"
            className="d-block"
          >
            <img
              src={logoHeader}
              alt="Decca Logo"
              className="logo img-fluid" // Bootstrap img-fluid
            />
          </Link>
        </div>

        {/* Bootstrap text utilities ipv custom CSS */}
        <p className="tagline text-center mb-0">
          Custom cycling kits for cycling enthusiasts & fanatics.
        </p>
      </div>
    </div>
  </header>
);

export default Header;
