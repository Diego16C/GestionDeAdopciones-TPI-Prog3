import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/ui/notFound/NotFound';
import Login from './components/login/Login';
import MainLayout from './components/layout/MainLayout';
import PetDetails from './components/Pet/petDetails/PetDetails';
import Register from './components/register/Register';
import { ToastContainer } from 'react-toastify';
import NewShelters from './components/shelter/newShelters/NewShelters';
import SheltersPage from './components/shelter/sheltersPage/SheltersPage';

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/pets/*" element={<Dashboard />} />
            <Route path="/shelters" element={<SheltersPage />} />
            <Route path='/shelters/:id' element={<PetDetails />} />
            <Route path="/new-shelter" element={<NewShelters />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

