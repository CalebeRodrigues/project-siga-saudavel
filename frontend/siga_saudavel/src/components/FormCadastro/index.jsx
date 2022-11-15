import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../services/api';

export const FormCadastro = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [nick, setNick] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const dataInput = useRef();

  const Cadastro = async (obj) => {
    await Api.post('user/register', {
      ...obj
    });

    alert("Usuario cadastrado com sucesso!");
    navigate('/login');
  }

  const handleClick = (e) => {
    e.preventDefault();

    const obj = {
      nome,
      nick,
      cpf,
      email,
      senha,
      dataNasc: dataInput.current.value
    }

    Cadastro(obj);
  };

  return (
    <>
      <span className="login-form-title">
        Seja Bem-Vindo
      </span>

      <div className="wrap-input margin-top-35 margin-bottom-35">
        <input
          className="input-form"
          type="text"
          autoComplete="off"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value) }
        />
      </div>

      <div className="wrap-input margin-top-35 margin-bottom-35">
        <input
          className="input-form"
          type="text"
          autoComplete="off"
          placeholder="Digite um nick"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />
      </div>

      <div className="wrap-input margin-top-35 margin-bottom-35">
        <input
          className="input-form"
          type="text"
          autoComplete="off"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>

      <div className="wrap-input margin-top-35 margin-bottom-35">
        <input
          className="input-form"
          type="text"
          autoComplete="off"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="wrap-input margin-bottom-35">
        <input
          className="input-form"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <div className="wrap-input margin-bottom-35">
        <input
          className="input-form"
          ref={dataInput}
          type="date"
        />
      </div>

      <div className="container-login-form-btn">
        <button className="login-form-btn" onClick={handleClick}>
          Cadastrar
        </button>
      </div>
    </>
  );
};
