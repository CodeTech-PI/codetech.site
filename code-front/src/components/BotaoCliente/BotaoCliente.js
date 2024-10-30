import './BotaoCliente.css'

const BotaoCliente = (props) => {
    const { onClick, nomeBotao } = props;
  
    return(
         <button className='botao-cliente' onClick={onClick}>{nomeBotao}</button>
    )
}

export default BotaoCliente