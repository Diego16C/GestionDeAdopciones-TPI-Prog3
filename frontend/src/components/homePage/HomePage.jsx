import React from 'react';
import { Link } from 'react-router';
import './HomePage.css';
import { useAuth } from '../../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="homepage-container">
      <div>
        <h1 className="homepage-title">Adoptá, cambiá una vida 🐾</h1>
        <p className="homepage-subtitle">
          Unite a nuestra comunidad y ayudá a darle un hogar a quien más lo
          necesita.
        </p>

        <p className="already-registered">
          {!user && (
            <>
              <Link to="/register" className="homepage-btn">
                Registrarse
              </Link>
              <br />

              <br />
              <Link to="/login" className="btn-login">
                Iniciar sesión
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to="/dashboard" className="btn-register">
                Ir a Mi Panel
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
