// src/components/Sidebar/Sidebar.js
import React from 'react';
import './SideBar.css'; // Estilo para a Sidebar

const Sidebar = () => {
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
        <li><a href="/estoque">Estoque</a></li>
        <li><a href="/clientes">Área do Cliente</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/filiais">Filiais</a></li>
        <li><a href="/listaProdutosService">Lista de produtos</a></li>
        <li className="logout"><a href="/" onClick={handleLogout}>Sair</a></li>
      </ul>
      <div className="linhaVertical"></div>
    </div>
  );
};

export default Sidebar;
