import './BotaoCliente.css'

const BotaoCliente = (props) => {
    return(
         <button className='botao-cliente' >{props.nomeBotao}</button>
    )
}

export default BotaoCliente