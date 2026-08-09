import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-layout-body">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
