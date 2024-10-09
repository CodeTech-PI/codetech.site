import CardTatto from '../CardTatto/CardTatto'
import './EstiloTatto.css'

const EstiloTatto = () => {
    return (
        <section className='estilo-tatto'>
            <h2>Explore nossos estilos e encontre o que fala com você</h2>
           <div>
            <CardTatto
                image="/imagens/realista.png"
                 descricao="Imagem de uma tatuagem de tigre na cor preta"
                nome='Realista'
            />

            <CardTatto
                image="/imagens/aquarela.png"
                descricao="Imagem de uma tatuagem de um gato colorido sorrindo com um chapéu flutuante"
                nome='Aquarela'
            />

            <CardTatto
                image="/imagens/minimalista.png"
                descricao='Imagem de um braço com tatuagens pequenas'
                nome='Minimalista'
            />
            </div>
            

        </section>
    )
}

export default EstiloTatto