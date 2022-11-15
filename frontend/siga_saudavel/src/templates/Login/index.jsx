import { useEffect } from 'react';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FormLogin } from '../../components/FormLogin';
import { useAuth } from '../../context/Auth/useAuth';
import { Api } from '../../services/api';
import loginImg from './login.png';
import './style.css';

import P from 'prop-types';
import { FormCadastro } from '../../components/FormCadastro';

export const Login = ({ isLogin = true }) => {

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            {
              isLogin ? <FormLogin /> : <FormCadastro />
            }
          </form>
        </div>
        <img src={loginImg} width="300" height="300" className="login-img-perfil margin-left-50" />
      </div>
    </div>
  );
}

Login.propTypes = {
  isLogin: P.bool
};
