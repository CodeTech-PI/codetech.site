// src/components/Sidebar/Sidebar.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './SideBar.css'; // Estilo para a Sidebar

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = (event) => {
    event.preventDefault();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="sidebar">
      <img
        className="img-logo"
        src="/imagens/logo.png"
        alt="Logo do estúdio com duas imagens de dois cupcakes e uma máquina de tatuagem no meio"
      />
      <ul>
      <li className={currentPath === '/estoque' ? 'selected' : ''}>
          <a href="/estoque">Estoque</a>
        </li>
        <li className={currentPath === '/clientes' ? 'selected' : ''}>
          <a href="/clientes">Área do Cliente</a>
        </li>
        <li className={currentPath === '/atendimento' ? 'selected' : ''}>
          <a href="/atendimento">Área de Atendimento</a>
        </li>
        <li className={currentPath === '/dashboard' ? 'selected' : ''}>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className={currentPath === '/filiais' ? 'selected' : ''}>
          <a href="/filiais">Filiais</a>
        </li>
        {/* <li className={currentPath === '/listaProdutosService' ? 'selected' : ''}>
          <a href="/listaProdutosService">Lista de produtos</a>
        </li> */}
        <li className="logout">
          <a href="/" onClick={handleLogout}>Sair</a>
        </li>
      </ul>
      <div className="linhaVertical"></div>
    </div>
  );
};

export default Sidebar;
