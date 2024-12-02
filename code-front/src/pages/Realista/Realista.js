import Botao from '../../components/Botao/Botao'
import Carrossel from '../../components/Carrossel/Carrossel'
import Footer from '../../components/Footer/Footer'
import IconesContato from '../../components/IconesContato/IconesContato'
import NavBar from '../../components/NavBar/NavBar'
import './Realista.css'

const Realista =() =>{
    
    return(
   <div>
    <NavBar/>
       <Carrossel
       tituloCarrosel="Realista"
       image1="imagens/realista2.jpeg"  descricao1="Foto de tatuagem 1"
       image2="imagens/realista3.jpeg"  descricao2="Foto de tatuagem 2"
       image3="imagens/realista5.png"  descricao3="Foto de tatuagem 3"
       image4="imagens/realista6.jpeg"  descricao4="Foto de tatuagem 4"
       image5="imagens/realista4.jpeg"  descricao5="Foto de tatuagem 5"
       image6="imagens/realista.jpeg"  descricao6="Foto de tatuagem 6"
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
            botao="Agendar"
            link="https://wa.me/5511941834736"
            />
            <br></br>
            <br></br>
       <Footer/>
       </div>
       
    )
}

export default Realista