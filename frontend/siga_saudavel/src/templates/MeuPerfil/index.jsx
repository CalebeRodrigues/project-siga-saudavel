import { useAuth } from "../../context/Auth/useAuth";

export const MeuPerfil = () => {
  const auth = useAuth();

  return (
    <>
      <div>
        <br /><br /><br /><br /><br />
        <h1>Meu perfil ({auth.nome})</h1>
      </div>
    </>
  )
};
