import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../../services/authentication/loginService';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login(email, senha);

      if (response.token) {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('email', response.email);
        navigate('/clientes'); // Use navigate instead of useHistory
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
