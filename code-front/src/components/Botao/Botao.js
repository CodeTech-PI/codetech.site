import './Botao.css'

const Botao = (props) => {
    return (
        <div className='botao'>
            <a className='linkBotao' href={props.link} target="_blank" rel="noopener noreferrer">
                <button>{props.botao}</button>
            </a>

        </div>
    )
}

export default Botao