import { useRef } from "react";
import { useAuth } from "../../context/Auth/useAuth";
import { Api } from "../../services/api";

export const FormPublication = () => {
  const auth = useAuth();

  const tituloRef = useRef();
  const ingredienteRef = useRef();
  const descricaoRef = useRef();
  const conteudoRef = useRef();

  const PostPublication = async () => {
    try {
      await Api.post('/pub/create', {
        titulo: tituloRef.current.value,
        ingredientes: ingredienteRef.current.value,
        descricao: descricaoRef.current.value,
        conteudo: conteudoRef.current.value,
        IDUser: auth.token,
        IDCateg: '1%@2'
      });

      alert("Publicação feita com sucesso!");

      tituloRef.current.value = '';
      ingredienteRef.current.value = '';
      descricaoRef.current.value = '';
      conteudoRef.current.value = '';
    }
    catch {
      alert('Erro ao realizar publicação.');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    PostPublication();
  };

  return (
    <>
      <form className="login-form">
      <div className="wrap-input margin-top-35 margin-bottom-35">
        <input
          className="input-form"
          type="text"
          autoComplete="off"
          placeholder="Digite seu titulo"
          ref={tituloRef}
        />
      </div>

      <div className="wrap-input margin-top-35 margin-bottom-35">
        <input
          className="input-form"
          type="text"
          autoComplete="off"
          placeholder="Digite seus ingredientes"
          ref={ingredienteRef}
        />
      </div>

      <div className="wrap-input margin-top-35 margin-bottom-35">
        <input
          className="input-form"
          type="text"
          autoComplete="off"
          placeholder="Digite sua descrição"
          ref={descricaoRef}
        />
      </div>

      <div className="wrap-input margin-top-35 margin-bottom-35">
        <input
          className="input-form"
          type="text"
          autoComplete="off"
          placeholder="Digite o conteúdo"
          ref={conteudoRef}
        />
      </div>

      {/* <div className="wrap-input margin-bottom-35">
        <input
          className="input-form"
          type="password"
          placeholder="Digite sua senha"
        />
      </div> */}

      <div className="container-login-form-btn" style={{ marginBottom: '40px' }}>
        <button className="login-form-btn" onClick={handleClick}>
          Cadastrar
        </button>
      </div>
    </form>
    </>
  );
}
