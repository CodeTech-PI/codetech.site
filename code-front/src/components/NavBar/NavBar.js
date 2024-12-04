import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogoClick = () => {
    navigate('/');
  }

  const handleLoginClick = () => {
    navigate('/login');
  };
  
  const handleGuerreirasClick = () => {
    navigate('/guerreiras');
  };

  const download = () => {
    const link = document.createElement('a');
    link.href = '/anamnese/anamnese.pdf'; 
    link.download = 'anamnese.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <section>
      <nav className='nav-bar'>
        <img
          className='img-logo'
          src="/imagens/logo.png"
          alt="Logo do estúdio com duas imagens de dois cupcakes e uma máquina de tatuagem no meio"
          onClick={handleLogoClick}
        />
        <ul>
        <li 
            className={currentPath === '/guerreiras' ? 'selecionado' : ''} // Verificando se a rota é '/guerreiras'
            onClick={handleGuerreirasClick}
          >
            Guerreiras
          </li>
          <li 
            className={currentPath === '/anamnese' ? 'selecionado' : ''} // Verificando se a rota é '/anamnese'
            onClick={download}
          >
            Anamnese
          </li>
          <li 
            className={currentPath === '/login' ? 'selecionado' : ''} // Verificando se a rota é '/login'
            onClick={handleLoginClick}
          >
            Login
          </li>
        </ul>
      </nav>
      <div className='linha'></div>
    </section>
  );

      

     
}

export default NavBar;
