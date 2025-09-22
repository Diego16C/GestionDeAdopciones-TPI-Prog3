import React from 'react';
import { Link } from 'react-router';
import './header.css';

const Header = () => (
  <header className="header">
    <div className="header-top">
      <h1>Adopción de Animales</h1>
      <div className="auth-buttons">
        <Link to="/login" className="btn-login">
          Iniciar sesión
        </Link>
        <Link to="/register" className="btn-register">
          Registrarse
        </Link>
      </div>
    </div>

    <nav className="main-nav">
      <div className="nav-list">
        <ul>
          <li>
            <Link to="/inquiries">Consultas</Link>
          </li>
          <li>
            <Link to="/contact">Contacto</Link>
          </li>
          <li>
            <Link to="/about-us">Sobre Nosotros</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
