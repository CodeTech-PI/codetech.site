import Botao from '../../components/Botao/Botao'
import Carrossel from '../../components/Carrossel/Carrossel'
import Footer from '../../components/Footer/Footer'
import IconesContato from '../../components/IconesContato/IconesContato'
import NavBar from '../../components/NavBar/NavBar'
import './Minimalista.css'

const Minimalista =() =>{
    
    return(
   <div>
    <NavBar/>
       <Carrossel
       tituloCarrosel="Minimalista"
       image2="imagens/minimalista.jpeg"  descricao2="Foto de tatuagem 1"
       image1="imagens/minimalista3.png"  descricao1="Foto de tatuagem 2"
       image3="imagens/minimalista2.jpeg"  descricao3="Foto de tatuagem 3"
       image4="imagens/minimalista7.jpeg"  descricao4="Foto de tatuagem 4"
       image5="imagens/minimalista5.jpeg"  descricao5="Foto de tatuagem 5"
       image6="imagens/minimalista6.jpeg"  descricao6="Foto de tatuagem 6"
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
           <br></br>
           <Botao
           link="https://wa.me/5511941834736"
            botao="Agendar"
            />
            <br></br>
            <br></br>
       <Footer/>
       </div>
    )
}

export default Minimalista