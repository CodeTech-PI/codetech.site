import './BotaoDesfazerCliente.css'

const BotaoDesfazerCliente = (props) => {
    const { onClick, nomeBotao } = props;
  
    return(
         <button className='botao-desfazer-cliente' onClick={onClick}>{nomeBotao}</button>
    )
}

export default BotaoDesfazerCliente