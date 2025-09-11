import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Data from "./components/data/Data";
import Login from './components/login/Login';
import Register from './components/register/Register';

const Inquiries = () => <h2>Página de Consultas</h2>;
const Contact = () => <h2>Página de Contacto</h2>;
const AboutUs = () => <h2>Página Sobre Nosotros</h2>;


function App() {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  console.log("Usuario activo:", activeUser);
  
  return (
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Data  />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLogin={() => console.log("Usuario logueado")}/>} />
        <Route path="/register" element={<Register onRegister={(user) => console.log("Usuario registrado:", user)} />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      </Router>
  );
}

export default App
