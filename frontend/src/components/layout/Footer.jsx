import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faPaw,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section contact-info">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22523.0809279757!2d-60.63901711578329!3d-32.94900251644848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab16004baa87%3A0xce318d7967c8cf6e!2sShopping%20del%20Siglo!5e0!3m2!1sen!2sar!4v1747921382643!5m2!1sen!2sar"
          width="150"
          height="150"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación"
        ></iframe>
        <p>
          <FontAwesomeIcon icon={faPaw} />
          Adopcion de Animales
        </p>
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Shopping del Siglo 1851,
          Rosario, Santa Fe
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} />{' '}
          quieroaprobarprogramacion3@gmail.com
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> 4851242
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> (0341) 640-2289
        </p>
      </div>

      <div className="footer-section quick-access">
        <h3>Acceso Rápido</h3>
        <ul>
          <li>
            <a href="index.html">Inicio</a>
          </li>
          <li>
            <a href="productos.html">Productos</a>
          </li>
          <li>
            <a href="formulario.html">Consultas</a>
          </li>
          <li>
            <a href="contacto.html">Contacto</a>
          </li>
          <li>
            <a href="sobre-nosotros.html">Sobre Nosotros</a>
          </li>
        </ul>
      </div>

      <div className="footer-section hours-of-operation">
        <h3>Horarios De Atención</h3>
        <table>
          <tbody>
            <tr>
              <td>Lunes - Viernes</td>
              <td className="purple-text">
                9:00am - 12:30pm | 16:30pm - 20:00pm
              </td>
            </tr>
            <tr>
              <td>Sabado</td>
              <td className="purple-text">
                9:00am - 13:00pm | 17:00pm - 19:00pm
              </td>
            </tr>
            <tr>
              <td>Domingo</td>
              <td className="red-text">Cerrado</td>
            </tr>
            <tr>
              <td>Urgencias 24hs</td>
              <td className="purple-text">(0341) 640-2289</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
