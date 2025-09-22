import React from 'react';
import { Outlet } from 'react-router';
import Header from './header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
