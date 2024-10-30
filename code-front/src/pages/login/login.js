import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../../services/authentication/loginService';
import IconesContato from '../../components/IconesContato/IconesContato';
import Footer from '../../components/Footer/Footer';
import './login.css';
import NavBar from '../../components/NavBar/NavBar';

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
    <div className='container-icones-contato'>
                <IconesContato
                img="./imagens/whats-app.png" desc="Icone com a imagem do WhatsApp, um telefone"
                link="https://wa.me/5511941834736"
                />
                <IconesContato
                img="./imagens/chat-bot.png" desc="Icone com a imagem de um robozinho"
                />
    </div>
  <Footer/>
  </section>
  );
};

export default Login;
