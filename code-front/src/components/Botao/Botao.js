import './Botao.css'

const Botao = (props) =>{
    return(
        <div className='botao'>
        <button>{props.botao}</button>
        </div>
    )
}

export default Botao