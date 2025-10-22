import React from 'react';
import './PageStyles.css';

const Contact = () => {
    return (
        <div className="page-container">
        <h1 className="page-title">Contacto</h1>
        <p className="page-subtitle">Podés comunicarte con nosotros de las siguientes formas:</p>
        <div className="contact-info">
            <p>Email: <strong>contacto@adopciondeanimales.com</strong></p>
            <p>Teléfono: <strong>+54 9 11 1234-5678</strong></p>
        </div>
        </div>
    );
};

export default Contact;
