import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/useAuth";

export const FormLogin = () => {
  const navigate = useNavigate();

  // Define se será um Login(true) ou Cadastro(False)
  const [optionLogin, setOptionLogin] = useState(true);

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  const [msgErro, setMsgErro] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    if(msgErro) navigate('/');
  }, [msgErro])

  const Login = async (email, senha) => {
    return await auth.authenticate(email, senha);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const bool = await Login(email, senha);

    setSenha('');

    bool ? navigate('/') : '';
  }

  return (
    <>
      <span className="login-form-title">
        Acesse sua Conta
      </span>

      <div className="wrap-input margin-top-35 margin-bottom-35">
        <input
          className="input-form"
          type="text"
          name="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
        />
      </div>

      <div className="wrap-input margin-bottom-35">
        <input
          className="input-form"
          type="password"
          name="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />
      </div>

      <div className="container-login-form-btn">
        <button className="login-form-btn" onClick={handleClick}>
          Login
        </button>
      </div>

      <ul className="login-utils">

        <li>
          <span className="text1">
            Não tem conta? <Link to='/cadastro' className='text2'>Clique aqui</Link>
          </span>
        </li>
      </ul>
    </>
  );
}
