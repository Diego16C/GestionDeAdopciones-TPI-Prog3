import React from 'react';
import { Link } from 'react-router';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div>
        <h1 className="homepage-title">Adoptá, cambiá una vida 🐾</h1>
        <p className="homepage-subtitle">
          Unite a nuestra comunidad y ayudá a darle un hogar a quien más lo necesita.
        </p>

        <Link to="/register" className="homepage-btn">
          Registrarse
        </Link>

        <p className="already-registered">
          ¿Ya estás registrado?{' '}
          <Link to="/login" className="link-login">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
