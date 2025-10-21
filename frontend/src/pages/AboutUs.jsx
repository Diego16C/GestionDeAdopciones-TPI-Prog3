import React from 'react';
import './PageStyles.css';

const AboutUs = () => {
    return (
        <div className="page-container">
        <h1 className="page-title">Sobre Nosotros</h1>
        <p className="page-subtitle">
            Somos un equipo dedicado a ayudar a los animales a encontrar un hogar responsable.
        </p>
        <p>
            Nuestro objetivo es conectar refugios con adoptantes de forma segura y rápida.
        </p>
        <p>
            Cada mascota tiene derecho a un hogar amoroso, y nosotros estamos para facilitar ese encuentro.
        </p>
        </div>
    );
};

export default AboutUs;
