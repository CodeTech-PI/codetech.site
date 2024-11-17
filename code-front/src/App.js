// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Botao from './components/Botao/Botao';
import EstiloTatto from './components/EstiloTatto/EstiloTatto';
import ImagemTexto from './components/ImagemTexto/ImagemTexto';
import NavBar from './components/NavBar/NavBar';
import AnyReactComponent from './components/AnyReactComponent/AnyReactComponent';
import EnderecoContato from './components/EnderecoContato/EnderecoContato';
import Footer from './components/Footer/Footer';
import Login from './pages/login/login';


import Aquarela from './pages/Aquarela/Aquarela';
import Minimalista from './pages/Minimalista/Minimalista';
import Realista from './pages/Realista/Realista';
import Guerreiras from './pages/guerreiras/guerreiras';
import Cliente from './pages/cliente/cliente';
import Home from './pages/Home/Home';

import Estoque from './pages/estoque/estoque';
import ListaProdutos from './pages/ListaProdutos/ListaProdutos';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estoque" element={<Estoque />} />

        <Route path="/aquarela" element={<Aquarela />} />
        <Route path="/minimalista" element={<Minimalista />} />
        <Route path="/realista" element={<Realista />} />
        <Route path="/guerreiras" element={<Guerreiras />} />
        <Route path="/clientes" element={<Cliente />} />
        <Route path="/listaProdutosService" element={<ListaProdutos/>} />
      </Routes>

    
    </Router>
  );
}

export default App;
