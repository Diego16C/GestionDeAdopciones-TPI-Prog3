import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';

import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './components/protected/Protected.jsx';
import MainLayout from './components/layout/MainLayout.jsx';

import HomePage from './components/homePage/HomePage.jsx';
import DashboardClient from './components/dashboard/dashboardUsers/DashboardClient.jsx';
import DashboardWorker from './components/dashboard/dashboardUsers/DashboardWorker.jsx';
import DashboardABMpets from './components/dashboard/DashboardABMpets.jsx';
import DashboardAdoptionClient from './components/dashboard/DashboardAdoptionClient.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import NotFound from './components/ui/notFound/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/client"
            element={
              <ProtectedRoute roles={['client']}>
                <DashboardClient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adopt/*"
            element={
              <ProtectedRoute roles={['client']}>
                <DashboardAdoptionClient />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker"
            element={
              <ProtectedRoute roles={['worker', 'admin']}>
                <DashboardWorker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets/*"
            element={
              <ProtectedRoute roles={['worker', 'admin']}>
                <DashboardABMpets />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
