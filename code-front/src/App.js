import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Botao from './componentes/Botao/Botao';
import EstiloTatto from './componentes/EstiloTatto/EstiloTatto';
import ImagemTexto from './componentes/ImagemTexto/ImagemTexto';
import NavBar from './componentes/NavBar/NavBar';
import AnyReactComponent from './componentes/AnyReactComponent/AnyReactComponent';
import Login from './pages/login/login';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <section className="img-home">
                <p>Arte que dura para sempre.</p>
              </section>
              <ImagemTexto
                title="Quem é Leticia Lombardi ?"
                image="./imagens/img-leticia.jpeg"
                descricao="Imagem da tatuadora Leticia, mulher branca, de oculos, cabelo curto, segurando uma máquina de tatuar"
                texto="Minha trajetória artística começou ainda na infância. Sempre tive uma paixão natural por desenhar, o que me levou a cursar Artes Cênicas e, mais tarde, a explorar diferentes formas de expressão artística, como escultura e pintura.
                No meu estúdio de tatuagem, cada detalhe foi pensado e decorado por mim para criar um ambiente que reflete a essência do meu trabalho e da minha personalidade. Meu objetivo é oferecer uma experiência única a cada cliente, criando tatuagens exclusivas e personalizadas, inspiradas nas histórias e nos significados que cada pessoa deseja carregar consigo.
                Além de tatuadora, sou professora de artes para crianças do ensino fundamental, algo que me permite compartilhar minha paixão pela arte e inspirar as novas gerações."
              />
              <EstiloTatto />
              <h2 className='titulo-orcamento'>Tem uma idéia? Vamos trazê-la à vida. Faça seu orçamento!</h2>
              <Botao botao="Orçamento" />
              <h2 className='endereco'>Onde nos encontrar:</h2>
              <AnyReactComponent />
            </>
          } />
          <Route path="/login" element={<Login />} /> {/* Definir a rota de login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
