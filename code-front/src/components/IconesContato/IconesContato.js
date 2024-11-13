import './IconesContato.css'

const IconesContato = ({ img, desc, onClick, link }) => {
    return(
    
        <div className="icones-contato" onClick={onClick}>
        <a href={link} target="_blank" rel="noopener noreferrer">
        <img className='icones-contato' src={img} alt={desc}></img>
        </a>
        </div>
       
    )
}

export default IconesContato