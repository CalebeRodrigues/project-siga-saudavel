import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/Auth/AuthProvider';


import { Navbar } from './components/Navbar';
import { Home } from './templates/Home';
import { Login } from './templates/Login';

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Login isLogin={false} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
