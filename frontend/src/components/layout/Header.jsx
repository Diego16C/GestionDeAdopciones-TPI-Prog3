import React from 'react';
import { Link } from 'react-router';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-top">
        <h1 style={{ fontSize: '40px' }}>
          {' '}
          <FontAwesomeIcon icon={faPaw} /> Adopción de Animales
        </h1>
        <div className="auth-buttons">
          {!user && (
            <>
              <Link to="/login" className="btn-login">
                Iniciar sesión
              </Link>
              <Link to="/register" className="btn-register">
                Registrarse
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to="/dashboard" className="btn-register">
                Mi Panel
              </Link>

              <Button className="me-3" variant="dark" onClick={logout}>
                Cerrar sesión
              </Button>
            </>
          )}
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
};

export default Header;
