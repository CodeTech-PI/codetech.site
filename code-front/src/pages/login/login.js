// src/components/Login.js

import React, { useState } from 'react';
import loginService from '../../services/authentication/loginService';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login(email, password); // Chama o serviço de login

      // Verifique se a resposta contém o token
      if (response.token) {
        sessionStorage.setItem('token', response.token.tokenJWT);
        sessionStorage.setItem('email', response.token.email);
        sessionStorage.setItem('isDiretor', response.token.isDiretor);
        sessionStorage.setItem('idUser', response.token.idUser);
        // Redirecione ou faça outras ações conforme necessário
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
    <div className="login-container">
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
