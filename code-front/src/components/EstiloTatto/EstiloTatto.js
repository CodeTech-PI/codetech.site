import { useNavigate } from 'react-router-dom';
import CardTatto from '../CardTatto/CardTatto'
import './EstiloTatto.css'

const EstiloTatto = () => {
    
    const navigate = useNavigate();

    
    const handleAquarelaClick = () => {
        navigate('/aquarela'); 
    };
   
    const handleMinimalistaClick = () => {
        navigate('/minimalista'); 
    };

    const handleRealistaClick = () => {
        navigate('/realista'); 
    };

    return (
        <section className='estilo-tatto'>
            <h2>Explore nossos estilos e encontre o que fala com você!</h2>
           <div>
            <CardTatto id='cardRealista'
                image="/imagens/realista5.png"
                 descricao="Imagem de uma tatuagem do personagem coragem o cão covarde em preto e cinza"
                nome='Realista'
                onClick={handleRealistaClick}
            />

            <CardTatto
                image="/imagens/aquarela1.png"
                descricao="Imagem de uma tatuagem de dois cachorros com cores esfumadas nos olhos"
                nome='Aquarela'
                onClick={handleAquarelaClick}
            />

            <CardTatto
                image="/imagens/minimalista3.png"
                descricao='Imagem de uma tatuagem de uma mãe leoa e seus dois filhotes.'
                nome='Minimalista'
                onClick={handleMinimalistaClick}
            />
            </div>
            

        </section>
    )
}

export default EstiloTatto