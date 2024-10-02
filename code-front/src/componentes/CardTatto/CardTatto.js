import './CardTatto.css'

const CardTatto = (props) => {
    return (

        <div className='card-tatto'>

            <img src={props.image} alt={props.descricao}></img>
            <p>{props.nome}</p>

        </div>

    )

}

export default CardTatto