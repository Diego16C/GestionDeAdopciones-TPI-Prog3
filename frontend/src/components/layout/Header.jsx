import React from 'react';
import { Link } from 'react-router';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <header className="header">
    <div className="header-top">
      <h1 style={{ fontSize: '40px' }}>
        <FontAwesomeIcon icon={faPaw} /> Adopción de Animales
      </h1>
    </div>

    <nav className="main-nav">
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
    </nav>
  </header>
);

export default Header;
