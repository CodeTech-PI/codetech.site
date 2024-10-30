
import './BotaoExcluir.css'

const BotaoExcluir = ({onClick}) => {
    return(
        <button className='botao-excluir' onClick={onClick}>Excluir</button>
    )
}

export default BotaoExcluir