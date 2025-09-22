import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router'; //con el react-router no me funca
import Dashboard from './components/dashboard/dashboard';
import NotFound from './components/ui/notFound/NotFound';
import Login from './components/login/Login';
import MainLayout from './components/layout/MainLayout';
import PetDetails from './components/Pet/petDetails/PetDetails';
import Protected from './components/protected/Protected';
import Register from './components/register/Register';
import { ToastContainer } from 'react-toastify';

import GhibliMovies from './ej17del9/GhibliMovies';

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/pets/*" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

//function App() {
//  return <GhibliMovies />;
//}

export default App;
