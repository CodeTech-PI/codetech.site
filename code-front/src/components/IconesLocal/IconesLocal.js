import './IconesLocal.css'

const IconesLocal = (props) => {
    return (

        <div className='icone-local'>
            <img src={props.image} alt={props.descricao}></img>
            <p>{props.conteudo}</p>
        </div>

    )
}

export default IconesLocal