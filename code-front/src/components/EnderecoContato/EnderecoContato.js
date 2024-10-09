import IconesContato from '../IconesContato/IconesContato'
import IconesLocal from '../IconesLocal/IconesLocal'
import './EnderecoContato.css'

const EnderecoContato = () => {
    return (

        <section className='endereco-contato'>

            <div className='container-icones-local'>
                <IconesLocal
                    image="./imagens/mapa.png" descricao="Icone com a imagem de um mapa"
                    conteudo="R:Expedicionário João Pereira da Silva Júnior - Jardim Nova América, Bragança Paulista"
                />
                <IconesLocal
                    image="./imagens/relogio.png" descricao="Icone com a imagem de um relógio"
                    conteudo="Segunda á Sábado das 9h ás 19h"
                />
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

        </section>
    )
}

export default EnderecoContato