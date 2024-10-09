import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <section>
      <nav className='nav-bar'>
        <img
          className='img-logo'
          src="/imagens/logo.png"
          alt="Logo do estúdio com duas imagens de dois cupcakes e uma máquina de tatuagem no meio"
        />
        <ul className='teste'>
          <li>Guerreiras</li>
          <li>Cuidados</li>
          <li>Serviços</li>
          <li>Anaminse</li>
          <li onClick={handleLoginClick}>Login</li>
        </ul>
      </nav>
      <div className='linha'></div>
    </section>
  );
}

export default NavBar;
