import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


import Login from './pages/login/login'
import Aquarela from './pages/Aquarela/Aquarela';
import Minimalista from './pages/Minimalista/Minimalista';
import Realista from './pages/Realista/Realista';
import Guerreiras from './pages/guerreiras/guerreiras';
import Cliente from './pages/cliente/cliente';
import Home from './pages/Home/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aquarela" element={<Aquarela />} />
        <Route path="/minimalista" element={<Minimalista />} />
        <Route path="/realista" element={<Realista />} />
        <Route path="/guerreiras" element={<Guerreiras />} />
        <Route path="/clientes" element={<Cliente />} />
      </Routes>

    </Router>
  );
}

export default App;
