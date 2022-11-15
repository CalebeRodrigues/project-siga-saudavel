import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/Auth/AuthProvider';


import { Navbar } from './components/Navbar';
import { Home } from './templates/Home';
import { Login } from './templates/Login';
import { MeuPerfil } from './templates/MeuPerfil';

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Login isLogin={false} />} />
          <Route path='/meuperfil' element={<MeuPerfil />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
