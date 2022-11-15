import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/Auth/AuthProvider';


import { Navbar } from './components/Navbar';
import { Home } from './templates/Home';

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
