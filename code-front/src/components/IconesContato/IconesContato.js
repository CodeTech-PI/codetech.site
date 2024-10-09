import './IconesContato.css'

const IconesContato = (props) => {
    return(
    
        <a href={props.link} target="_blank" rel="noopener noreferrer">
        <img className='icones-contato' src={props.img} descricao={props.desc}></img>
        </a>
       
    )
}

export default IconesContato