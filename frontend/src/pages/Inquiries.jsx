import React from 'react';
import './PageStyles.css';

const Inquiries = () => {
    return (
        <div className="page-container">
        <h1 className="page-title">Consultas</h1>
        <p className="page-subtitle">
            Si tenés alguna consulta, completá el formulario y te responderemos a la brevedad.
        </p>
        <form className="page-form">
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Escribí tu consulta..." required />
            <button type="submit" className="page-btn">Enviar Consulta</button>
        </form>
        </div>
    );
};

export default Inquiries;
