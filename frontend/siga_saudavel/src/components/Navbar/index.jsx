import '../../assets/css/global.css';

import { useAuth } from '../../context/Auth/useAuth';

export const Navbar = () => {

  const auth = useAuth();

  return (
    <header className="header">
      <a href="/" className="logo-text">Rota Saudável</a>

      <button style={{display: 'none'}} className="header__btnMenu"> <i className="fas fa-bars fa-2x"></i> <span className="sr-only">Menu</span></button>

      <nav className="header__nav">
        <ul>
          <li><a href="#feed">Postagens</a></li>
          <li><a href="#">Categorias</a></li>

          {
            auth.token ?
              <li><a href="../Formulario_Login-main/Login.html" style={{backgroundColor:'#1db309', color:'#ffff'}}>Calebe</a></li>
            :
              <li><a href="../Formulario_Login-main/Login.html" style={{backgroundColor:'#1db309', color:'#ffff'}}>Entrar</a></li>

          }
        </ul>
      </nav>
    </header>
  );
}

