import { Link } from "react-router-dom";
import logoHeader from "../../../assets/images/Logo_header.svg";

const Header = () => (
  <header className="header">
    <div className="logo-container">
      <Link to="/" aria-label="Terug naar de startpagina">
        <img src={logoHeader} alt="Decca Logo" className="logo" />
      </Link>
    </div>
    <p className="tagline">
      Custom cycling kits for cycling enthusiasts & fanatics.
    </p>
  </header>
);

export default Header;
