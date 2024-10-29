import Botao from '../../components/Botao/Botao'
import Carrossel from '../../components/Carrossel/Carrossel'
import Footer from '../../components/Footer/Footer'
import IconesContato from '../../components/IconesContato/IconesContato'
import NavBar from '../../components/NavBar/NavBar'
import './Aquarela.css'

const Aquarela =() =>{
    
     return(
    <div>
        <NavBar/>
        <Carrossel
        tituloCarrosel="Aquarela"
        image1="imagens/aquarela.png"  descricao1="Foto de tatuagem 1"
        image2="imagens/aquarela.png"  descricao2="Foto de tatuagem 2"
        image3="imagens/aquarela.png"  descricao3="Foto de tatuagem 3"
        image4="imagens/realista.png"  descricao4="Foto de tatuagem 4"
        image5="imagens/realista.png"  descricao5="Foto de tatuagem 5"
        image6="imagens/realista.png"  descricao6="Foto de tatuagem 6"
        />
        <div className='container-icones-contato'>
                <IconesContato
                img="./imagens/whats-app.png" desc="Icone com a imagem do WhatsApp, um telefone"
                link="https://wa.me/5511941834736"
                />
                <IconesContato
                img="./imagens/chat-bot.png" desc="Icone com a imagem de um robozinho"
                />
            </div>
            <Botao
            botao="Agendar"
            />
        <Footer/>
        </div>
        
     )
}

export default Aquarela