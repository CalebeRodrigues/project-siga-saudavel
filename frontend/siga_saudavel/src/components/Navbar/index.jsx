import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/global.css';

import { useAuth } from '../../context/Auth/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClickLogout = () => {
    auth.logout();
    navigate('/login');
  }

  return (
    <header className="header">
      <a href="/" className="logo-text">Siga Saudável</a>

      <button style={{display: 'none'}} className="header__btnMenu"> <i className="fas fa-bars fa-2x"></i> <span className="sr-only">Menu</span></button>

      <nav className="header__nav">
        <ul>
          <li><a href="#feed">Postagens</a></li>
          <li><a href="#">Categorias</a></li>

          {
            auth.token ?
              <>
                <li><a style={{ cursor: 'pointer' }} onClick={handleClickLogout}>Sair</a></li>
                <li><Link to="/" style={{backgroundColor:'#1db309', color:'#ffff'}}>Olá, {auth.nick}</Link></li>
              </>
            :
              <li><Link to="/login" style={{backgroundColor:'#1db309', color:'#ffff'}}>Entrar</Link></li>

          }
        </ul>
      </nav>
    </header>
  );
}

