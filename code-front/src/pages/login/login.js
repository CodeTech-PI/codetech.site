// src/components/Login.js

import React, { useState } from 'react';
import loginService from '../../services/authentication/loginService';
import './loginGabs.css';
import NavBar from '../../components/NavBar/NavBar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login(email, senha);

      if (response.token) {
        sessionStorage.setItem('token', response.token.tokenJWT);
        sessionStorage.setItem('email', response.token.email);
        // window.location.href = '/home';
      } else {
        setError('Token não encontrado na resposta');
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
      setError('Falha ao fazer login. Por favor, verifique suas credenciais.');
    }
  };

  return (
    <section id='section-login'>
      <NavBar/>
    <div className="container-login">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>
          Email:
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input className= 'input'
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
    </section>
  );
};

export default Login;
