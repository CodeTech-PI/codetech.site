import './BotaoAlterar.css'

const BotaoAlterar = (props) => {
    const { onClick, nomeBotao } = props;

    return(
         <button className='botao-alterar' onClick={onClick} >{nomeBotao}</button>
    )
}

export default BotaoAlterar