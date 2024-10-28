
import './CardTatto.css'

const CardTatto = (props) => {
    
  

    return (

        <div  className='card-tatto'>

            <img className='imgTipoTatto' src={props.image} alt={props.descricao}></img>
            <p className='nomeTipoTatto' onClick={props.onClick}>{props.nome}</p>
        </div>

    )

}

export default CardTatto