import { Link } from "react-router-dom";
import "./header.css";

const Header = () => (
  <header className="main-header">
    <nav>
      <ul className="nav-list">
        <li><Link to="/inquiries">Consultas</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/login">Iniciar sesión</Link></li>
        <li><Link to="/about-us">Sobre Nosotros</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;