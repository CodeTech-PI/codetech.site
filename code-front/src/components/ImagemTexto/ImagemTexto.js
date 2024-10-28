import './ImagemTexto.css'

const ImagemTexto = (props) => {
    return (
     

        <section className='imagem-texto'>
            
            <div className='container'>
            <h2>{props.title}</h2>
            <div className='container-conteudo'>
            <img src={props.image} alt={props.descricao}></img>
            <p>{props.texto}</p>
            </div>
            </div>

        </section>
         
    )
}

export default ImagemTexto



   