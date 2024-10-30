import './BotaoAlterar.css'

const BotaoAlterar = ({onClick}) => {
    return(
         <button className='botao-alterar' onClick={onClick} >Alterar</button>
    )
}

export default BotaoAlterar