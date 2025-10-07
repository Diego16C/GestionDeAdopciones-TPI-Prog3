import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import NotFound from './components/ui/notFound/NotFound';
import Login from './components/login/Login';
import MainLayout from './components/layout/MainLayout';
import PetDetails from './components/Pet/petDetails/PetDetails';
import Protected from './components/protected/Protected';
import Register from './components/register/Register';
import { ToastContainer } from 'react-toastify';
import Shelters from './components/shelter/Shelters';
import GhibliMovies from './ej17del9/GhibliMovies';

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/pets/*" element={<Dashboard />} />
            <Route path="/shelters" element={<Shelters />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
