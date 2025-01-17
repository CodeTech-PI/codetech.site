import React from 'react';
import './guerreiras.css'; 
import NavBar from '../../components/NavBar/NavBar';
import ImagemTexto from '../../components/ImagemTexto/ImagemTexto';
import Botao from '../../components/Botao/Botao';
import IconesContato from '../../components/IconesContato/IconesContato';
import Footer from '../../components/Footer/Footer';

const Guerreiras = () => {
    
    return (
        <>
        <NavBar />
            <ImagemTexto
                title="Projeto de Tatuagem Reconstrutiva para Mulheres que passaram pela Mastectomia"
                image="/imagens/tatuagem-peito.png"
                descricao="Descrição da imagem"
                texto="Como tatuadora, acredito que a arte pode transformar não apenas o corpo, mas também a alma. É com esse espírito que criei um projeto especial voltado para mulheres que passaram pela retirada da mama devido ao câncer de mama. Este projeto é uma maneira de ajudar essas mulheres a se sentirem ainda mais belas, com a autoestima elevada e a confiança restaurada. Entendo o impacto emocional e físico que uma cirurgia de mastectomia pode causar, e por isso, ofereço tatuagens reconstrutivas totalmente gratuitas."
            />

            <section className="projeto-funcionamento">
                <p>
                    Se você ou alguém que conhece passou por esse processo, o projeto funciona de maneira simples: 
                </p>
                <br></br>
                <ul>
                    <li>
                        <strong>Agendamento:</strong> Assim que entrar em contato, agendaremos a sessão o mais rápido possível, de acordo com a disponibilidade na minha agenda.
                    </li>
                    <li>
                        <strong>Tudo sem custo:</strong> A tatuagem é feita completamente de graça, como uma forma de apoio e carinho para ajudar nessa fase tão importante da sua vida.
                    </li>
                </ul>
                <br></br>
                <Botao botao = "Agendar " link="https://wa.me/5511941834736" />
            </section>
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
        </>
    );
}

export default Guerreiras;
